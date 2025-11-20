import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Club } from '../types';
import { ClubCard } from './ui/ClubCard';

interface ClubShowcaseProps {
  clubs: Club[];
  onExplore: (id: string) => void;
}

export const ClubShowcase: React.FC<ClubShowcaseProps> = ({ clubs, onExplore }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [fanProgress, setFanProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  // Map scroll progress to fan openness (0 = Stacked, 1 = Fanned)
  const openness = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );

  useMotionValueEvent(openness, "change", (latest) => {
    setFanProgress(latest);
  });

  const hoveredClub = hoveredIndex !== null ? clubs[hoveredIndex] : null;

  // Dynamic Background Color based on hovered club
  const getGradientColor = () => {
    if (!hoveredClub) return 'bg-indigo-500/5 dark:bg-indigo-500/10';
    // Extract primary color from the club's gradient string or map manually
    if (hoveredClub.id === 'marketing') return 'bg-pink-500/10';
    if (hoveredClub.id === 'startup') return 'bg-violet-500/10';
    if (hoveredClub.id === 'consulting') return 'bg-blue-500/10';
    if (hoveredClub.id === 'finance') return 'bg-emerald-500/10';
    return 'bg-neutral-500/10';
  };

  // Wider fan positions for "Enhanced" look
  const fanPositions = [
    { x: -60, y: 10, rotate: -15, scale: 0.9, zIndex: 1 },
    { x: -20, y: -10, rotate: -5, scale: 0.95, zIndex: 2 },
    { x: 20, y: -10, rotate: 5, scale: 0.95, zIndex: 3 },
    { x: 60, y: 10, rotate: 15, scale: 0.9, zIndex: 4 },
  ];

  return (
    <section 
      ref={containerRef}
      id="club-showcase" 
      className="relative py-32 md:py-40 bg-neutral-50 dark:bg-black overflow-hidden border-t border-neutral-200 dark:border-white/5 transition-colors duration-500"
    >
       {/* --- Ambient Dynamic Background --- */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-[800px] h-[800px] rounded-full blur-[120px] transition-colors duration-700 ${getGradientColor()}`}></div>
       </div>
       
       <div className="container mx-auto px-4 z-10 flex flex-col items-center relative">
        
        {/* --- Dynamic Header --- */}
        <div className="mb-16 md:mb-24 text-center h-32 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {hoveredClub ? (
                 <motion.div
                    key={hoveredClub.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                 >
                    <h2 className={`text-4xl md:text-6xl font-bold mb-2 font-display tracking-tight ${hoveredClub.accentColor}`}>
                       {hoveredClub.name}
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 font-medium">{hoveredClub.tagline}</p>
                 </motion.div>
              ) : (
                 <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                 >
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white font-display mb-4 tracking-tight">
                      Choose Your Path
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl text-center">
                       Four distinct clubs. One unified mission. Hover to explore the ecosystem.
                    </p>
                 </motion.div>
              )}
            </AnimatePresence>
        </div>

        {/* --- Card Fan Visual (Desktop) --- */}
        <div 
            className="relative w-full max-w-6xl mx-auto h-[500px] hidden md:flex justify-center items-center perspective-1000"
            onMouseLeave={() => setHoveredIndex(null)}
        >
           {clubs.map((club, index) => {
             const isHovered = hoveredIndex !== null;
             const isActive = hoveredIndex === index;
             const target = fanPositions[index] || { x: 0, y: 0, rotate: 0, scale: 0.9, zIndex: 0 };

             let animateProps = {};

             if (isHovered) {
               // --- HOVER STATE LOGIC ---
               const offset = index - hoveredIndex;
               
               if (offset === 0) {
                 // Active Card: Center and Pop
                 animateProps = { x: '0%', y: -50, scale: 1.1, rotate: 0, zIndex: 50 };
               } else {
                 // Siblings: Push away drastically
                 const side = Math.sign(offset);
                 const distance = Math.abs(offset);
                 animateProps = {
                   x: `${side * (50 + (distance - 1) * 20)}%`,
                   y: 20,
                   scale: 0.85,
                   rotate: side * 10,
                   zIndex: 40 - distance,
                   opacity: 0.6, // Dim siblings
                   filter: 'blur(2px)' // Blur siblings
                 };
               }
             } else {
               // --- SCROLL STATE LOGIC (Stack <-> Fan) ---
               const stackY = index * 2; 
               
               animateProps = {
                 x: `${target.x * fanProgress}%`,
                 y: (1 - fanProgress) * stackY + fanProgress * target.y,
                 rotate: target.rotate * fanProgress,
                 scale: (1 - fanProgress) * 0.9 + fanProgress * target.scale,
                 zIndex: target.zIndex,
                 opacity: 1,
                 filter: 'blur(0px)'
               };
             }
 
             return (
               <motion.div
                 key={club.id}
                 className="absolute cursor-pointer w-[280px] h-[400px]" // Explicit size for centering
                 style={{ 
                    transformOrigin: 'bottom center',
                    zIndex: index 
                 }}
                 onHoverStart={() => setHoveredIndex(index)}
                 animate={animateProps}
                 transition={{ 
                    type: 'spring', 
                    stiffness: isHovered ? 180 : 120, 
                    damping: 20,
                    mass: 0.8
                 }}
               >
                 <ClubCard 
                    club={club} 
                    onClick={() => onExplore(club.id)} 
                    className="w-full h-full shadow-2xl"
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                 />
               </motion.div>
             );
           })}
        </div>

        {/* --- Mobile Stack --- */}
        <div className="md:hidden w-full flex flex-col items-center gap-6 pb-12">
           {clubs.map((club, index) => (
             <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-full max-w-sm"
             >
               <ClubCard 
                  club={club} 
                  onClick={() => onExplore(club.id)}
                  className="w-full h-[380px]" 
               />
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};