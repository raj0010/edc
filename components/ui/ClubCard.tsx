import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Club } from '../../types';
import { cn } from '../../lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { getIcon } from '../../lib/iconMap';

// --- ClubCard Component ---

interface ClubCardProps {
  club: Club;
  onClick?: () => void;
  className?: string;
}

export const ClubCard = ({ club, onClick, className }: ClubCardProps) => {
  const { icon: iconName, name, description, color, tagline } = club;
  const Icon = getIcon(iconName);
  
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "relative overflow-hidden border-0 rounded-[1.5rem] transition-all duration-500 shadow-2xl cursor-pointer group select-none",
        "bg-gradient-to-br",
        color,
        className
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
    >
        {/* --- Background Layers --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           {/* 1. Repeated Typography Texture */}
           <div className="absolute -inset-10 opacity-[0.08] -rotate-12 scale-150 flex flex-col gap-4 justify-center items-center">
             {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="text-3xl md:text-5xl font-black uppercase text-black whitespace-nowrap leading-none tracking-tighter">
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
        <div className="relative z-10 flex flex-col h-full justify-between p-1">
          
          <CardHeader className="space-y-2 md:space-y-3 pt-4 px-4 md:pt-6 md:px-5">
            {/* Floating Icon Badge */}
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-neutral-900" strokeWidth={2} />
            </div>
            
            <div className="space-y-1">
              <CardTitle className="text-2xl md:text-3xl font-black text-neutral-900 uppercase font-display tracking-tighter leading-[0.9] drop-shadow-sm">
                {name.replace(' Club', '')}
              </CardTitle>
              <p className="text-[8px] md:text-[9px] font-bold text-neutral-900/70 tracking-widest uppercase font-sans pl-1 border-l-2 border-neutral-900/30 ml-1">
                {tagline}
              </p>
            </div>
          </CardHeader>

          <CardContent className="pb-2 px-4 md:px-5">
             <CardDescription className="text-neutral-900/90 font-medium text-[10px] md:text-xs leading-relaxed line-clamp-3 mix-blend-multiply">
                {description}
             </CardDescription>
          </CardContent>

          <CardFooter className="pb-4 pt-1 px-4 md:pb-5 md:px-5">
            <div className="flex items-center gap-4 group/btn w-full">
               {/* Expanding Button */}
               <span className="h-7 md:h-8 rounded-full bg-neutral-900 text-white flex items-center justify-between px-1 w-7 md:w-8 group-hover/btn:w-full transition-all duration-300 overflow-hidden shadow-xl hover:bg-black">
                  <span className="absolute opacity-0 group-hover/btn:opacity-100 whitespace-nowrap text-[9px] font-bold pl-2.5 transition-opacity duration-300 delay-75 uppercase tracking-wider">
                    Explore
                  </span>
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/20 flex items-center justify-center ml-auto shrink-0">
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

export const ClubCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden border border-neutral-200 dark:border-white/10 rounded-[1.5rem] bg-neutral-100 dark:bg-neutral-900 shadow-xl h-full flex flex-col justify-between p-1",
        className
      )}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-50 dark:opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      {/* Header */}
      <CardHeader className="space-y-3 pt-6 px-5 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800/50 animate-pulse border border-neutral-300 dark:border-neutral-700/50" />
        <div className="space-y-2 pt-2">
          <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800/50 rounded-lg animate-pulse" />
          <div className="h-3 w-1/3 bg-neutral-200 dark:bg-neutral-800/50 rounded-md animate-pulse" />
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-5 pb-2 relative z-10">
         <div className="space-y-2.5">
            <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800/50 rounded-full animate-pulse" />
            <div className="h-2 w-5/6 bg-neutral-200 dark:bg-neutral-800/50 rounded-full animate-pulse" />
            <div className="h-2 w-4/6 bg-neutral-200 dark:bg-neutral-800/50 rounded-full animate-pulse" />
         </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pb-5 px-5 relative z-10">
          <div className="flex items-center gap-4 w-full">
               <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800/50 animate-pulse ml-auto" />
          </div>
      </CardFooter>
      
      {/* Shimmer */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
    </Card>
  );
};