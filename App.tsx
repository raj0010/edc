import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { MarketingPage } from './components/pages/MarketingPage';
import { StartupPage } from './components/pages/StartupPage';
import { ConsultingPage } from './components/pages/ConsultingPage';
import { FinancePage } from './components/pages/FinancePage';
import { JoinModal } from './components/ui/JoinModal';
import { AnimatePresence, motion } from 'framer-motion';
import { clubs } from './data/clubs';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const openJoinModal = () => setIsJoinModalOpen(true);

  const renderPage = () => {
    const clubData = (id: string) => clubs.find(c => c.id === id)!;
    
    switch (currentPage) {
      case 'marketing':
        return <MarketingPage club={clubData('marketing')} onBack={() => setCurrentPage('home')} onJoin={openJoinModal} />;
      case 'startup':
        return <StartupPage club={clubData('startup')} onBack={() => setCurrentPage('home')} onJoin={openJoinModal} />;
      case 'consulting':
        return <ConsultingPage club={clubData('consulting')} onBack={() => setCurrentPage('home')} onJoin={openJoinModal} />;
      case 'finance':
        return <FinancePage club={clubData('finance')} onBack={() => setCurrentPage('home')} onJoin={openJoinModal} />;
      default:
        return <Home clubs={clubs} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="bg-neutral-50 dark:bg-black min-h-screen text-neutral-900 dark:text-white selection:bg-neutral-200 dark:selection:bg-neutral-700 selection:text-black dark:selection:text-white relative transition-colors duration-300">
        
        <Navbar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          onJoin={openJoinModal} 
        />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
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