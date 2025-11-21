import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code2, Rocket, ArrowRight, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

const features = [
  {
    id: 'inspire',
    title: 'Inspire',
    subtitle: 'Ignite the Spark',
    description: 'Through world-class speaker sessions, fire-side chats with unicorn founders, and immersive workshops, we plant the seeds of innovation.',
    icon: Sparkles,
    color: 'text-amber-500',
    bgGradient: 'from-amber-500/20 to-orange-500/5',
    borderHighlight: 'group-hover:border-amber-500/50',
    visual: 'orb'
  },
  {
    id: 'build',
    title: 'Build',
    subtitle: 'Forge the Future',
    description: 'Access our incubation labs, mentorship network, and technical resources. We help you turn back-of-the-napkin sketches into MVP prototypes.',
    icon: Code2,
    color: 'text-cyan-500',
    bgGradient: 'from-cyan-500/20 to-blue-500/5',
    borderHighlight: 'group-hover:border-cyan-500/50',
    visual: 'code'
  },
  {
    id: 'launch',
    title: 'Launch',
    subtitle: 'Scale to Infinity',
    description: 'Pitch to top-tier VCs, secure seed funding, and get your startup off the ground. We provide the launchpad for your journey to the stars.',
    icon: Rocket,
    color: 'text-violet-500',
    bgGradient: 'from-violet-500/20 to-purple-500/5',
    borderHighlight: 'group-hover:border-violet-500/50',
    visual: 'chart'
  }
];

export const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>('build');

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white font-display mb-6 tracking-tight">
                The Journey
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light">
                We don't just talk about entrepreneurship. We provide the structured pathway to take you from zero to one.
            </p>
        </div>

        {/* Interactive Accordion Container */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px] w-full">
          {features.map((feature) => {
            const isActive = activeFeature === feature.id;
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.id}
                onHoverStart={() => setActiveFeature(feature.id)}
                onClick={() => setActiveFeature(feature.id)}
                layout
                className={cn(
                  "relative rounded-[2rem] overflow-hidden border cursor-pointer transition-colors duration-500 ease-in-out group",
                  "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800",
                  feature.borderHighlight,
                  isActive ? "lg:flex-[3]" : "lg:flex-1"
                )}
              >
                {/* Background Gradients */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700",
                    feature.bgGradient,
                    isActive ? "opacity-100" : "group-hover:opacity-30"
                  )} 
                />
                
                {/* Content Container */}
                <div className="relative h-full flex flex-col p-8 z-10">
                  
                  {/* Header (Icon + Title) */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors duration-300",
                      "bg-white dark:bg-white/5 border-neutral-200 dark:border-white/10",
                      isActive ? feature.color : "text-neutral-400"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Mobile Title (Always visible on mobile, hidden on desktop unless active) */}
                    <div className="lg:hidden block">
                       <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{feature.title}</h3>
                    </div>

                    <motion.div 
                       className="hidden lg:block"
                       animate={{ opacity: isActive ? 1 : 0, rotate: isActive ? 0 : -45 }}
                    >
                       <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/10 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-neutral-900 dark:text-white" />
                       </div>
                    </motion.div>
                  </div>

                  {/* Main Content Body */}
                  <div className="flex-1 flex flex-col justify-between">
                     
                     {/* Visual Area */}
                     <div className="flex-1 flex items-center justify-center min-h-[200px] lg:min-h-0">
                        <AnimatePresence mode="wait">
                           {isActive ? (
                             <motion.div
                               key="active-visual"
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 0.8 }}
                               transition={{ duration: 0.5 }}
                               className="w-full h-full flex items-center justify-center"
                             >
                                {feature.visual === 'orb' && (
                                  <div className="relative">
                                     <div className="w-40 h-40 bg-amber-500 rounded-full blur-[80px] opacity-50 animate-pulse"></div>
                                     <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-orange-600 rounded-full opacity-80 blur-xl animate-spin-slow"></div>
                                     <div className="absolute inset-4 bg-white rounded-full blur-md mix-blend-overlay"></div>
                                  </div>
                                )}

                                {feature.visual === 'code' && (
                                  <div className="w-full max-w-md bg-neutral-900 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden font-mono text-xs">
                                     <div className="h-8 bg-neutral-800 flex items-center px-3 space-x-2 border-b border-neutral-700">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <div className="ml-2 text-neutral-500">builder.ts</div>
                                     </div>
                                     <div className="p-4 text-cyan-300 space-y-2 opacity-90">
                                        <p><span className="text-purple-400">import</span> {'{ Future }'} <span className="text-purple-400">from</span> <span className="text-green-300">'@edc/nexus'</span>;</p>
                                        <p>&nbsp;</p>
                                        <p><span className="text-purple-400">const</span> <span className="text-yellow-300">initStartup</span> = <span className="text-blue-300">async</span> () ={'>'} {'{'}</p>
                                        <p className="pl-4"><span className="text-neutral-500">// Turning ideas into reality</span></p>
                                        <p className="pl-4"><span className="text-purple-400">await</span> <span className="text-blue-300">buildMVP</span>();</p>
                                        <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-green-300">"Success"</span>;</p>
                                        <p>{'}'}</p>
                                     </div>
                                  </div>
                                )}

                                {feature.visual === 'chart' && (
                                  <div className="relative w-full max-w-xs h-64 flex items-end justify-between px-4 pb-4 border-b border-l border-neutral-300 dark:border-neutral-700/50">
                                     {[30, 50, 45, 70, 90].map((h, i) => (
                                        <motion.div
                                          key={i}
                                          initial={{ height: 0 }}
                                          animate={{ height: `${h}%` }}
                                          transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
                                          className="w-12 bg-gradient-to-t from-violet-600 to-indigo-400 rounded-t-md relative group/bar"
                                        >
                                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                              {h}k
                                           </div>
                                        </motion.div>
                                     ))}
                                     
                                     {/* Rocket */}
                                     <motion.div 
                                        animate={{ x: [0, 200], y: [0, -200], opacity: [0, 1, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                                        className="absolute bottom-0 left-0 text-white pointer-events-none"
                                     >
                                        <Rocket className="w-8 h-8 text-indigo-400 fill-indigo-500/20" />
                                     </motion.div>
                                  </div>
                                )}
                             </motion.div>
                           ) : (
                             <div className="hidden lg:flex flex-col items-center justify-center h-full opacity-20">
                                <Icon className="w-24 h-24 text-neutral-400 dark:text-neutral-600" />
                             </div>
                           )}
                        </AnimatePresence>
                     </div>

                     {/* Text Content */}
                     <div className="mt-8">
                        <h3 className={cn(
                          "font-display font-bold text-neutral-900 dark:text-white mb-2 transition-all duration-300",
                          isActive ? "text-4xl md:text-5xl" : "text-2xl lg:hidden"
                        )}>
                          {isActive ? feature.title : ''}
                        </h3>
                        <div className={cn(
                          "overflow-hidden transition-all duration-500",
                          isActive ? "max-h-48 opacity-100" : "max-h-0 opacity-0 lg:max-h-0"
                        )}>
                           <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">{feature.subtitle}</p>
                           <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                             {feature.description}
                           </p>
                        </div>

                        {/* Collapsed Vertical Title for Desktop */}
                        {!isActive && (
                           <div className="hidden lg:block absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                              <span className="text-3xl font-bold text-neutral-400 dark:text-neutral-600 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
                                {feature.title}
                              </span>
                           </div>
                        )}
                     </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
