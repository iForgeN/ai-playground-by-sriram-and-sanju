import { useState, useEffect } from 'react';
import './App.css';

interface Module {
  id: number;
  title: string;
  description: string;
  status: 'locked' | 'unlocked' | 'completed';
  emoji: string;
}

const modules: Module[] = [
  { id: 1, title: "Welcome to AI Land", description: "Meet Polly and discover what AI is", status: 'completed', emoji: "🌟" },
  { id: 2, title: "How AI Learns", description: "Data, patterns, and practice", status: 'unlocked', emoji: "🧠" },
  { id: 3, title: "AI Superpowers", description: "Seeing, talking, and creating", status: 'unlocked', emoji: "⚡" },
  { id: 4, title: "Being Smart with AI", description: "Ethics and safety", status: 'locked', emoji: "🛡️" },
  { id: 5, title: "AI in Our World", description: "Real examples around us", status: 'locked', emoji: "🌍" },
  { id: 6, title: "AI in Games & Robots", description: "Fun with NPCs and smart machines", status: 'locked', emoji: "🎮" },
  { id: 7, title: "Create with AI", description: "Make your own stories and art", status: 'locked', emoji: "🎨" },
];

function App() {
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('playerName') || 'Explorer');
  const [seeds, setSeeds] = useState(() => parseInt(localStorage.getItem('seeds') || '0'));
  const [badges, setBadges] = useState(() => parseInt(localStorage.getItem('badges') || '1'));
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('pollinationsKey') || '');
  const [parentMode, setParentMode] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedModules');
    return saved ? JSON.parse(saved) : [1];
  });

  useEffect(() => {
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('seeds', seeds.toString());
    localStorage.setItem('badges', badges.toString());
    localStorage.setItem('completedModules', JSON.stringify(completedModules));
  }, [playerName, seeds, badges, completedModules]);

  const saveApiKey = () => {
    localStorage.setItem('pollinationsKey', apiKey);
    alert("✅ Pollinations API key saved! Polly is ready to help.");
  };

  const unlockNext = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      const newCompleted = [...completedModules, moduleId];
      setCompletedModules(newCompleted);
      setSeeds(prev => prev + 50);
      setBadges(prev => prev + 1);
      alert(`🎉 Great job! You unlocked the next adventure! +50 Seeds`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-cyan-400 to-pink-400 font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg p-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-yellow-300 rounded-3xl flex items-center justify-center text-6xl shadow-inner cursor-pointer hover:rotate-12 transition-transform" onClick={() => alert("Hi! I'm Polly the Robot Fox 🦊🤖")}>
            🦊
          </div>
          <div>
            <h1 className="text-5xl font-bold text-purple-700 tracking-tight">AI Playground</h1>
            <p className="text-xl text-purple-600 -mt-2">by Sriram and Sanju</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-lg">
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow">
            <span>🌱</span>
            <span className="font-bold">{seeds}</span>
            <span className="text-sm text-gray-500">Seeds</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow">
            <span>🏆</span>
            <span className="font-bold">{badges}</span>
            <span className="text-sm text-gray-500">Badges</span>
          </div>

          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="bg-white px-4 py-3 rounded-2xl border border-purple-200 focus:outline-none focus:border-purple-400 w-48"
            placeholder="Your Explorer Name"
          />

          <div className="flex items-center gap-3">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="pk_ your key"
              className="bg-white px-4 py-3 rounded-2xl border border-purple-200 w-64 focus:outline-none focus:border-purple-400"
            />
            <button onClick={saveApiKey} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-medium transition">Save Key</button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={parentMode} onChange={(e) => setParentMode(e.target.checked)} className="w-5 h-5 accent-purple-600" />
            <span className="font-medium text-purple-700">Parent Mode</span>
          </label>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Welcome Banner */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white drop-shadow-md mb-4">Welcome to AI Land, {playerName}! 🦊</h2>
          <p className="text-2xl text-white/90 max-w-2xl mx-auto">Explore, create, and learn about Artificial Intelligence with Polly the Robot Fox</p>
        </div>

        {/* Interactive Playground Map */}
        <div className="relative h-[620px] bg-white/30 backdrop-blur-xl rounded-[4rem] border-8 border-white/50 shadow-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px] opacity-30"></div>
          
          {/* Path */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 -translate-y-1/2"></div>

          {modules.map((mod, index) => {
            const isCompleted = completedModules.includes(mod.id);
            const isUnlocked = mod.status === 'unlocked' || isCompleted;
            const leftPos = 80 + (index * 110);

            return (
              <div
                key={mod.id}
                className={`absolute flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 ${isCompleted ? 'grayscale-0' : ''}`}
                style={{ left: `${leftPos}px`, top: index % 2 === 0 ? '180px' : '380px' }}
                onClick={() => isUnlocked && alert(`Opening Module ${mod.id}: ${mod.title} (Coming soon!)`)}
              >
                <div className={`w-28 h-28 rounded-3xl flex items-center justify-center text-7xl shadow-xl border-8 border-white transition-all ${isCompleted ? 'bg-green-400 ring-4 ring-green-300' : isUnlocked ? 'bg-yellow-400' : 'bg-gray-300 grayscale'}`}>
                  {mod.emoji}
                </div>
                <div className="mt-4 text-center max-w-[140px]">
                  <div className="font-bold text-white drop-shadow text-xl">{mod.title}</div>
                  <div className="text-white/80 text-sm leading-tight mt-1">{mod.description}</div>
                </div>
                {isCompleted && <div className="absolute -top-2 -right-2 text-3xl">✅</div>}
              </div>
            );
          })}
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map(mod => {
            const isCompleted = completedModules.includes(mod.id);
            const isUnlocked = mod.status === 'unlocked' || isCompleted;

            return (
              <div key={mod.id} className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all ${isUnlocked ? 'hover:-translate-y-1' : 'opacity-75'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="text-6xl">{mod.emoji}</div>
                  {isCompleted && <div className="text-4xl">🏆</div>}
                </div>
                
                <h3 className="text-3xl font-bold text-purple-700 mb-3">{mod.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{mod.description}</p>

                <button 
                  onClick={() => isUnlocked ? unlockNext(mod.id) : alert("Complete previous adventures to unlock!")}
                  className={`w-full py-5 rounded-2xl font-bold text-xl transition-all ${isUnlocked ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:brightness-110' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  {isCompleted ? 'Review Adventure 🌟' : isUnlocked ? 'Start Adventure' : '🔒 Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="text-center py-12 text-white/70 text-sm">
        Made with ❤️ for curious explorers • Powered by Pollinations AI • Share with friends!
      </footer>
    </div>
  );
}

export default App;
