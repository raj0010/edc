import React from 'react';
import { motion } from 'framer-motion';
import { Club } from '../../types';

interface ClubCardProps {
  club: Club;
  onClick?: () => void;
  index?: number;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club, onClick, index = 0 }) => {
  // Mapping visual to club.color (which is a gradient string like "from-pink-500 to-rose-500")
  // constructing the full gradient class
  const gradientClass = `bg-gradient-to-t ${club.color}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 25,
        delay: index * 0.1 
      }}
      onClick={onClick}
      className="group block w-full h-full min-h-[350px] cursor-pointer"
      aria-label={`Information for ${club.name}`}
    >
      <div className="w-full h-full bg-[#161616] border border-neutral-800 group-hover:border-neutral-600 flex flex-col overflow-hidden relative shadow-2xl rounded-xl transition-colors duration-300">
        {/* Visual background */}
        <div
          className={`absolute inset-0 w-full h-full ${gradientClass} opacity-10 group-hover:opacity-30 transition-opacity duration-500`}
        ></div>

        <div className="relative flex flex-col h-full justify-start z-10 p-6">
          <div className="mb-6">
            <div className="p-3 rounded-lg bg-neutral-900/50 w-fit border border-neutral-700/50 mb-4 backdrop-blur-sm group-hover:bg-neutral-800/80 transition-colors">
              <club.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white text-2xl font-bold font-display tracking-tight mb-2">{club.name}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {club.description}
            </p>
          </div>
          
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
             <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">{club.tagline}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};