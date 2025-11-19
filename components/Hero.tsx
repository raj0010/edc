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
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 max-w-3xl"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
            Entrepreneur Development Cell
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 font-display">
            Where Visionaries <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500">Build The Future</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Join the ecosystem of innovators. We foster the next generation of leaders through four dedicated pillars of excellence.
          </p>
        </motion.div>

        {/* Club Cards Display */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex flex-wrap justify-center gap-6 mb-10"
        >
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} onClick={() => onExplore(club.id)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};