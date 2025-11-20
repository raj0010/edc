import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Club } from '../../types';
import { cn } from '../../lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

interface ClubCardProps {
  club: Club;
  onClick?: () => void;
}

export const ClubCard = ({ club, onClick }: ClubCardProps) => {
  const { icon: Icon, name, description, color, tagline } = club;
  
  // --- 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="w-[300px] h-[420px] perspective-1000 group cursor-pointer focus:outline-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
    >
      <Card className={cn(
        "relative w-full h-full overflow-hidden border-0 rounded-[2rem] transition-all duration-500 shadow-2xl",
        "bg-gradient-to-br",
        color
      )}>
        
        {/* --- Background Layers --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           {/* 1. Repeated Typography Texture */}
           <div className="absolute -inset-10 opacity-10 -rotate-12 scale-150 select-none flex flex-col gap-4 justify-center items-center">
             {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="text-6xl font-black uppercase text-black whitespace-nowrap leading-none tracking-tighter">
                  {name.replace(' Club', '')}
                </div>
             ))}
           </div>
           
           {/* 2. Noise Grain Overlay for Texture */}
           <div className="absolute inset-0 opacity-25 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
           
           {/* 3. Vignette for Depth */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* --- Content Container --- */}
        <div className="relative z-10 flex flex-col h-full justify-between p-2">
          
          <CardHeader className="space-y-3">
            {/* Floating Icon Badge */}
            <div className="w-12 h-12 bg-black/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-black/5 shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
              <Icon className="w-6 h-6 text-neutral-900" strokeWidth={2} />
            </div>
            
            <div className="space-y-1">
              <CardTitle className="text-4xl font-black text-neutral-900 uppercase font-display tracking-tighter leading-[0.85] drop-shadow-sm">
                {name.replace(' Club', '')}
              </CardTitle>
              <p className="text-xs font-bold text-neutral-900/70 tracking-widest uppercase font-sans pl-1">
                {tagline}
              </p>
            </div>
          </CardHeader>

          <CardContent className="pb-0">
             <CardDescription className="text-neutral-900/90 font-medium text-base leading-relaxed line-clamp-4 mix-blend-multiply border-l-2 border-neutral-900/20 pl-4">
                {description}
             </CardDescription>
          </CardContent>

          <CardFooter className="pb-6 pt-4">
            <div className="flex items-center gap-4 group/btn w-full">
               {/* Expanding Button */}
               <span className="h-10 rounded-full bg-neutral-900 text-white flex items-center justify-between px-1 w-10 group-hover/btn:w-full transition-all duration-300 overflow-hidden shadow-xl hover:bg-black">
                  <span className="absolute opacity-0 group-hover/btn:opacity-100 whitespace-nowrap text-xs font-bold pl-3 transition-opacity duration-300 delay-75">
                    JOIN THE CLUB
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ml-auto">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </span>
               </span>
            </div>
          </CardFooter>
        </div>
        
        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none mix-blend-overlay"></div>

      </Card>
    </motion.div>
  );
};