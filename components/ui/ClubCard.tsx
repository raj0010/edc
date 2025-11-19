import React from 'react';
import { motion } from 'framer-motion';
import { Club } from '../../types';

interface ClubCardProps {
  club: Club;
  onClick?: () => void;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club, onClick }) => {
  const { icon: Icon, name: title, description, color } = club;

  return (
    <motion.div
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      whileHover={{ y: -5 }}
      className="group block w-72 h-96 relative cursor-pointer flex-shrink-0"
      aria-label={`Information for ${title}`}
      onClick={onClick}
    >
      <div className="w-full h-full bg-[#161616] border border-gray-800 flex flex-col overflow-hidden relative shadow-2xl rounded-xl">
        {/* Visual background */}
        <div
          className={`absolute inset-0 w-full h-full bg-gradient-to-t ${color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
        ></div>

        <div className="relative flex flex-col h-full justify-start z-10 p-6">
          <div className="mb-2">
            <div className="p-2 rounded-lg bg-gray-900/50 w-fit border border-gray-700/50 mb-2 backdrop-blur-sm">
              <Icon className="w-6 h-6" style={{ color: 'white' }} />
            </div>
            <h3 className="text-white text-2xl font-bold font-display tracking-tight">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed pt-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};