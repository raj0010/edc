import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Rocket, TrendingUp, Megaphone, Briefcase, Globe2, ArrowUpRight, GraduationCap, Building2, LayoutGrid } from 'lucide-react';
import { cn } from '../../lib/utils';

// --- Types ---
interface BentoItemProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

// --- Components ---

const BentoCard: React.FC<BentoItemProps> = ({ className, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.236, 1, 0.382, 1] }} // Golden Ratio Ease
      className={cn(
        "group relative overflow-hidden rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-500",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neutral-100/50 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </motion.div>
  );
};

const CampusMapVisual = () => {
  const cities = [
    { name: 'Delhi', x: '30%', y: '30%' },
    { name: 'Mumbai', x: '25%', y: '60%' },
    { name: 'Bangalore', x: '45%', y: '80%' },
    { name: 'Pune', x: '30%', y: '65%' },
    { name: 'Hyderabad', x: '50%', y: '65%' },
  ];

  return (
    <div className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40">
       {/* Abstract Map Background */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
       <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          {/* Connection Lines */}
          <motion.path 
            d="M120,180 L140,195 L200,195 L180,240 L120,180" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            className="text-neutral-300 dark:text-neutral-700"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path 
             d="M120,90 L120,180"
             fill="none" 
             stroke="currentColor" 
             strokeWidth="0.5" 
             className="text-neutral-300 dark:text-neutral-700"
             initial={{ pathLength: 0 }}
             whileInView={{ pathLength: 1 }}
             transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          {cities.map((city, i) => (
             <g key={city.name} style={{ transformOrigin: `${city.x} ${city.y}` }}>
                <circle cx={city.x} cy={city.y} r="3" className="fill-neutral-900 dark:fill-white" />
                <circle cx={city.x} cy={city.y} r="8" className="stroke-neutral-900/20 dark:stroke-white/20 fill-none animate-ping" strokeWidth="1" />
                <text x={city.x} y={city.y} dx="12" dy="4" className="text-[8px] font-bold uppercase fill-neutral-500 dark:fill-neutral-400 tracking-widest">{city.name}</text>
             </g>
          ))}
       </svg>
    </div>
  );
};

const ClubListVisual = () => {
    const clubs = [
        { name: 'Marketing', icon: Megaphone, color: 'text-pink-500', bg: 'bg-pink-500/10' },
        { name: 'Startup', icon: Rocket, color: 'text-violet-500', bg: 'bg-violet-500/10' },
        { name: 'Consulting', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Finance', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="flex flex-col gap-3 mt-4 relative z-10">
            {clubs.map((club, i) => (
                <div key={club.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors group/item">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", club.bg, club.color)}>
                        <club.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 group-hover/item:text-neutral-900 dark:group-hover/item:text-white transition-colors">
                        {club.name} Club
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
            ))}
        </div>
    );
};

export const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Simplified Section Header for Flow */}
        <div className="mb-12 flex items-center gap-3">
            <div className="p-2 bg-neutral-900 dark:bg-white rounded-lg">
                <LayoutGrid className="w-5 h-5 text-white dark:text-black" />
            </div>
            <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-neutral-900 dark:text-white">
                Network Infrastructure
            </h2>
        </div>

        {/* The Grid - 4 Columns Desktop, 1 Column Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            
            {/* 1. Network Map (Large Square) */}
            <BentoCard className="md:col-span-2 md:row-span-2 bg-neutral-100 dark:bg-neutral-800/50 relative group">
                <div className="relative z-10 flex flex-col h-full pointer-events-none">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white dark:bg-black rounded-lg border border-neutral-200 dark:border-white/10 shadow-sm">
                            <Globe2 className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Pan-India Presence</span>
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 font-display">5 Major Campuses</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
                        Unified by a single vision. We operate as one cohesive unit across Delhi, Mumbai, Bangalore, Pune, and Hyderabad.
                    </p>
                    
                    {/* Interactive overlay hints */}
                    <div className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Active in all regions
                    </div>
                </div>

                {/* Map Visual */}
                <CampusMapVisual />
            </BentoCard>

            {/* 2. The 4 Clubs (Tall) */}
            <BentoCard className="md:col-span-1 md:row-span-2 flex flex-col" delay={0.1}>
                 <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                             <Users className="w-4 h-4 text-neutral-900 dark:text-white" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Structure</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display mb-1">4 Specialized Clubs</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
                        Targeted verticals for focused growth.
                    </p>
                 </div>
                 
                 <ClubListVisual />

                 <div className="mt-auto pt-6 border-t border-neutral-100 dark:border-white/5">
                     <p className="text-[10px] text-neutral-400 text-center uppercase tracking-widest">
                         Join any one or multiple
                     </p>
                 </div>
            </BentoCard>

            {/* 3. Student Governance (Square) */}
            <BentoCard className="md:col-span-1 md:row-span-1" delay={0.2}>
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400">EST. 2014</span>
                </div>
                
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display mb-2">Student Governed</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        100% run by the Student Council of the School of Management. A true democracy of ideas.
                    </p>
                </div>
                
                <div className="mt-4 flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border border-white dark:border-neutral-900 bg-neutral-200 dark:bg-neutral-700" />
                    ))}
                    <div className="w-6 h-6 rounded-full border border-white dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[8px] font-bold text-neutral-500">
                        +50
                    </div>
                </div>
            </BentoCard>

            {/* 4. Incubation (Square) */}
            <BentoCard className="md:col-span-1 md:row-span-1" delay={0.3}>
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                     <Building2 className="w-24 h-24 text-neutral-900 dark:text-white" />
                 </div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Impact</span>
                    </div>
                    
                    <div className="flex items-baseline gap-1 mb-1">
                        <h3 className="text-3xl font-black text-neutral-900 dark:text-white font-display">$2M+</h3>
                    </div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">Seed Funding Raised</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[150px]">
                        By student startups incubated through our launchpad program.
                    </p>
                 </div>
            </BentoCard>

        </div>
      </div>
    </section>
  );
};