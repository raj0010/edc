import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import { clubs } from '../data/clubs';
import { cn } from '../lib/utils';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onJoin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onJoin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-6 pointer-events-none", // pointer-events-none on container to let clicks pass through sides
          isScrolled ? "py-4" : "py-6"
        )}
      >
        <div className={cn(
          "mx-auto max-w-7xl transition-all duration-500 pointer-events-auto flex items-center justify-between", // pointer-events-auto on content
          isScrolled 
            ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-full border border-neutral-200/50 dark:border-white/10 shadow-xl shadow-black/5 px-6 py-3 w-full md:w-auto md:min-w-[800px]"
            : "bg-transparent px-0 w-full"
        )}>
            {/* Logo */}
            <div 
              className="flex items-center gap-3 font-bold text-xl tracking-tighter font-display cursor-pointer group" 
              onClick={() => onNavigate('home')}
            >
              <div className="w-9 h-9 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-neutral-900 shadow-lg group-hover:scale-105 transition-transform">
                 <span className="font-display font-black text-lg">N</span>
              </div>
              <span className={cn("transition-colors duration-300 hidden sm:inline-block", isScrolled ? "text-neutral-900 dark:text-white" : "text-neutral-900 dark:text-white mix-blend-difference")}>EDC Nexus</span>
            </div>

            {/* Desktop Nav */}
            <div className={cn(
                "hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500",
                isScrolled 
                    ? "bg-neutral-100/50 dark:bg-white/5 border-neutral-200/50 dark:border-white/5" 
                    : "bg-white/50 dark:bg-black/30 backdrop-blur-md border-white/20 dark:border-white/10"
            )}>
               <button
                  onClick={() => onNavigate('home')}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    currentPage === 'home'
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                  )}
                >
                  Hub
                </button>
               {clubs.map(club => (
                  <button
                    key={club.id}
                    onClick={() => onNavigate(club.id)}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                      currentPage === club.id
                        ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                    )}
                  >
                    {club.name.replace(' Club', '')}
                  </button>
               ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
               <ThemeToggle />
               <button 
                 onClick={onJoin}
                 className={cn(
                   "group relative px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-full overflow-hidden transition-all shadow-lg hover:shadow-xl",
                   isScrolled ? "" : "shadow-neutral-900/20 dark:shadow-white/10"
                 )}
               >
                 <span className="relative z-10 flex items-center gap-2">
                    <span>Join Us</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-black dark:from-neutral-300 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
               <div className={cn("transition-opacity", isScrolled ? "opacity-100" : "opacity-0 pointer-events-none")}>
                   <ThemeToggle />
               </div>
               <button 
                  onClick={() => setIsMobileMenuOpen(true)} 
                  className={cn(
                    "p-2 rounded-full transition-colors", 
                    isScrolled 
                        ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white" 
                        : "bg-white/80 dark:bg-black/50 backdrop-blur-md text-neutral-900 dark:text-white"
                  )}
                >
                  <Menu className="w-6 h-6" />
               </button>
            </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-neutral-950 flex flex-col"
          >
             {/* Header */}
             <div className="p-6 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center gap-3 font-bold text-xl font-display text-neutral-900 dark:text-white">
                   <div className="w-10 h-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-neutral-900">
                      <span className="font-display font-black text-xl">N</span>
                   </div>
                   <span>EDC Nexus</span>
                </div>
                <button 
                   onClick={() => setIsMobileMenuOpen(false)} 
                   className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                >
                   <X className="w-6 h-6" />
                </button>
             </div>

             {/* Menu Items */}
             <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Navigation</div>
                
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    onClick={() => {
                      onNavigate('home');
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "text-left text-4xl font-bold font-display py-3 border-b border-neutral-100 dark:border-neutral-900 transition-colors",
                      currentPage === 'home' ? "text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-600"
                    )}
                >
                  Home Hub
                </motion.button>

                {clubs.map((club, i) => (
                  <motion.button
                    key={club.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => {
                      onNavigate(club.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "text-left text-4xl font-bold font-display py-3 border-b border-neutral-100 dark:border-neutral-900 transition-colors flex items-center justify-between group",
                      currentPage === club.id ? "text-neutral-900 dark:text-white" : "text-neutral-400 dark:text-neutral-600"
                    )}
                  >
                    {club.name}
                    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </motion.button>
                ))}
                
                <div className="mt-8">
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Preferences</div>
                    <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
                        <span className="font-medium text-neutral-900 dark:text-white">Theme Mode</span>
                        <ThemeToggle />
                    </div>
                </div>
             </div>

             {/* Footer Action */}
             <div className="p-6 border-t border-neutral-100 dark:border-neutral-900">
                <button 
                  onClick={() => {
                    onJoin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-5 bg-neutral-900 dark:bg-white text-white dark:text-black text-lg font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                  Join the Ecosystem
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};