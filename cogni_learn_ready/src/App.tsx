import React, { useState, useEffect } from 'react';
import { generateQuiz } from './services/gemini';
import { Layout, Brain, BookOpen, Trophy, Settings, Sun, Moon, Menu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<any[] | null>(null);
  const [topic, setTopic] = useState('OOPS');
  const [level, setLevel] = useState('Beginner');
  const [score, setScore] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const startQuiz = async () => {
    setLoading(true);
    setQuiz(null);
    const data = await generateQuiz(topic, level);
    setQuiz(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden lg:block p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-blue-600 rounded-lg"><Brain className="text-white" size={24} /></div>
          <h1 className="font-bold text-xl tracking-tight">CogniLearn</h1>
        </div>
        <nav className="space-y-2">
          <NavItem icon={<Layout size={20}/>} label="Dashboard" active />
          <NavItem icon={<BookOpen size={20}/>} label="Learning Modules" />
          <NavItem icon={<Trophy size={20}/>} label="Quizzes" />
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Student</h2>
            <p className="text-slate-500 dark:text-slate-400">Ready for your AI-generated placement prep?</p>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Cognitive Load" value="Optimal" color="text-green-500" />
          <StatCard title="Daily Streak" value="12 Days" color="text-orange-500" />
          <StatCard title="Global Rank" value="#42" color="text-blue-500" />
        </div>

        {/* Quiz Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold">AI Dynamic Quiz</h3>
            <div className="flex gap-2">
              <select 
                className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg outline-none"
                value={topic} onChange={(e) => setTopic(e.target.value)}
              >
                <option>OOPS</option>
                <option>DBMS</option>
                <option>System Design</option>
                <option>Aptitude</option>
              </select>
              <select 
                className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg outline-none"
                value={level} onChange={(e) => setLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Moderate</option>
                <option>Expert</option>
              </select>
              <button 
                onClick={startQuiz}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Start New Quiz'}
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600 mb-4"></div>
              <p>Gemini AI is crafting your personalized {topic} questions...</p>
            </div>
          )}

          {quiz && !loading && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              {quiz.map((q: any, i: number) => (
                <div key={i} className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <p className="font-medium mb-4">{i + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt: string, idx: number) => (
                      <button key={idx} className="text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!quiz && !loading && (
            <div className="text-center py-20 text-slate-500">
              Select topic and level to generate a fresh AI quiz.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}