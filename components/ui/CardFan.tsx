import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Club } from '../../types';
import { MoveRight } from 'lucide-react';

interface CardFanProps {
  clubs: Club[];
  onClubClick?: (id: string) => void;
}

export const CardFan: React.FC<CardFanProps> = ({ clubs, onClubClick }) => {
  const { scrollY } = useScroll();
  
  // Parallax effect for the container
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div 
      style={{ y, opacity }}
      className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center perspective-1000"
    >
      {clubs.map((club, index) => {
        // Calculate rotation spread
        const rotation = (index - (clubs.length - 1) / 2) * 10;
        const xOffset = (index - (clubs.length - 1) / 2) * 40;
        
        return (
          <motion.div
            key={club.id}
            onClick={() => onClubClick?.(club.id)}
            initial={{ rotate: 0, x: 0, y: 100, opacity: 0 }}
            animate={{ 
              rotate: rotation, 
              x: xOffset, 
              y: 0, 
              opacity: 1 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20, 
              delay: 0.2 + index * 0.1 
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 0, 
              zIndex: 10,
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
            }}
            className="absolute w-64 h-96 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col cursor-pointer group transition-colors duration-300 hover:border-neutral-600"
            style={{
              zIndex: index,
              transformOrigin: "bottom center",
              backgroundColor: "#171717" // neutral-900
            }}
          >
            {/* Card Visual Top */}
            <div className="h-1/2 bg-neutral-800 relative overflow-hidden">
               <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${club.color}`} />
               <div className="absolute inset-0 flex items-center justify-center">
                  <club.icon className="w-16 h-16 text-white opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
               </div>
            </div>
            
            {/* Card Content Bottom */}
            <div className="h-1/2 p-6 flex flex-col justify-between bg-neutral-900/95 backdrop-blur-sm">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{club.name}</h3>
                <p className="text-xs text-neutral-400 uppercase tracking-wider">{club.tagline}</p>
              </div>
              
              <div className="flex items-center text-sm text-neutral-300 font-medium group-hover:text-white transition-colors">
                Explore <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};