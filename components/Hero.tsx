import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Globe2 } from 'lucide-react';
import { TypingText } from './ui/TypingText';

const GOLDEN_RATIO = 1.618;
const GOLDEN_EASE: [number, number, number, number] = [0.236, 1, 0.382, 1];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  
  // Parallax & Fade Effects
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 200]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const scrollToClubs = () => {
    const element = document.getElementById('club-showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden bg-neutral-50 dark:bg-[#050505]"
    >
      {/* Dynamic Background - Hidden in Dark Mode via class logic or opacity */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 mix-blend-screen dark:hidden"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
         
         {/* University Badge */}
         <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: GOLDEN_EASE }}
            className="mb-8 flex items-center gap-3 px-5 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-md shadow-sm"
         >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
              University School of Management
            </span>
         </motion.div>

         {/* Golden Ratio Typography Layout */}
         <div className="text-center relative py-6 perspective-1000 flex flex-col items-center gap-2 md:gap-4">
            {/* Wrapper for scroll parallax & opacity - separates scroll logic from entrance logic */}
            <motion.div style={{ y: y1, opacity }} className="relative z-10">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: GOLDEN_EASE, delay: 0.1 }}
                  className="text-[14vw] md:text-[10rem] leading-[0.8] font-black tracking-tighter text-neutral-950 dark:text-white font-display select-none"
                >
                   EDC
                </motion.h1>
            </motion.div>

            <motion.div 
              style={{ y: y2, opacity }}
              className="relative z-0"
            >
               <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: GOLDEN_EASE, delay: 0.2 }}
                  className="text-[6vw] md:text-[4rem] leading-[0.9] font-bold tracking-tight text-neutral-400 dark:text-neutral-600 font-display select-none"
               >
                  ENTREPRENEURSHIP CELL
               </motion.h1>
            </motion.div>
         </div>

         {/* Subtext & CTA */}
         <div className="mt-16 max-w-2xl text-center flex flex-col items-center relative z-20">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-10"
            >
               Fostering innovation across <span className="font-bold text-neutral-900 dark:text-white">5 Campuses</span>. 
               Run by the Student Council of SoM.
            </motion.p>

            <div className="flex flex-col md:flex-row items-center gap-6">
                <motion.button 
                   onClick={scrollToClubs}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.6, delay: 0.8, ease: GOLDEN_EASE }}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.98 }}
                   className="group relative px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-xs uppercase tracking-[0.15em] overflow-hidden shadow-2xl"
                >
                   <span className="relative z-10 flex items-center gap-3">
                      Explore Clubs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </span>
                   <div className="absolute inset-0 bg-neutral-800 dark:bg-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
            </div>
            
            {/* Campus Indicators */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-12 pt-8 border-t border-neutral-200 dark:border-white/5 w-full flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600"
            >
                {['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad'].map((city, i) => (
                    <div key={city} className="flex items-center gap-2">
                        <Globe2 className="w-3 h-3 opacity-50" />
                        <span>{city}</span>
                    </div>
                ))}
            </motion.div>
         </div>
      </div>
    </section>
  );
};