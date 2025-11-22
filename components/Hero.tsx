import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TypingText } from './ui/TypingText';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  const scrollToClubs = () => {
    const element = document.getElementById('club-showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-[85dvh] w-full flex flex-col items-center justify-center pt-24 pb-10 overflow-hidden"
    >
      {/* Background Elements - Minimal Grid Only */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
         
         {/* Bold Headline */}
         <div className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-neutral-900 dark:text-white mb-4 leading-[0.9] font-display">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              FORGE THE
            </motion.div>
            <motion.div 
              style={{ y }}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.4, 
                delay: 0.2, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-500"
            >
               FUTURE.
            </motion.div>
         </div>

         {/* Subheadline with Typing Animation */}
         <div className="h-16 md:h-12 mb-8 flex items-center justify-center">
            <TypingText
              text={[
                "The premier hub for student innovation.",
                "Join a community of builders, dreamers, and disruptors.",
                "Turn your ideas into reality.",
                "Connect, Collaborate, Create."
              ]}
              typingSpeed={50}
              deletingSpeed={30}
              pauseDuration={2000}
              className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed"
              cursorCharacter="|"
            />
         </div>

         {/* Single Primary CTA */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="flex flex-col sm:flex-row items-center justify-center"
         >
            <button 
               onClick={scrollToClubs}
               className="group relative px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-neutral-900/20 dark:shadow-white/10 w-full sm:w-auto overflow-hidden"
            >
               <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Ecosystem <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 dark:from-neutral-200 dark:to-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
         </motion.div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50 dark:from-black to-transparent pointer-events-none" />
    </section>
  );
};