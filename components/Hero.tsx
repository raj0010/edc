import React from 'react';
import { motion } from 'framer-motion';
import { Club } from '../types';
import { ClubCard } from './ui/ClubCard';

interface HeroProps {
  clubs: Club[];
  onExplore: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ clubs, onExplore }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-20 overflow-hidden bg-black selection:bg-neutral-800 selection:text-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a1a1a_0%,_#000000_100%)] -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-24 max-w-4xl"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-3 py-1 mb-6 text-xs font-medium tracking-widest text-neutral-400 uppercase bg-neutral-900/50 rounded-full border border-neutral-800 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Entrepreneur Development Cell
          </motion.span>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 font-display leading-[0.9]">
            Build The <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500">Future Today</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            The premier ecosystem for student entrepreneurs. Turn your vision into reality with our four specialized clubs.
          </p>
        </motion.div>

        {/* Desktop Fan Layout */}
        <div className="hidden md:flex relative w-full max-w-5xl mx-auto h-[500px] justify-center items-center mt-4 perspective-[2000px]">
          {clubs.map((club, index) => {
            const total = clubs.length;
            const midpoint = (total - 1) / 2;
            const spread = index - midpoint;
            // Fan Geometry
            const rotate = spread * 5; // Degrees of rotation
            const x = spread * 130; // Horizontal spacing
            const y = Math.abs(spread) * 20; // Arch effect

            return (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 200, rotate: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: y, rotate: rotate, x: x, scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 80, 
                  damping: 20, 
                  delay: 0.4 + (index * 0.1) 
                }}
                style={{ 
                  zIndex: index,
                  transformOrigin: "bottom center"
                }}
                whileHover={{ 
                  zIndex: 50, 
                  scale: 1.15, 
                  rotate: 0, 
                  y: -50,
                  transition: { type: "spring", stiffness: 200, damping: 20 }
                }}
                className="absolute cursor-pointer"
              >
                <ClubCard club={club} onClick={() => onExplore(club.id)} />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Stack Layout */}
        <div className="md:hidden w-full flex flex-col items-center gap-6 pb-12">
           {clubs.map((club, index) => (
             <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
             >
               <ClubCard club={club} onClick={() => onExplore(club.id)} />
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};