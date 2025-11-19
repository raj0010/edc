import React from 'react';
import { motion } from 'framer-motion';
import { Club } from '../../types';
import { ArrowRight } from 'lucide-react';

// Inline utility for class merging
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ClubCardProps {
  club: Club;
  onClick?: () => void;
}

export const ClubCard = ({ club, onClick }: ClubCardProps) => {
  const { icon: Icon, name: title, description, color } = club;

  return (
    <motion.div
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      whileHover={{ y: -5 }}
      className="group block w-72 h-96 relative cursor-pointer flex-shrink-0 perspective-1000"
      onClick={onClick}
      role="button"
      aria-label={`Explore ${title}`}
    >
      <div 
        className={cn(
          'w-full h-full bg-[#161616] border border-gray-800 flex flex-col overflow-hidden relative shadow-2xl rounded-xl backface-hidden transition-colors duration-500 group-hover:border-gray-600'
        )}
      >
        {/* Visual background gradient */}
        <div
          className={`absolute inset-0 w-full h-full bg-gradient-to-t ${color} opacity-10 group-hover:opacity-30 transition-opacity duration-500`}
        ></div>
        
        {/* Grain overlay for texture (optional, adding for "cinematic" feel) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

        <div className="relative flex flex-col h-full justify-between z-10 p-6">
          <div className="flex flex-col items-start">
            <div className="p-3 rounded-xl bg-gray-900/80 w-fit border border-gray-700/50 mb-5 backdrop-blur-md shadow-inner group-hover:bg-gray-800/80 transition-colors">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white text-2xl font-bold font-display tracking-tight mb-3">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
              {description}
            </p>
          </div>
          
          <div className="flex items-center text-sm font-medium text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Explore Club <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};