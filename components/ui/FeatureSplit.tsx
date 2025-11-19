import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface FeatureSplitProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  alignment?: 'left' | 'right';
  colorAccent?: string;
}

export const FeatureSplit: React.FC<FeatureSplitProps> = ({ 
  title, 
  subtitle, 
  description, 
  features, 
  alignment = 'left',
  colorAccent = 'bg-blue-500'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={ref} className="min-h-[80vh] flex items-center py-20 relative overflow-hidden">
      <div className={`container mx-auto px-6 flex flex-col md:flex-row items-center gap-16 ${alignment === 'right' ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Text Content */}
        <div className="flex-1 z-10">
          <motion.div
            initial={{ opacity: 0, x: alignment === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={`w-16 h-1 ${colorAccent} mb-6`}></div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight font-display">
              {title}
            </h2>
            <p className="text-xl text-neutral-400 mb-8 font-light">
              {subtitle}
            </p>
            <p className="text-neutral-300 mb-8 leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-center text-neutral-200"
                >
                  <CheckCircle2 className={`w-5 h-5 mr-3 ${colorAccent.replace('bg-', 'text-')}`} />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Visual Content - Abstract Floating UI */}
        <div className="flex-1 w-full flex justify-center relative h-[400px] md:h-[600px]">
           <motion.div style={{ y, scale }} className="relative w-full max-w-md">
              {/* Main Card */}
              <div className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden">
                 {/* Header UI */}
                 <div className="h-12 border-b border-neutral-800 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                 </div>
                 {/* Body UI */}
                 <div className="p-6 space-y-4">
                    <div className="w-3/4 h-8 bg-neutral-800 rounded animate-pulse"></div>
                    <div className="space-y-2">
                       <div className="w-full h-4 bg-neutral-800/50 rounded"></div>
                       <div className="w-full h-4 bg-neutral-800/50 rounded"></div>
                       <div className="w-5/6 h-4 bg-neutral-800/50 rounded"></div>
                    </div>
                    {/* Chart Area */}
                    <div className="mt-8 h-32 flex items-end justify-between space-x-2">
                       {[40, 70, 45, 90, 65, 85].map((h, i) => (
                          <div key={i} className={`w-full bg-neutral-800 rounded-t hover:${colorAccent} transition-colors duration-300`} style={{ height: `${h}%` }}></div>
                       ))}
                    </div>
                 </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -right-8 top-20 w-48 p-4 bg-neutral-800/90 backdrop-blur rounded-xl border border-neutral-700 shadow-xl"
              >
                 <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full ${colorAccent} flex items-center justify-center text-white font-bold text-xs`}>%</div>
                    <div className="text-sm font-bold text-white">Growth</div>
                 </div>
                 <div className="w-full bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${colorAccent} w-[85%]`}></div>
                 </div>
              </motion.div>

              <motion.div 
                 animate={{ y: [0, 20, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute -left-12 bottom-32 w-40 p-4 bg-neutral-800/90 backdrop-blur rounded-xl border border-neutral-700 shadow-xl"
              >
                 <div className="text-xs text-neutral-400 mb-1">Active Members</div>
                 <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-neutral-600 border-2 border-neutral-800"></div>
                    ))}
                 </div>
              </motion.div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};