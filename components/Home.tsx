import React from 'react';
import { Hero } from './Hero';
import { ClubShowcase } from './ClubShowcase';
import { Features } from './Features';
import { Club } from '../types';
import { VelocityScroll } from './ui/VelocityScroll';
import { motion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface HomeProps {
  clubs: Club[];
  onNavigate: (page: string) => void;
}

const ShootingStar = ({ delay, top, left }: { delay: number; top: string; left: string }) => (
  <motion.div
    initial={{ x: -100, y: -100, opacity: 0, scale: 0.5 }}
    animate={{ x: 400, y: 400, opacity: [0, 1, 0], scale: 1 }}
    transition={{ 
      duration: 1.5, 
      delay, 
      repeat: Infinity, 
      repeatDelay: Math.random() * 5 + 3,
      ease: "linear"
    }}
    style={{ top, left }}
    className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent rotate-45 pointer-events-none z-0 will-change-transform"
  />
);

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealSection: React.FC<RevealSectionProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={cn("w-full will-change-transform", className)}
  >
    {children}
  </motion.div>
);

export const Home: React.FC<HomeProps> = ({ clubs, onNavigate }) => {
  return (
    <div className="relative text-neutral-900 dark:text-white w-full flex flex-col">
      
      {/* --- GLOBAL BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
          {/* Base Background Color - Adapts to Theme */}
          <div className="absolute inset-0 bg-neutral-50 dark:bg-black transition-colors duration-700" />

          {/* Animated Gradient Blobs */}
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-rose-200/40 dark:bg-purple-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob opacity-70" />
          <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-200/40 dark:bg-indigo-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000 opacity-70" />
          <div className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] bg-amber-100/50 dark:bg-cyan-900/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000 opacity-70" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-100/40 dark:bg-teal-900/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-6000 opacity-70" />
      </div>

      {/* Noise Overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04] dark:opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] will-change-transform translate-z-0"></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col">
        <RevealSection>
          <Hero />
        </RevealSection>
        
        <RevealSection delay={0.1}>
          <ClubShowcase clubs={clubs} onExplore={onNavigate} />
        </RevealSection>

        <RevealSection delay={0.1}>
          <Features />
        </RevealSection>
        
        <div className="relative z-10">
          <RevealSection>
            <VelocityScroll 
              text="MARKETING • FINANCE • STARTUP • CONSULTING •" 
              default_velocity={3}
              className="text-neutral-800/20 dark:text-white/20 hover:text-neutral-900 dark:hover:text-white/40 transition-colors duration-500"
            />
          </RevealSection>
          
          {/* --- Mission / Why Join Section --- */}
          <motion.section 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="pt-10 md:pt-16 pb-0 relative overflow-hidden border-t border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-sm bg-white/30 dark:bg-black/30"
          >
             
             {/* Background Visuals for Mission Section - Localized Intensity */}
             <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                <div className="absolute inset-0 overflow-hidden">
                    <ShootingStar delay={1} top="10%" left="20%" />
                    <ShootingStar delay={3} top="30%" left="60%" />
                    <ShootingStar delay={5} top="5%" left="80%" />
                    <ShootingStar delay={2} top="60%" left="10%" />
                </div>
             </div>

             <div className="container mx-auto px-6 relative z-10 mb-8">
               <div className="flex flex-col md:flex-row gap-10 items-start">
                  
                  {/* Left: Content */}
                  <div className="flex-1">
                     <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-xs mb-3 block"
                     >
                        Join The Revolution
                     </motion.span>
                     <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-5 font-display leading-tight"
                     >
                       Where Ideas Rise.<br />
                       Leaders Emerge.
                     </motion.h2>
                     <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-700 dark:text-neutral-300 mb-8 font-light leading-relaxed"
                     >
                       At the Entrepreneur Development Cell, we believe that every student carries a spark—an idea waiting to be ignited. We are the hub of innovation, creativity, and entrepreneurial energy on campus.
                     </motion.p>
                     
                     <div className="mb-6">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Why Join EDC?</h3>
                        <div className="grid grid-cols-1 gap-3">
                           {[
                             "Learn from founders, mentors, and industry experts",
                             "Participate in hackathons and startup challenges",
                             "Turn your ideas into real-world products",
                             "Meet passionate peers and future co-founders"
                           ].map((item, i) => (
                             <motion.div 
                               key={i}
                               initial={{ opacity: 0, x: -20 }}
                               whileInView={{ opacity: 1, x: 0 }}
                               viewport={{ once: true }}
                               transition={{ delay: i * 0.1 + 0.3 }}
                               className="flex items-center group cursor-default"
                             >
                                <div className="w-4 h-4 rounded-full bg-white/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mr-3 group-hover:border-emerald-500/50 transition-colors shadow-sm shrink-0">
                                   <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                                </div>
                                <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors font-medium text-sm">{item}</span>
                             </motion.div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Right: Mission Card */}
                  <div className="flex-1 w-full sticky top-32">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="p-8 md:p-10 rounded-[2rem] bg-white/40 dark:bg-neutral-900/40 border border-white/50 dark:border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-white/80 dark:hover:border-white/20 transition-colors duration-500 shadow-2xl"
                     >
                        <div className="absolute top-0 right-0 p-12 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                           <Star className="w-32 h-32 text-neutral-900 dark:text-white fill-current" />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                              <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Our Mission</span>
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-6 font-display leading-tight">
                            "To cultivate a dynamic entrepreneurial culture on campus by fostering innovation, leadership, and problem-solving skills."
                          </h3>
                          
                          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-neutral-200/30 dark:border-white/10">
                             <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                   <div key={i} className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900"></div>
                                ))}
                             </div>
                             <div className="text-xs text-neutral-600 dark:text-neutral-400">
                                <span className="font-bold text-neutral-900 dark:text-white">500+</span> Students Empowered
                             </div>
                          </div>
                        </div>
                     </motion.div>
                  </div>

               </div>
             </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};