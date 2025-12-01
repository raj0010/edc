import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FeatureItem } from '../types';
import { getIcon } from '../lib/iconMap';
import { cn } from '../lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturesProps {
  features: FeatureItem[];
}

// Strictly using Golden Ratio (approx 62% for Visual, 38% for Text)
const TEXT_WIDTH_PERCENT = 38;
const VISUAL_WIDTH_PERCENT = 62;

interface FeatureCardProps { 
  feature: FeatureItem; 
  i: number; 
  total: number; 
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, i, total }) => {
  const Icon = getIcon(feature.icon);
  
  return (
     <div className="h-screen flex items-center justify-center p-6 md:p-12 sticky top-0">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24 h-full">
            
            {/* Text Side - 38% */}
            <div className={`w-full md:w-[${TEXT_WIDTH_PERCENT}%] flex flex-col justify-center`}>
                <motion.div 
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className="flex items-center gap-4 mb-6"
                >
                    <span className="text-6xl md:text-8xl font-black font-display text-neutral-200 dark:text-neutral-800 select-none">
                        0{i + 1}
                    </span>
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800", feature.color)}>
                        <Icon className="w-6 h-6" />
                    </div>
                </motion.div>

                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-3xl md:text-5xl font-black font-display text-neutral-900 dark:text-white mb-6 leading-tight"
                >
                    {feature.title}
                    <span className="block text-xl md:text-2xl font-light text-neutral-500 mt-2">{feature.subtitle}</span>
                </motion.h3>

                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8"
                >
                    {feature.description}
                </motion.p>
                
                <motion.button 
                    whileHover={{ x: 10 }}
                    className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-neutral-900 dark:text-white"
                >
                    Explore Program <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>

            {/* Visual Side - 62% */}
            <div className={`hidden md:flex md:w-[${VISUAL_WIDTH_PERCENT}%] h-[60vh] rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative`}>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                
                {/* Visual Content based on feature type */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                     {feature.visual === 'orb' && (
                         <div className="relative w-64 h-64">
                             <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full animate-pulse"></div>
                             <div className="relative z-10 w-full h-full border border-neutral-300 dark:border-neutral-700 rounded-full flex items-center justify-center">
                                 <Sparkles className="w-16 h-16 text-amber-500" />
                             </div>
                             {/* Orbiting text */}
                             <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                             >
                                 <div className="absolute -top-3 left-1/2 w-6 h-6 bg-neutral-900 dark:bg-white rounded-full"></div>
                             </motion.div>
                         </div>
                     )}

                     {feature.visual === 'code' && (
                         <div className="w-full h-full bg-[#1e1e1e] rounded-xl p-6 shadow-2xl overflow-hidden font-mono text-xs">
                             <div className="flex gap-2 mb-4">
                                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                             </div>
                             <div className="text-blue-400">import</div> <div className="text-white inline">Future</div> <div className="text-blue-400 inline">from</div> <div className="text-orange-300 inline">'@edc/core'</div>;
                             <br/><br/>
                             <div className="text-purple-400">class</div> <div className="text-yellow-300 inline">Innovation</div> <div className="text-white inline">{`{`}</div>
                             <br/>
                             &nbsp;&nbsp;<div className="text-blue-400 inline">constructor</div>() {`{`}
                             <br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-white inline">this.ideas</div> = [];
                             <br/>
                             &nbsp;&nbsp;{`}`}
                             <br/><br/>
                             &nbsp;&nbsp;<div className="text-yellow-300 inline">launch</div>() {`{`}
                             <br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-green-400 inline">// To the moon 🚀</div>
                             <br/>
                             &nbsp;&nbsp;&nbsp;&nbsp;<div className="text-white inline">return</div> <div className="text-orange-300 inline">"Unicorn"</div>;
                             <br/>
                             &nbsp;&nbsp;{`}`}
                             <br/>
                             {`}`}
                         </div>
                     )}

                     {feature.visual === 'chart' && (
                         <div className="w-full flex items-end justify-between h-64 px-8 pb-8 gap-4">
                             {[40, 65, 50, 80, 60, 95].map((h, idx) => (
                                 <motion.div 
                                    key={idx}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: idx * 0.1 }}
                                    className="flex-1 bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-lg opacity-80"
                                 />
                             ))}
                         </div>
                     )}
                </div>
            </div>

        </div>
     </div>
  );
};

export const Features: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <div className="relative bg-neutral-50 dark:bg-[#050505] -mt-10 md:-mt-20 z-0">
        {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} i={i} total={features.length} />
        ))}
    </div>
  );
};
