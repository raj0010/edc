import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, UserCircle } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import { Club } from '../types';
import { cn } from '../lib/utils';
import { EDCLogo } from './ui/EDCLogo';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onJoin: () => void;
  clubs: Club[];
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onJoin, clubs }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        <div className="pointer-events-auto bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-full px-2 py-2 flex items-center shadow-sm">
            {/* Logo */}
            <button 
              className="flex items-center gap-3 pl-3 pr-6 group" 
              onClick={() => onNavigate('home')}
            >
              <div className="relative w-8 h-8 group-hover:scale-105 transition-transform">
                 <EDCLogo className="w-full h-full" />
              </div>
              <span className="font-bold text-xs tracking-widest uppercase text-neutral-900 dark:text-white hidden sm:block">EDC</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-neutral-100/50 dark:bg-white/5 rounded-full p-1 border border-neutral-200/50 dark:border-white/5">
                {clubs.map((club) => (
                  <button
                    key={club.id}
                    onClick={() => onNavigate(club.id)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                      currentPage === club.id
                        ? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                    )}
                  >
                    {club.name.replace(' Club', '')}
                  </button>
                ))}
            </div>

            <div className="w-px h-6 bg-neutral-200 dark:bg-white/10 mx-4 hidden md:block"></div>

            {/* Actions */}
            <div className="flex items-center gap-2 pl-2 md:pl-0">
               <ThemeToggle />
               
               <button 
                 onClick={() => onNavigate('admin')}
                 className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                 aria-label="Admin Login"
               >
                 <UserCircle className="w-5 h-5" />
               </button>

               <button 
                 onClick={onJoin}
                 className="hidden md:flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
               >
                 Join <ArrowRight className="w-3 h-3" />
               </button>
               
               <button 
                  onClick={() => setIsMobileMenuOpen(true)} 
                  className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Menu className="w-5 h-5 text-neutral-900 dark:text-white" />
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
            className="fixed inset-0 z-[60] bg-white dark:bg-[#0F0F0F] flex flex-col p-6 transition-colors duration-300"
          >
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <EDCLogo className="w-10 h-10" />
                   <span className="font-display font-black text-2xl dark:text-white tracking-tighter">EDC</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                   <X className="w-8 h-8 dark:text-white" />
                </button>
             </div>

             <div className="flex flex-col gap-6">
                {clubs.map((club, idx) => (
                  <motion.button
                    key={club.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      onNavigate(club.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-3xl font-bold font-display uppercase tracking-tighter text-neutral-900 dark:text-white"
                  >
                    {club.name}
                  </motion.button>
                ))}
             </div>

             <div className="mt-auto space-y-4">
                <button 
                  onClick={() => {
                    onNavigate('admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm uppercase tracking-widest rounded-full"
                >
                  Admin Portal
                </button>
                <button 
                  onClick={() => {
                    onJoin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-sm uppercase tracking-widest rounded-full"
                >
                  Join Ecosystem
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};