import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe2 } from 'lucide-react';
import { TypingText } from './ui/TypingText';

const GOLDEN_EASE: [number, number, number, number] = [0.236, 1, 0.382, 1];

interface HeroProps {
    taglines?: string[];
    campuses?: string[];
}

const DEFAULT_TAGLINES = [
  "The Launchpad for Limitless Ideas.",
  "Build What Others Imagine.",
  "Where Vision Meets Action."
];

const DEFAULT_CAMPUSES = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad'];

export const Hero: React.FC<HeroProps> = ({ 
    taglines = DEFAULT_TAGLINES,
    campuses = DEFAULT_CAMPUSES
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  
  // Parallax & Fade Effects for the text container
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 150]);

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
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center pt-28 md:pt-32 pb-12 overflow-hidden"
    >
      {/* Dynamic Background - Hidden in Dark Mode via class logic or opacity */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 mix-blend-screen dark:hidden"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
         
         {/* University Badge */}
         <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: GOLDEN_EASE }}
            className="mb-8 md:mb-12 flex items-center gap-3 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-md shadow-sm"
         >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
              University School of Management
            </span>
         </motion.div>

         {/* Typing Headline */}
         <div className="min-h-[140px] sm:min-h-[180px] md:min-h-[280px] flex items-center justify-center perspective-1000 w-full">
            <motion.div style={{ y, opacity }} className="relative z-10 text-center w-full max-w-6xl mx-auto px-2 md:px-4">
                <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-neutral-900 dark:text-white font-display select-none leading-[1.2] md:leading-[1.1]">
                   <TypingText 
                      text={taglines}
                      typingSpeed={60}
                      deletingSpeed={30}
                      pauseDuration={2500}
                      className="justify-center text-center"
                      cursorColor="bg-blue-500 dark:bg-blue-400"
                   />
                </h1>
            </motion.div>
         </div>

         {/* Subtext & CTA */}
         <div className="mt-8 max-w-2xl text-center flex flex-col items-center relative z-20">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-sm md:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-8 md:mb-10 px-4"
            >
               The Entrepreneur Development Cell (EDC) is the student-led engine driving innovation across <span className="font-bold text-neutral-900 dark:text-white">5 Campuses</span>.
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
                      Explore Ecosystem <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </span>
                   <div className="absolute inset-0 bg-neutral-800 dark:bg-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
            </div>
            
            {/* Campus Indicators */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-12 pt-8 border-t border-neutral-200 dark:border-white/5 w-full flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-8 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600 px-6"
            >
                {campuses.map((city) => (
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