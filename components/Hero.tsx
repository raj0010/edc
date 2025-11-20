import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TypewriterEffect } from './ui/TypewriterEffect';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToClubs = () => {
    const element = document.getElementById('club-showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Spotlight / Aurora Effect */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-500/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      {/* --- Content --- */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-sm font-medium text-neutral-600 dark:text-neutral-300 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="uppercase tracking-wider text-xs font-bold">Applications Open Fall 2024</span>
        </motion.div>

        {/* Main Heading */}
        <div className="relative mb-8 flex flex-col items-center leading-[0.9]">
           <div className="text-6xl md:text-9xl font-black tracking-tighter text-neutral-900 dark:text-white font-display">
             <TypewriterEffect 
                words={[
                  { text: "FORGE" },
                  { text: "THE" }
                ]}
                className="inline-block"
                cursorClassName="hidden" // Hide cursor for first line
                delay={0.5}
                showCursor={false}
             />
           </div>
           
           <div className="text-6xl md:text-9xl font-black tracking-tighter font-display -mt-2 md:-mt-4">
              <TypewriterEffect 
                  words={[
                    { 
                      text: "FUTURE.", 
                      className: "text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 pb-4" 
                    }
                  ]}
                  className="inline-block"
                  cursorClassName="bg-neutral-900 dark:bg-white h-12 md:h-24 lg:h-32"
                  delay={1.5} // Starts after "FORGE THE" (approx 9 chars * 0.1s + base delay)
                  showCursor={true}
               />
           </div>
           
           {/* Decorative Elements near text */}
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 2.5, type: "spring" }}
             className="absolute -top-8 -right-8 md:right-0 w-16 h-16 hidden md:flex items-center justify-center"
           >
              <div className="w-full h-full border border-dashed border-neutral-300 dark:border-neutral-700 rounded-full animate-spin-slow"></div>
           </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 font-light"
        >
          EDC Nexus is the premier incubation ecosystem where students transform audacious ideas into scalable ventures. 
          <span className="hidden md:inline"> Join a community of disruptors, creators, and leaders.</span>
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.0 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button 
            onClick={scrollToClubs}
            className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-neutral-500/20"
          >
            Explore Ecosystem <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-600"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-neutral-400 dark:via-neutral-600 to-transparent"></div>
      </motion.div>
    </section>
  );
};
