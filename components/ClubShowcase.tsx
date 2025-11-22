import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Club } from '../types';
import { ClubCard } from './ui/ClubCard';
import { Sparkles } from 'lucide-react';

interface ClubShowcaseProps {
  clubs: Club[];
  onExplore: (id: string) => void;
}

export const ClubShowcase: React.FC<ClubShowcaseProps> = ({ clubs, onExplore }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (index: number, clubId: string) => {
    if (isMobile) {
      if (activeIndex === index) {
        onExplore(clubId);
      } else {
        setActiveIndex(index);
      }
    } else {
      onExplore(clubId);
    }
  };

  return (
    <section id="club-showcase" className="relative py-6 md:py-10 bg-transparent overflow-hidden transition-colors duration-500 flex flex-col justify-center">
      
      {/* Light Background Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden translate-z-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-t from-white/20 dark:from-black/40 to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-6 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-md mb-3"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">The Ecosystem</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold font-display text-neutral-900 dark:text-white mb-2 tracking-tight">
            Choose Your Path
          </h2>
        </div>

        {/* Responsive Fan Layout */}
        <div className="relative h-[340px] md:h-[420px] w-full max-w-4xl mx-auto flex items-center md:items-end justify-center perspective-[1000px]">
           {clubs.map((club, index) => {
              const total = clubs.length;
              const offset = index - (total - 1) / 2; 
              
              const isActive = activeIndex === index;
              const isAnyActive = activeIndex !== null;
              
              // --- Desktop Configuration ---
              const dtSpacing = 110; 
              const dtRotate = offset * 5;
              const dtY = Math.abs(offset) * 15;

              // --- Mobile Configuration ---
              const mbSpacing = 30; 
              const mbRotate = offset * 8; 
              const mbY = Math.abs(offset) * 8; 

              // Select Config
              const spacing = isMobile ? mbSpacing : dtSpacing;
              const baseRotate = isMobile ? mbRotate : dtRotate;
              const baseY = isMobile ? mbY : dtY;

              let rotate = baseRotate;
              let x = offset * spacing;
              let y = baseY;
              let scale = 1;
              let zIndex = index;
              let opacity = 1;
              let filter = "none"; 

              if (isActive) {
                  rotate = 0;
                  scale = isMobile ? 1.1 : 1.15;
                  zIndex = 50;
                  y = isMobile ? -20 : -80; 
                  if (isMobile) {
                      x = 0; 
                  }
              } else if (isAnyActive) {
                  scale = 0.95;
                  opacity = isMobile ? 0.4 : 0.6;
                  filter = "grayscale(0.8)"; 
              }

              return (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 500, rotate: 0 }}
                  whileInView={{ opacity: opacity, y: baseY, rotate: baseRotate, x: offset * spacing }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 20, 
                    delay: index * 0.1 
                  }}
                  animate={{
                    rotate: rotate,
                    x: x,
                    y: y,
                    scale: scale,
                    zIndex: zIndex,
                    opacity: opacity,
                    filter: filter
                  }}
                  onHoverStart={() => !isMobile && setActiveIndex(index)}
                  onHoverEnd={() => !isMobile && setActiveIndex(null)}
                  onClick={() => handleCardClick(index, club.id)}
                  className="absolute w-[180px] h-[260px] md:w-[220px] md:h-[320px] rounded-[1.5rem] shadow-2xl cursor-pointer touch-pan-y"
                  style={{ transformOrigin: "bottom center" }}
                >
                  <ClubCard 
                     club={club} 
                     className="w-full h-full pointer-events-none" 
                  />
                  
                  {isMobile && isActive && (
                    <div className="absolute -bottom-8 left-0 right-0 text-center pointer-events-none">
                       <motion.span 
                         initial={{ opacity: 0, y: -5 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="text-xs font-bold text-neutral-900 dark:text-white bg-white/80 dark:bg-black/80 px-2 py-1 rounded-full shadow-sm"
                       >
                         Tap to Enter
                       </motion.span>
                    </div>
                  )}
                </motion.div>
              );
           })}
        </div>
      </div>
    </section>
  );
};