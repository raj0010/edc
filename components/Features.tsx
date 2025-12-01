
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureItem } from '../types';
import { getIcon } from '../lib/iconMap';
import { cn } from '../lib/utils';
import { ArrowRight, Sparkles, Code2, Rocket, Fingerprint, ChevronRight } from 'lucide-react';

interface FeaturesProps {
  features: FeatureItem[];
}

// --- Visual Components ---

const OrbVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full animate-pulse"></div>
    <div className="relative z-10 w-64 h-64 border border-neutral-300 dark:border-neutral-700 rounded-full flex items-center justify-center bg-white/10 dark:bg-black/20 backdrop-blur-sm">
      <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         className="absolute inset-0 rounded-full border border-dashed border-amber-500/30"
      />
      <motion.div
         animate={{ scale: [1, 1.1, 1] }}
         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
         className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/20"
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>
      
      {/* Orbiting Particles */}
      {[0, 120, 240].map((deg, i) => (
         <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, delay: i * 2, repeat: Infinity, ease: "linear" }}
         >
             <div className="absolute top-0 left-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
         </motion.div>
      ))}
    </div>
  </div>
);

const CodeVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center p-8 md:p-16">
     <div className="w-full h-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-neutral-800 relative z-10 flex flex-col">
         {/* Window Controls */}
         <div className="h-10 bg-[#2d2d2d] flex items-center px-4 gap-2 border-b border-neutral-700 shrink-0">
             <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
             <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
             <div className="ml-auto text-xs text-neutral-500 font-mono">incubator.config.ts</div>
         </div>
         {/* Code Area */}
         <div className="p-6 font-mono text-sm md:text-base leading-relaxed opacity-90 flex-1 overflow-hidden">
             <div className="flex gap-4">
                 <div className="text-neutral-600 select-none text-right hidden sm:block">1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8</div>
                 <div>
                     <span className="text-purple-400">import</span> {'{'} <span className="text-yellow-300">Mentorship</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-300">'@edc/core'</span>;<br/><br/>
                     <span className="text-purple-400">const</span> <span className="text-blue-400">incubate</span> = <span className="text-yellow-300">async</span> (idea) <span className="text-purple-400">=&gt;</span> {'{'} <br/>
                     &nbsp;&nbsp;<span className="text-neutral-500">// Validate market fit</span><br/>
                     &nbsp;&nbsp;<span className="text-purple-400">await</span> <span className="text-blue-300">validate</span>(idea);<br/>
                     &nbsp;&nbsp;<span className="text-purple-400">const</span> mvp = <span className="text-green-400">new</span> <span className="text-yellow-300">Prototype</span>();<br/>
                     &nbsp;&nbsp;<span className="text-blue-300">mvp</span>.<span className="text-yellow-300">scale</span>(<span className="text-orange-400">100x</span>);<br/>
                     &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-300">"Unicorn Status"</span>;<br/>
                     {'}'}
                     <motion.div 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2.5 h-5 bg-blue-400 ml-1 align-middle"
                     />
                 </div>
             </div>
         </div>
         {/* Glow Effect */}
         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none"></div>
     </div>
     {/* Backing elements */}
     <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/20 blur-[60px] rounded-full"></div>
  </div>
);

const LaunchVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center px-4 md:px-12">
      <div className="w-full h-64 md:h-80 flex items-end justify-between gap-4 relative z-10">
          {[30, 50, 45, 70, 60, 90, 100, 85, 110].map((h, i) => (
             <motion.div 
                key={i}
                initial={{ height: "10%" }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: i * 0.05, type: "spring" }}
                className="w-full bg-gradient-to-t from-violet-900/50 to-violet-500 rounded-t-lg relative group"
             >
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-violet-300 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                     {h}M
                 </div>
             </motion.div>
          ))}
          
          {/* Trend Line Overlay */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                </linearGradient>
              </defs>
              <motion.path 
                  d="M0 250 L40 180 L80 200 L120 120 L160 150 L200 50 L240 20 L280 60 L320 0" 
                  fill="none" 
                  stroke="url(#lineGradient)" 
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))" }}
              />
          </svg>
      </div>
       <div className="absolute -left-20 -top-20 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full"></div>
  </div>
);

// --- Main Component ---

export const Features: React.FC<FeaturesProps> = ({ features }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotate logic (pauses on hover)
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRotate, features.length]);

  return (
    <section 
        className="py-24 bg-neutral-50 dark:bg-[#0F0F0F] relative overflow-hidden transition-colors duration-300"
        onMouseEnter={() => setAutoRotate(false)}
        onMouseLeave={() => setAutoRotate(true)}
    >
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 md:text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-md mb-4">
               <Fingerprint className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Our Process</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display text-neutral-900 dark:text-white mb-6 uppercase tracking-tight">
                From Concept to <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-800 dark:from-neutral-400 dark:to-white">Reality</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                We've architected a 3-stage pipeline designed to transform raw student potential into market-ready ventures.
            </p>
        </div>

        {/* Command Center Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 min-h-[600px]">
            
            {/* Left Column: Navigation Stack */}
            <div className="lg:col-span-4 flex flex-col gap-4">
                {features.map((feature, index) => {
                    const isActive = activeTab === index;
                    const Icon = getIcon(feature.icon);

                    return (
                        <motion.button
                            key={feature.id}
                            onClick={() => setActiveTab(index)}
                            initial={false}
                            animate={{
                                backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                                borderColor: isActive ? "rgba(255,255,255,0.1)" : "transparent"
                            }}
                            className={cn(
                                "text-left w-full p-6 rounded-3xl border border-transparent transition-all duration-300 group relative overflow-hidden",
                                isActive 
                                    ? "bg-white dark:bg-white/5 border-neutral-200 dark:border-white/10 shadow-lg" 
                                    : "hover:bg-neutral-100 dark:hover:bg-white/5"
                            )}
                        >
                            {/* Progress Bar for Active State */}
                            {isActive && autoRotate && (
                                <motion.div 
                                    layoutId="progress"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 5, ease: "linear" }}
                                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-neutral-400 to-transparent opacity-50"
                                />
                            )}

                            <div className="flex items-center gap-4 mb-3 relative z-10">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
                                    isActive ? "bg-neutral-900 dark:bg-white text-white dark:text-black" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                                )}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className={cn(
                                        "text-xs font-bold uppercase tracking-widest block transition-colors",
                                        isActive ? feature.color : "text-neutral-400"
                                    )}>
                                        Step 0{index + 1}
                                    </span>
                                    <h3 className={cn(
                                        "text-xl font-bold font-display transition-colors",
                                        isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"
                                    )}>
                                        {feature.title}
                                    </h3>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 pl-14">
                                            {feature.description}
                                        </p>
                                        <div className="pl-14 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white group-hover:gap-3 transition-all">
                                            Learn More <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>

            {/* Right Column: Visual Viewport */}
            <div className="lg:col-span-8 relative min-h-[400px] lg:min-h-auto">
                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-2xl">
                    {/* Viewport Header UI */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-neutral-200 dark:border-white/5 z-20 flex items-center px-6 justify-between">
                         <div className="flex gap-2">
                             <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                         </div>
                         <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                             System Visualizer v2.0
                         </div>
                    </div>

                    {/* Active Visual Render */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="w-full h-full pt-12"
                        >
                            {/* Dynamic Background Gradient */}
                            <div className={cn(
                                "absolute inset-0 opacity-20 dark:opacity-30 transition-colors duration-700",
                                features[activeTab].bgGradient
                            )} />
                            
                            {/* Render Specific Visual */}
                            {features[activeTab].id === 'inspire' && <OrbVisual />}
                            {features[activeTab].id === 'build' && <CodeVisual />}
                            {features[activeTab].id === 'launch' && <LaunchVisual />}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
