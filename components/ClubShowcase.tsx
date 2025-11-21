import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Club } from '../types';
import { ClubCard } from './ui/ClubCard';

interface ClubShowcaseProps {
  clubs: Club[];
  onExplore: (id: string) => void;
}

export const ClubShowcase: React.FC<ClubShowcaseProps> = ({ clubs, onExplore }) => {
  const [hoveredClubId, setHoveredClubId] = useState<string | null>(null);

  const hoveredClub = clubs.find(c => c.id === hoveredClubId) || null;

  // Dynamic Background Color based on hovered club
  const getGradientColor = () => {
    if (!hoveredClub) return 'bg-indigo-500/5 dark:bg-indigo-500/10';
    if (hoveredClub.id === 'marketing') return 'bg-pink-500/10';
    if (hoveredClub.id === 'startup') return 'bg-violet-500/10';
    if (hoveredClub.id === 'consulting') return 'bg-blue-500/10';
    if (hoveredClub.id === 'finance') return 'bg-emerald-500/10';
    return 'bg-neutral-500/10';
  };

  return (
    <section 
      id="club-showcase" 
      className="relative py-24 md:py-32 bg-neutral-50 dark:bg-black overflow-hidden border-t border-neutral-200 dark:border-white/5 transition-colors duration-500"
    >
       {/* --- Ambient Dynamic Background --- */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-[800px] h-[800px] rounded-full blur-[120px] transition-colors duration-700 ${getGradientColor()}`}></div>
       </div>
       
       <div className="container mx-auto px-4 z-10 flex flex-col items-center relative">
        
        {/* --- Dynamic Header --- */}
        <div className="mb-12 md:mb-24 text-center h-32 flex flex-col items-center justify-center">
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
                       Hover over the cards to explore our specialized clubs.
                    </p>
                 </motion.div>
              )}
            </AnimatePresence>
        </div>

        {/* --- FAN LAYOUT (Desktop) --- */}
        <div className="hidden md:flex relative w-full max-w-5xl h-[500px] mx-auto perspective-1000 justify-center items-center">
           <div className="relative flex justify-center items-end w-full h-full pb-20">
             {clubs.map((club, index) => {
               // Fan configuration
               const total = clubs.length;
               const center = (total - 1) / 2;
               const i = index - center;
               
               const isHovered = hoveredClubId === club.id;
               
               // Fan Calculation:
               // Rotate around bottom center.
               // Spread x slightly to unstack them.
               // Lift y slightly for arch effect (center higher)
               
               // Increased angles and spacing for a wider fan effect
               const baseRotate = i * 8; 
               const baseX = i * 70;      
               const baseY = Math.abs(i) * 15; 

               return (
                 <motion.div
                   key={club.id}
                   className="absolute w-[280px] h-[400px] cursor-pointer"
                   style={{ 
                     transformOrigin: 'bottom center',
                     zIndex: isHovered ? 50 : index // Instant z-index switch for stacking context
                   }}
                   initial={{ x: baseX, y: baseY, rotate: baseRotate, scale: 1 }}
                   animate={{ 
                     x: baseX, 
                     y: isHovered ? -50 : baseY, // Reduced lift from -100 to -50
                     rotate: isHovered ? 0 : baseRotate, // Straighten on hover
                     scale: isHovered ? 1.05 : 1, // Reduced scale from 1.1 to 1.05
                     zIndex: isHovered ? 50 : index 
                   }}
                   transition={{ 
                     type: "spring", 
                     stiffness: 300, // Slightly softer spring
                     damping: 25,
                     mass: 0.8 
                   }}
                   onHoverStart={() => setHoveredClubId(club.id)}
                   onHoverEnd={() => setHoveredClubId(null)}
                 >
                   <ClubCard 
                      club={club} 
                      onClick={() => onExplore(club.id)} 
                      className="w-full h-full shadow-2xl hover:shadow-neutral-500/40 dark:hover:shadow-white/20 border border-neutral-200 dark:border-white/5 transition-shadow duration-300"
                   />
                 </motion.div>
               );
             })}
           </div>
        </div>

        {/* --- LIST LAYOUT (Mobile) --- */}
        <div className="md:hidden w-full flex flex-col gap-6">
           {clubs.map((club, index) => (
             <motion.div
               key={club.id}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="h-[400px] w-full"
               onClick={() => setHoveredClubId(club.id)}
             >
               <ClubCard 
                  club={club} 
                  onClick={() => onExplore(club.id)} 
                  className="w-full h-full shadow-xl"
               />
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};