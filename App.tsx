
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

// Golden Ratio Constants for Animation
const TRANSITION_DURATION = 0.618; // seconds
const GOLDEN_EASE: [number, number, number, number] = [0.236, 1, 0.382, 1]; // Custom bezier approximating golden spiral deceleration

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

  // Fetch Data (Simulating Headless CMS)
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
        // Keep loading true for a bit longer to show off skeleton if needed, or just set false
        setTimeout(() => setIsLoading(false), 1500); 
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
    // Simple mock authentication
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

    if (currentPage === 'home') {
      return <Home clubs={clubs} features={features} news={news} onNavigate={setCurrentPage} isLoading={isLoading} />;
    }

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

    return <Home clubs={clubs} features={features} news={news} onNavigate={setCurrentPage} isLoading={isLoading} />;
  };

  return (
    <ThemeProvider>
      <div className="flex-1 flex flex-col min-h-[100dvh] bg-[#050505] text-neutral-900 dark:text-white selection:bg-blue-500/30 selection:text-white dark:selection:bg-blue-500/30 dark:selection:text-white relative transition-colors duration-300 font-sans">
        
        {currentPage !== 'admin' && (
             <>
                {/* Cyber-Minimalist Background for public pages */}
                <div className="fixed inset-0 z-0 pointer-events-none bg-neutral-50 dark:bg-[#030303]" />
                <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />

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
        
        {currentPage !== 'admin' && <Footer />}

        <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
