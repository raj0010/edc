import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { ClubDashboard } from './components/ui/ClubDashboard';
import { JoinModal } from './components/ui/JoinModal';
import { AnimatePresence, motion } from 'framer-motion';
import { clubs } from './data/clubs';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const openJoinModal = () => setIsJoinModalOpen(true);

  const renderPage = () => {
    if (currentPage === 'home') {
      return <Home clubs={clubs} onNavigate={setCurrentPage} />;
    }

    // Dynamic routing: Find the club matching the current page ID
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

    // Fallback
    return <Home clubs={clubs} onNavigate={setCurrentPage} />;
  };

  return (
    <ThemeProvider>
      <div className="bg-neutral-50 dark:bg-black flex-1 flex flex-col min-h-[100dvh] text-neutral-900 dark:text-white selection:bg-neutral-200 dark:selection:bg-neutral-700 selection:text-black dark:selection:text-white relative transition-colors duration-300">
        
        <Navbar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          onJoin={openJoinModal} 
        />

        <main className="flex-1 w-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <Footer />

        <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;