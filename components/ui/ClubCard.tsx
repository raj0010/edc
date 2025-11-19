import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
  
  // Heuristic: show tooltip if description is likely to be clamped or is long enough to warrant one.
  // 120 characters is approximately 2-3 lines.
  const showTooltip = description.length > 120;

  // Mouse position state for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax transforms
  // Background moves opposite to mouse for depth effect (or with mouse for spotlight effect)
  const bgX = useTransform(mouseX, [-0.5, 0.5], ["15%", "-15%"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["15%", "-15%"]);

  return (
    <motion.div
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      whileHover={{ y: -5 }}
      className="group block w-72 h-96 relative cursor-pointer flex-shrink-0 perspective-1000"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      aria-label={`Explore ${title}`}
    >
      <div 
        className={cn(
          'w-full h-full bg-[#161616] border border-gray-800 flex flex-col relative shadow-2xl rounded-xl backface-hidden transition-colors duration-500 group-hover:border-gray-600'
        )}
      >
        {/* Visual background gradient container - Clipped to maintain rounded corners for background */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <motion.div
              style={{ x: bgX, y: bgY, scale: 1.5 }}
              className={`absolute inset-0 w-full h-full bg-gradient-to-t ${color} opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl`}
            ></motion.div>
            
            {/* Grain overlay for texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        </div>

        {/* Content Layer - Z-indexed above background */}
        <div className="relative flex flex-col h-full justify-between z-10 p-6">
          <div className="flex flex-col items-start">
            <div className="p-4 rounded-2xl bg-gray-900/80 w-fit border border-gray-700/50 mb-6 backdrop-blur-md shadow-inner group-hover:bg-gray-800/80 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-white/5">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-white text-2xl font-bold font-display tracking-tight mb-3">{title}</h3>
            
            {/* Description with hover tooltip */}
            <div className="relative group/desc">
              <p className="text-neutral-400 text-sm leading-relaxed line-clamp-4 group-hover:text-neutral-300 transition-colors duration-300">
                {description}
              </p>
              
              {/* Cinematic Tooltip for long descriptions */}
              {showTooltip && (
                <div className="absolute left-0 top-full mt-4 w-64 p-4 bg-neutral-950/95 border border-neutral-800 rounded-xl shadow-2xl opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible transition-all duration-300 z-50 pointer-events-none translate-y-2 group-hover/desc:translate-y-0 backdrop-blur-md">
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-neutral-950 border-t border-l border-neutral-800 transform rotate-45"></div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-sm font-medium text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Explore Club <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
