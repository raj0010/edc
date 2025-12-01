import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onJoin: () => void;
}

export const CallToAction: React.FC<CTAProps> = ({ onJoin }) => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative bg-neutral-900 dark:bg-white rounded-[3rem] p-12 md:p-24 text-center overflow-hidden border border-neutral-800 dark:border-neutral-200 shadow-2xl">
          
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 opacity-30 dark:opacity-10">
             <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-screen blur-[100px] animate-blob"></div>
             <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen blur-[100px] animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-black/5 border border-white/10 dark:border-black/5 backdrop-blur-md mb-8"
            >
              <Sparkles className="w-4 h-4 text-amber-400 dark:text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-white dark:text-black">Open Applications 2024</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-black font-display text-white dark:text-black tracking-tighter mb-8 leading-[0.9]"
            >
              READY TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600">BUILD?</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-400 dark:text-neutral-600 max-w-2xl mb-12 leading-relaxed"
            >
              Join a network of 10,000+ students, creators, and founders. Your journey from idea to impact starts here.
            </motion.p>

            <motion.button
              onClick={onJoin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white dark:bg-black text-black dark:text-white rounded-full font-bold text-sm uppercase tracking-widest shadow-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};