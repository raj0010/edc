import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ 
  items, 
  direction = 'left', 
  speed = 20,
  className 
}) => {
  return (
    <div className={cn("relative flex overflow-hidden bg-neutral-900 dark:bg-white text-white dark:text-black py-4 md:py-6 transform -skew-y-1 my-12", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-neutral-900 dark:from-white dark:to-white z-10 opacity-20" />
      
      <motion.div
        initial={{ x: direction === 'left' ? 0 : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : 0 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-2xl md:text-4xl font-black font-display uppercase tracking-tighter">
              {item}
            </span>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-current" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};