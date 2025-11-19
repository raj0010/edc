import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { MarketingPage } from './components/pages/MarketingPage';
import { StartupPage } from './components/pages/StartupPage';
import { ConsultingPage } from './components/pages/ConsultingPage';
import { FinancePage } from './components/pages/FinancePage';
import { Megaphone, Rocket, Briefcase, TrendingUp } from 'lucide-react';
import { Club } from './types';

const clubs: Club[] = [
  {
    id: 'marketing',
    name: 'Marketing Club',
    tagline: 'Master the Art of Outreach',
    description: 'We decode consumer behavior and craft compelling narratives that sell.',
    icon: Megaphone,
    color: 'from-pink-500 to-rose-500',
    features: ['Brand Strategy Workshops', 'Digital Marketing Bootcamps', 'Live Case Studies']
  },
  {
    id: 'startup',
    name: 'Startup Club',
    tagline: 'From Idea to Unicorn',
    description: 'The incubation hub where raw ideas are refined into scalable business models.',
    icon: Rocket,
    color: 'from-violet-500 to-purple-500',
    features: ['Incubation Support', 'Pitch Deck Reviews', 'Founder Matchmaking']
  },
  {
    id: 'consulting',
    name: 'Consulting Club',
    tagline: 'Solving Real World Problems',
    description: 'Bridging the gap between theory and practice through industry consulting projects.',
    icon: Briefcase,
    color: 'from-blue-500 to-cyan-500',
    features: ['Case Interview Prep', 'Client Projects', 'Strategy Simulations']
  },
  {
    id: 'finance',
    name: 'Finance Club',
    tagline: 'Wealth & Wisdom',
    description: 'Understanding markets, investment strategies, and financial modeling.',
    icon: TrendingUp,
    color: 'from-emerald-500 to-green-500',
    features: ['Portfolio Management', 'Trading Simulations', 'Financial Literacy']
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'marketing':
        return <MarketingPage onBack={() => setCurrentPage('home')} />;
      case 'startup':
        return <StartupPage onBack={() => setCurrentPage('home')} />;
      case 'consulting':
        return <ConsultingPage onBack={() => setCurrentPage('home')} />;
      case 'finance':
        return <FinancePage onBack={() => setCurrentPage('home')} />;
      default:
        return <Home clubs={clubs} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-neutral-700 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="font-bold text-xl tracking-tighter font-display cursor-pointer" 
            onClick={() => setCurrentPage('home')}
          >
            EDC Nexus
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-neutral-400">
            {clubs.map(club => (
              <button 
                key={club.id} 
                onClick={() => setCurrentPage(club.id)} 
                className={`hover:text-white transition-colors ${currentPage === club.id ? 'text-white' : ''}`}
              >
                {club.name}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-neutral-200 transition-colors">
            Join Us
          </button>
        </div>
      </nav>

      <main>
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;