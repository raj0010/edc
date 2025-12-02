import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, UserCircle, Home, Calendar, Info, Newspaper, Sparkles } from 'lucide-react';
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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'Our Story', icon: Info },
    { id: 'events', label: 'Calendar', icon: Calendar },
    { id: 'news', label: 'Newsroom', icon: Newspaper },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-3 md:pt-6 md:px-4 pointer-events-none"
      >
        <div className="pointer-events-auto bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-xl border border-neutral-200/50 dark:border-white/10 rounded-full pl-4 pr-2 py-2 md:pl-3 md:pr-3 flex items-center shadow-lg shadow-black/5 w-full max-w-5xl justify-between md:justify-start">
            
            {/* Logo */}
            <button 
              className="flex items-center gap-3 md:pr-4 group" 
              onClick={() => onNavigate('home')}
            >
              <div className="relative w-8 h-8 md:w-9 md:h-9 group-hover:scale-105 transition-transform">
                 <EDCLogo className="w-full h-full text-neutral-900 dark:text-white" />
              </div>
              <span className="font-bold text-xs tracking-widest uppercase text-neutral-900 dark:text-white font-display">EDC Nexus</span>
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

            <div className="w-px h-6 bg-neutral-200 dark:bg-white/10 mx-2 md:mx-4 hidden md:block"></div>

            {/* Actions */}
            <div className="flex items-center gap-2">
               <div className="hidden md:block">
                   <ThemeToggle />
               </div>
               
               {/* Mobile Theme Toggle (embedded in actions for better reach) */}
               <div className="md:hidden">
                    <ThemeToggle />
               </div>

               {/* Desktop Actions */}
               <button 
                 onClick={() => onNavigate('admin')}
                 className="hidden md:flex p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                 aria-label="Admin Login"
               >
                 <UserCircle className="w-5 h-5" />
               </button>

               <button 
                 onClick={onJoin}
                 className="hidden md:flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
               >
                 Join <ArrowRight className="w-3 h-3" />
               </button>
               
               {/* Mobile Menu Trigger */}
               <button 
                  onClick={() => setIsMobileMenuOpen(true)} 
                  className="md:hidden p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-white/5"
                  aria-label="Open Menu"
                >
                  <Menu className="w-5 h-5" />
               </button>
            </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[60] bg-[#fafafa]/95 dark:bg-[#0F0F0F]/95 backdrop-blur-2xl flex flex-col"
          >
             {/* Background Texture */}
             <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
             
             {/* Header inside Menu */}
             <div className="flex justify-between items-center p-4 pt-5 px-5 relative z-10 border-b border-neutral-200/50 dark:border-white/5">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-200 dark:border-white/10 shadow-sm">
                       <EDCLogo className="w-6 h-6 text-neutral-900 dark:text-white" />
                   </div>
                   <div className="flex flex-col">
                      <span className="font-display font-black text-lg text-neutral-900 dark:text-white leading-none tracking-tight">EDC NEXUS</span>
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mt-1">Student Chapter</span>
                   </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:rotate-90 transition-transform border border-neutral-200 dark:border-white/5"
                >
                   <X className="w-5 h-5" />
                </button>
             </div>

             {/* Scrollable Content */}
             <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-8 relative z-10 no-scrollbar">
                
                {/* 1. Main Navigation */}
                <div className="space-y-3">
                   <div className="flex items-center gap-2 mb-2 pl-1">
                        <Sparkles className="w-3 h-3 text-neutral-400" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Explore</p>
                   </div>
                   {navLinks.map((link, idx) => {
                      const isActive = currentPage === link.id;
                      return (
                        <motion.button
                          key={link.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (idx * 0.05) }}
                          onClick={() => {
                            onNavigate(link.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-4 p-3.5 rounded-2xl border active:scale-[0.98] transition-all group relative overflow-hidden",
                            isActive 
                              ? "bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg"
                              : "bg-white dark:bg-white/5 border-neutral-200 dark:border-white/5 text-neutral-900 dark:text-white"
                          )}
                        >
                          <div className={cn(
                             "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
                             isActive
                               ? "bg-white/20 text-white dark:text-black"
                               : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                          )}>
                              <link.icon className="w-5 h-5" />
                          </div>
                          <span className="text-base font-bold tracking-tight">{link.label}</span>
                          {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                        </motion.button>
                      );
                   })}
                </div>

                {/* 2. Clubs Navigation */}
                <div className="space-y-3">
                   <div className="flex items-center gap-2 mb-2 pl-1">
                        <div className="w-1 h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Our Clubs</p>
                   </div>
                   <div className="grid grid-cols-1 gap-3">
                      {clubs.map((club, idx) => {
                        const isActive = currentPage === club.id;
                        return (
                          <motion.button
                            key={club.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (idx * 0.05) }}
                            onClick={() => {
                              onNavigate(club.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className={cn(
                                "w-full text-left p-4 rounded-2xl border relative overflow-hidden group transition-all active:scale-[0.98]",
                                isActive 
                                    ? `border-${club.accentColor.split('-')[1]}-500/50 dark:border-${club.accentColor.split('-')[1]}-400/50 bg-${club.accentColor.split('-')[1]}-50/50 dark:bg-${club.accentColor.split('-')[1]}-900/10`
                                    : "bg-white dark:bg-white/5 border-neutral-200 dark:border-white/5"
                            )}
                          >
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        isActive ? `bg-${club.accentColor.split('-')[1]}-500` : "bg-neutral-300 dark:bg-neutral-700"
                                    )}></div>
                                    <span className={cn(
                                        "font-display font-bold text-base uppercase tracking-tight",
                                        isActive ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400"
                                    )}>
                                        {club.name}
                                    </span>
                                </div>
                                {isActive && (
                                    <div className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-${club.accentColor.split('-')[1]}-500/30 text-${club.accentColor.split('-')[1]}-600 dark:text-${club.accentColor.split('-')[1]}-300`}>
                                        View
                                    </div>
                                )}
                            </div>
                          </motion.button>
                        );
                      })}
                   </div>
                </div>
             </div>

             {/* Footer Actions */}
             <div className="p-5 border-t border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md relative z-20">
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <button 
                      onClick={() => {
                        onNavigate('admin');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 py-3.5 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-white/5 shadow-sm"
                    >
                      <UserCircle className="w-4 h-4" /> Admin
                    </button>
                    <button 
                      onClick={() => {
                        onJoin();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-black/10 dark:shadow-white/10"
                    >
                      Join Now <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
                <div className="text-center">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">© 2024 EDC Nexus</p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};