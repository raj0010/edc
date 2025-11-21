import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

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
          className="mb-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-sm font-medium text-neutral-600 dark:text-neutral-300 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="uppercase tracking-wider text-xs font-bold">Applications Open Fall 2024</span>
        </motion.div>

        {/* Main Heading */}
        <div className="relative mb-8 flex flex-col items-center">
           
           {/* Line 1: Animated Letter Spacing */}
           <motion.h2 
             initial={{ opacity: 0, letterSpacing: "0em" }}
             animate={{ opacity: 1, letterSpacing: "0.3em" }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="text-xl md:text-2xl font-bold text-neutral-500 dark:text-neutral-400 uppercase mb-4 md:mb-6"
           >
             Forge The
           </motion.h2>

           {/* Line 2: Massive Staggered Reveal */}
           <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter font-display leading-[0.85] overflow-hidden py-4">
             <div className="flex justify-center overflow-hidden">
               {"FUTURE.".split("").map((char, i) => (
                 <motion.span
                   key={i}
                   initial={{ y: "150%" }}
                   animate={{ y: 0 }}
                   transition={{ 
                     duration: 1.8, 
                     delay: 0.2 + i * 0.15, 
                     ease: [0.19, 1, 0.22, 1] 
                   }}
                   className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-600"
                 >
                   {char}
                 </motion.span>
               ))}
             </div>
           </h1>
           
           {/* Decorative Loading Circle */}
           <motion.div 
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
             className="absolute -top-10 -right-8 md:right-10 w-24 h-24 hidden lg:flex items-center justify-center opacity-50"
           >
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="fill-neutral-400 text-[10px] font-bold uppercase tracking-widest">
                  <textPath href="#circlePath">
                     • Innovation • Disruption • Scale • Growth
                  </textPath>
                </text>
              </svg>
           </motion.div>
        </div>

        {/* Tagline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-xl md:text-2xl font-medium text-neutral-800 dark:text-neutral-200 mb-6 font-display"
        >
          Where Ideas Rise. Leaders Emerge. Startups Begin.
        </motion.h3>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="max-w-2xl text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 font-light"
        >
          At the Entrepreneur Development Cell, we believe that every student carries a spark. 
          We are the hub of innovation, creativity, and entrepreneurial energy on campus, 
          committed to empowering thinkers, dreamers, and future founders.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
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
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-600"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-neutral-400 dark:via-neutral-600 to-transparent"></div>
      </motion.div>
    </section>
  );
};