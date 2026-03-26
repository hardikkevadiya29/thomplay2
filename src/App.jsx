import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, Footer, GameCard, Sidebar } from './components/UI';
import { games } from './data/games';
import { ChevronLeft, Download, Star, Share2, ShieldCheck, Zap } from 'lucide-react';

const HomePage = ({ searchTerm }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const navigate = useNavigate();

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-grow lg:w-2/3">
          {/* Categories / Filter Chips */}
          <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
            {['All', 'Action', 'Adventure', 'Simulation', 'Arcade', 'Puzzle', 'Racing'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn px-4 py-1.5 text-sm whitespace-nowrap rounded-full font-medium transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GameCard
                    game={game}
                    onClick={(g) => navigate(`/game/${g.id}`)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=nostatic" alt="No results" className="w-32 h-32 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-slate-400">No results found for your search.</h3>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 flex-shrink-0">
          <Sidebar games={games} />
        </div>
      </div>
    </motion.main>
  );
};

const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = games.find(g => g.id === id);

  if (!game) return <div className="text-center py-40">Game not found</div>;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium"
      >
        <ChevronLeft size={20} /> Back to Games
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] overflow-hidden shadow-premium flex-shrink-0 bg-slate-100 p-4 border border-slate-100">
              <img src={game.icon} alt={game.title} className="w-full h-full object-contain" />
            </div>
            <div className="flex-grow space-y-4">
              <h1 className="text-4xl font-black text-slate-900">{game.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-accent font-bold">
                  <Star size={18} fill="currentColor" /> {game.rating}
                </span>
                <span>•</span>
                <span className="text-primary">{game.category}</span>
                <span>•</span>
                <span>{game.downloads} Downloads</span>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="btn btn-primary px-10 py-4 flex items-center gap-2 shadow-xl shadow-primary/20">
                  <Download size={20} /> Download APK ({game.size})
                </button>
                <button className="btn btn-secondary p-4">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Security Banner */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center gap-4 text-emerald-800">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="font-bold">Verified & Secure</h3>
              <p className="text-sm opacity-80 leading-relaxed">This file has been scanned by our security systems and is completely free of viruses or malware.</p>
            </div>
          </div>

          {/* Screenshots Placeholder */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Screenshots</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-shrink-0 w-72 aspect-[16/9] rounded-2xl bg-slate-100 border border-slate-200 shadow-sm overflow-hidden group">
                  <img
                    src={game.icon}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Description</h2>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
              {game.description}
            </p>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Zap className="text-primary" /> Technical Info
            </h3>
            <ul className="space-y-6">
              {[
                { label: 'Version', value: game.version },
                { label: 'Updated', value: game.updated },
                { label: 'Size', value: game.size },
                { label: 'Price', value: game.price },
                { label: 'Developer', value: game.developer, isLink: true },
                { label: 'Downloads', value: game.downloads },
                { label: 'Category', value: game.category }
              ].map((item, idx) => (
                <li key={idx} className="flex flex-col border-b border-slate-50 pb-4 last:border-0">
                  <span className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">{item.label}</span>
                  <span className={`text-slate-800 font-bold ${item.isLink ? 'text-primary' : ''}`}>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-4">
              <button className="w-full btn btn-primary py-4">Download Now</button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        <Header onSearchChange={setSearchTerm} />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
            <Route path="/game/:id" element={<GameDetailsPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
