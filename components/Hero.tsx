import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Club } from '../types';
import { ClubCard } from './ui/ClubCard';
import { Sparkles, Hammer, Rocket, ChevronDown } from 'lucide-react';

interface HeroProps {
  clubs: Club[];
  onExplore: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ clubs, onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const SplitText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
    return (
      <motion.span
        className={className}
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: delay,
              staggerChildren: 0.05,
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, index) => (
          <motion.span 
            key={index} 
            variants={letterVariants} 
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-start pt-24 md:pt-32 pb-0 overflow-hidden bg-black selection:bg-neutral-800 selection:text-white">
      
      {/* --- Background Atmosphere --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a1a1a_0%,_#000000_100%)] -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        
        {/* --- Text Content --- */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="text-center mb-8 md:mb-16 max-w-5xl"
        >
          {/* Badge */}
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-white uppercase bg-neutral-900/80 rounded-full border border-neutral-800 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Welcome to EDC
          </motion.span>
          
          {/* H1 Headline with Typewriter Animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8 font-display leading-[0.95]">
            <div className="block">
               <SplitText delay={0.2} text="Where Ideas Rise." />
            </div>
            <div className="block">
               <SplitText className="text-neutral-500" delay={1.2} text="Leaders Emerge." />
            </div>
            <div className="block">
               <SplitText className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-400" delay={2.2} text="Startups Begin." />
            </div>
          </h1>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            At the <strong className="text-white font-medium">Entrepreneur Development Cell</strong>, we believe that every student carries a spark. 
            We are the campus hub for innovation, empowering thinkers, dreamers, and future founders to build the extraordinary.
          </motion.p>
        </motion.div>

        {/* --- Card Fan Visual (The Launchpad) --- */}
        <div className="hidden md:flex relative w-full max-w-5xl mx-auto h-[420px] justify-center items-center mt-4 perspective-[2000px]">
          {clubs.map((club, index) => {
            const total = clubs.length;
            const midpoint = (total - 1) / 2;
            const spread = index - midpoint;
            const rotate = spread * 5; 
            const x = spread * 115; 
            const y = Math.abs(spread) * 20; 

            return (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 200, rotate: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  rotate: rotate, 
                  x: x, 
                  scale: 1,
                  y: [y, y - 15, y] // Floating animation
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.4 + (index * 0.1) },
                  y: { 
                    duration: 4 + index, // Varied duration for organic feel
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.2
                  },
                  default: { type: "spring", stiffness: 80, damping: 20 }
                }}
                style={{ 
                  zIndex: index,
                  transformOrigin: "bottom center"
                }}
                whileHover={{ 
                  zIndex: 50, 
                  scale: 1.15, 
                  rotate: 0, 
                  y: -50,
                  transition: { type: "spring", stiffness: 200, damping: 20 }
                }}
                className="absolute cursor-pointer"
              >
                <ClubCard club={club} onClick={() => onExplore(club.id)} />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Stack Layout */}
        <div className="md:hidden w-full flex flex-col items-center gap-6 pb-12">
           {clubs.map((club, index) => (
             <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
             >
               <ClubCard club={club} onClick={() => onExplore(club.id)} />
             </motion.div>
           ))}
        </div>

        {/* --- The 3 Pillars (Inspire, Build, Launch) --- */}
        <div className="w-full max-w-6xl mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-neutral-900 pt-16 bg-black z-10 relative">
            {[
              {
                icon: Sparkles,
                title: "Inspire",
                desc: "Through speaker sessions, workshops, and startup stories, we inspire students to think beyond boundaries and dare to build something new.",
                color: "text-yellow-400"
              },
              {
                icon: Hammer,
                title: "Build",
                desc: "EDC provides hands-on learning, mentorship, and resources that help students transform ideas into scalable, impactful ventures.",
                color: "text-blue-400"
              },
              {
                icon: Rocket,
                title: "Launch",
                desc: "From idea validation to pitching and incubation, we offer the right ecosystem to take your startup dreams from concept to reality.",
                color: "text-red-400"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.2) }}
                className="flex flex-col items-start p-6 rounded-2xl hover:bg-neutral-900/50 transition-colors duration-300 border border-transparent hover:border-neutral-800"
              >
                <div className={`p-3 rounded-xl bg-neutral-900 mb-6 ${item.color} border border-neutral-800`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-display uppercase tracking-wide">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-500 hidden md:block"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};