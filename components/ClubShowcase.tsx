import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Club } from '../types';
import { ClubCard } from './ui/ClubCard';
import { Sparkles, Hand } from 'lucide-react';
import { cn } from '../lib/utils';

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
    <section id="club-showcase" className="relative py-12 md:py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden transition-colors duration-500 min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center">
      
      {/* Background Ambiance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-t from-neutral-200/20 dark:from-neutral-900/40 to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">The Ecosystem</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-display text-neutral-900 dark:text-white mb-6 tracking-tight">
            Choose Your Path
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto font-light">
            {isMobile ? "Tap a card to view details. Tap again to enter." : "Hover to explore. Click to enter."}
          </p>
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
              // Tighter stacking, wider rotation fan
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
                  y = isMobile ? -20 : -80; // Pop up amount
                  if (isMobile) {
                      x = 0; // Center on mobile
                  }
              } else if (isAnyActive) {
                  // Inactive Siblings
                  scale = 0.95;
                  opacity = isMobile ? 0.4 : 0.6;
                  filter = "blur(2px) grayscale(0.5)";
              }

              return (
                <motion.div
                  key={club.id}
                  // Initial entrance animation
                  initial={{ opacity: 0, y: 500, rotate: 0 }}
                  whileInView={{ opacity: opacity, y: baseY, rotate: baseRotate, x: offset * spacing }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 20, 
                    delay: index * 0.1 
                  }}
                  // Reactive animation
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
                  style={{
                    transformOrigin: "50% 120%", // Pivot from bottom center
                    position: 'absolute',
                    bottom: isMobile ? '10%' : 0, // Lift slightly on mobile
                  }}
                  className="w-[180px] h-[260px] md:w-[220px] md:h-[320px] cursor-pointer will-change-transform touch-manipulation"
                >
                   <ClubCard 
                     club={club} 
                     className="h-full w-full shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-white/10"
                   />
                   
                   {/* Mobile Tap Hint Overlay (only if nothing active) */}
                   {isMobile && !isAnyActive && (
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 animate-[pulse_3s_ease-in-out_infinite]">
                           <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                               <Hand className="w-4 h-4 text-white opacity-80" />
                           </div>
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