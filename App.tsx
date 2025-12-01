import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { ClubDashboard } from './components/ui/ClubDashboard';
import { JoinModal } from './components/ui/JoinModal';
import { AdminLogin } from './backend/Admin/AdminLogin';
import { AdminDashboard } from './backend/Admin/AdminDashboard';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { getClubs, getFeatures } from './backend/cms';
import { Club, FeatureItem, NewsItem } from './types';
import { initialNews } from './backend/data/news';
import { GridBackground } from './components/ui/GridBackground';

// Import New Pages
import { AboutPage } from './components/pages/AboutPage';
import { EventsPage } from './components/pages/EventsPage';
import { NewsPage } from './components/pages/NewsPage';
import { ClubsPage } from './components/pages/ClubsPage';
import { LegalPage } from './components/pages/LegalPage';

// Golden Ratio Constants for Animation
const TRANSITION_DURATION = 0.618; // seconds
const GOLDEN_EASE: [number, number, number, number] = [0.236, 1, 0.382, 1]; 

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  
  // Data State
  const [clubs, setClubs] = useState<Club[]>([]);
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [isLoading, setIsLoading] = useState(true);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch Data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clubsData, featuresData] = await Promise.all([
          getClubs(),
          getFeatures()
        ]);
        setClubs(clubsData);
        setFeatures(featuresData);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        // Reduced from 1500ms to 800ms for faster perceived load
        setTimeout(() => setIsLoading(false), 800); 
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const openJoinModal = () => setIsJoinModalOpen(true);

  // --- Admin Actions ---
  const handleLogin = (password: string) => {
    if (password === 'nexus2024') {
        setIsAuthenticated(true);
        setCurrentPage('admin');
    }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setCurrentPage('home');
  };

  const updateClub = (clubId: string, data: Partial<Club>) => {
      setClubs(prev => prev.map(c => c.id === clubId ? { ...c, ...data } : c));
  };

  const addNews = (item: NewsItem) => {
      setNews(prev => [item, ...prev]);
  };

  const renderPage = () => {
    // 1. Admin
    if (currentPage === 'admin') {
        if (!isAuthenticated) return <AdminLogin onLogin={handleLogin} />;
        return (
            <AdminDashboard 
                clubs={clubs} 
                news={news} 
                onUpdateClub={updateClub} 
                onAddNews={addNews}
                onLogout={handleLogout}
            />
        );
    }

    // 2. Main Pages
    switch(currentPage) {
        case 'home':
            return <Home clubs={clubs} features={features} news={news} onNavigate={setCurrentPage} isLoading={isLoading} />;
        case 'about':
            return <AboutPage />;
        case 'clubs':
            return <ClubsPage clubs={clubs} onNavigate={setCurrentPage} />;
        case 'events':
            return <EventsPage clubs={clubs} />;
        case 'news':
            return <NewsPage news={news} />;
            
        // Legal
        case 'privacy':
            return <LegalPage type="privacy" />;
        case 'terms':
            return <LegalPage type="terms" />;
        case 'cookies':
            return <LegalPage type="cookies" />;
    }

    // 3. Dynamic Club Pages
    const activeClub = clubs.find(c => c.id === currentPage);
    if (activeClub) {
      return (
        <ClubDashboard 
          club={activeClub} 
          onBack={() => setCurrentPage('home')} 
          onJoin={openJoinModal} 
        />
      );
    }

    // Default Fallback
    return <Home clubs={clubs} features={features} news={news} onNavigate={setCurrentPage} isLoading={isLoading} />;
  };

  return (
    <ThemeProvider>
      <div className="flex-1 flex flex-col min-h-[100dvh] bg-[#0F0F0F] text-neutral-900 dark:text-white relative transition-colors duration-300 font-sans">
        
        {currentPage !== 'admin' && (
             <>
                <GridBackground />
                <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                <Navbar 
                  currentPage={currentPage} 
                  onNavigate={setCurrentPage} 
                  onJoin={openJoinModal} 
                  clubs={clubs}
                />
             </>
        )}

        <main className="flex-1 w-full flex flex-col relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.99, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.01, filter: "blur(5px)" }}
              transition={{ 
                duration: TRANSITION_DURATION, 
                ease: GOLDEN_EASE 
              }}
              className="flex-1 flex flex-col"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}

        <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;