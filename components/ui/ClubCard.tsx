import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Club } from '../../types';
import { cn } from '../../lib/utils';

// --- Card UI Primitives ---

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// --- ClubCard Component ---

interface ClubCardProps {
  club: Club;
  onClick?: () => void;
  className?: string;
}

export const ClubCard = ({ club, onClick, className }: ClubCardProps) => {
  const { icon: Icon, name, description, color, tagline } = club;
  
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "relative overflow-hidden border-0 rounded-[2rem] transition-all duration-500 shadow-2xl cursor-pointer group select-none",
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