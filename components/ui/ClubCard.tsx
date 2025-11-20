import React from 'react';
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

interface ClubCardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onClick'> {
  club: Club;
  onClick?: () => void;
}

export const ClubCard = ({ club, onClick, className, onKeyDown, ...props }: ClubCardProps) => {
  const { icon: Icon, name, description, color, tagline } = club;
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
    onKeyDown?.(e);
  };
  
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "relative overflow-hidden border-0 rounded-[2rem] transition-all duration-500 shadow-2xl cursor-pointer group select-none",
        "outline-none focus-visible:ring-4 focus-visible:ring-neutral-900 dark:focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-offset-black",
        "bg-gradient-to-br",
        color,
        className
      )}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...props}
    >
        {/* --- Background Layers --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           {/* 1. Repeated Typography Texture */}
           <div className="absolute -inset-10 opacity-[0.08] -rotate-12 scale-150 flex flex-col gap-4 justify-center items-center">
             {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="text-6xl font-black uppercase text-black whitespace-nowrap leading-none tracking-tighter">
                  {name.replace(' Club', '')}
                </div>
             ))}
           </div>
           
           {/* 2. Noise Grain Overlay */}
           <div className="absolute inset-0 opacity-25 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
           
           {/* 3. Vignette */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5"></div>
        </div>

        {/* --- Content Container --- */}
        <div className="relative z-10 flex flex-col h-full justify-between p-2">
          
          <CardHeader className="space-y-4 pt-8">
            {/* Floating Icon Badge */}
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <Icon className="w-6 h-6 text-neutral-900" strokeWidth={2} />
            </div>
            
            <div className="space-y-1">
              <CardTitle className="text-4xl font-black text-neutral-900 uppercase font-display tracking-tighter leading-[0.85] drop-shadow-sm">
                {name.replace(' Club', '')}
              </CardTitle>
              <p className="text-[10px] font-bold text-neutral-900/70 tracking-widest uppercase font-sans pl-1 border-l-2 border-neutral-900/30 ml-1">
                {tagline}
              </p>
            </div>
          </CardHeader>

          <CardContent className="pb-2">
             <CardDescription className="text-neutral-900/90 font-medium text-sm leading-relaxed line-clamp-3 mix-blend-multiply">
                {description}
             </CardDescription>
          </CardContent>

          <CardFooter className="pb-6 pt-2">
            <div className="flex items-center gap-4 group/btn w-full">
               {/* Expanding Button */}
               <span className="h-10 rounded-full bg-neutral-900 text-white flex items-center justify-between px-1.5 w-10 group-hover/btn:w-full transition-all duration-300 overflow-hidden shadow-xl hover:bg-black">
                  <span className="absolute opacity-0 group-hover/btn:opacity-100 whitespace-nowrap text-[10px] font-bold pl-3 transition-opacity duration-300 delay-75 uppercase tracking-wider">
                    Explore
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center ml-auto shrink-0">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
               </span>
            </div>
          </CardFooter>
        </div>
        
        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-soft-light"></div>
    </Card>
  );
};