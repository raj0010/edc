import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Club } from '../types';
import { ClubCard, ClubCardSkeleton } from './ui/ClubCard';
import { Sparkles } from 'lucide-react';

interface ClubShowcaseProps {
  clubs: Club[];
  onExplore: (id: string) => void;
  isLoading?: boolean;
}

const GOLDEN_RATIO = 1.618;
const GOLDEN_EASE: [number, number, number, number] = [0.236, 1, 0.382, 1];

export const ClubShowcase: React.FC<ClubShowcaseProps> = ({ clubs, onExplore, isLoading }) => {
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

  // Create dummy items for skeleton loading state
  const itemsToRender = isLoading 
    ? Array.from({ length: 4 }).map((_, i) => ({ id: `skeleton-${i}`, isSkeleton: true } as any))
    : clubs;

  return (
    <section id="club-showcase" className="relative py-12 md:py-24 bg-transparent overflow-hidden transition-colors duration-500 flex flex-col justify-center">
      
      {/* Light Background Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden translate-z-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-t from-white/20 dark:from-black/40 to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.618, ease: GOLDEN_EASE }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-md mb-4"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">The Ecosystem</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1618, ease: GOLDEN_EASE }}
            className="text-4xl md:text-6xl font-black font-display text-neutral-900 dark:text-white mb-3 tracking-tighter"
          >
            CHOOSE YOUR PATH
          </motion.h2>
        </div>

        {/* Responsive Fan Layout */}
        <div className="relative h-[600px] md:h-[500px] w-full max-w-5xl mx-auto flex items-center md:items-end justify-center perspective-[1000px]">
           {itemsToRender.map((item, index) => {
              const total = itemsToRender.length;
              const offset = index - (total - 1) / 2; 
              
              const isActive = activeIndex === index;
              const isAnyActive = activeIndex !== null;
              
              // --- Desktop Configuration ---
              // Golden Ratio Spacing
              const dtSpacing = 120; 
              // Golden Ratio Rotation: 1.618 * 4 deg approx
              const dtRotate = offset * 5; 
              const dtY = Math.abs(offset) * 15;

              // --- Mobile Configuration ---
              const mbSpacing = 0; 
              const mbRotate = offset * 8; 
              // Increased vertical spacing for mobile fan to prevent overlap
              const mbY = offset * 45;

              // Select Config
              const spacing = isMobile ? mbSpacing : dtSpacing;
              const baseRotate = isMobile ? mbRotate : dtRotate;
              const baseY = isMobile ? mbY : dtY;

              let rotate = baseRotate;
              let x = isMobile ? 0 : offset * spacing;
              let y = baseY;
              let scale = 1;
              let zIndex = index;
              let opacity = 1;
              let filter = "none"; 

              if (isActive && !isLoading) {
                  rotate = 0;
                  scale = isMobile ? 1.1 : 1.2;
                  zIndex = 100; // Ensure active card is on top
                  // Lift active card significantly
                  y = isMobile ? -100 : -100; 
                  if (isMobile) {
                      x = 0; 
                  }
              } else if (isAnyActive && !isLoading) {
                  scale = 0.9;
                  opacity = isMobile ? 0.5 : 0.6;
                  filter = "blur(2px) grayscale(0.5)"; 
              }

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 500, rotate: 0 }}
                  whileInView={{ opacity: opacity, y: baseY, rotate: baseRotate, x: isMobile ? 0 : offset * spacing }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 20,
                    mass: 1,
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
                  onHoverStart={() => !isMobile && !isLoading && setActiveIndex(index)}
                  onHoverEnd={() => !isMobile && !isLoading && setActiveIndex(null)}
                  onClick={() => !isLoading && handleCardClick(index, item.id)}
                  className="absolute w-[240px] h-[340px] md:w-[260px] md:h-[380px] rounded-[1.5rem] shadow-2xl cursor-pointer touch-pan-y bg-neutral-900 border border-white/10 origin-bottom"
                  style={{ 
                    transformOrigin: "bottom center",
                    marginTop: isMobile ? '0px' : '0px'
                  }}
                >
                  {isLoading || item.isSkeleton ? (
                    <ClubCardSkeleton className="w-full h-full pointer-events-none" />
                  ) : (
                    <ClubCard 
                       club={item} 
                       className="w-full h-full pointer-events-none" 
                    />
                  )}
                  
                  {isMobile && isActive && !isLoading && (
                    <div className="absolute -bottom-14 left-0 right-0 text-center pointer-events-none z-[60]">
                       <motion.span 
                         initial={{ opacity: 0, y: -5 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="text-[10px] font-bold text-neutral-900 dark:text-white bg-white/90 dark:bg-black/90 px-4 py-2 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-800 uppercase tracking-widest"
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