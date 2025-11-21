import React from 'react';
import { Hero } from './Hero';
import { ClubShowcase } from './ClubShowcase';
import { Features } from './Features';
import { Club } from '../types';
import { VelocityScroll } from './ui/VelocityScroll';
import { motion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';

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
    className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent rotate-45 pointer-events-none z-0"
  />
);

export const Home: React.FC<HomeProps> = ({ clubs, onNavigate }) => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black overflow-x-hidden relative">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04] dark:opacity-[0.06] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10">
        <Hero />
        
        <ClubShowcase clubs={clubs} onExplore={onNavigate} />

        <Features />
        
        <div className="relative z-10 bg-neutral-50 dark:bg-black">
          <VelocityScroll 
            text="MARKETING • FINANCE • STARTUP • CONSULTING •" 
            default_velocity={3}
            className="text-neutral-800/20 dark:text-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-700 transition-colors duration-500"
          />
          
          {/* --- Mission / Why Join Section --- */}
          <section className="py-24 md:py-32 relative overflow-hidden border-t border-neutral-200 dark:border-neutral-900">
             
             {/* Background Visuals for Mission Section */}
             <div className="absolute inset-0 bg-neutral-100/50 dark:bg-black">
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                
                {/* Gradient Orbs */}
                <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[128px] pointer-events-none"></div>
                <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[128px] pointer-events-none"></div>

                {/* Shooting Stars */}
                <div className="absolute inset-0 overflow-hidden">
                    <ShootingStar delay={1} top="10%" left="20%" />
                    <ShootingStar delay={3} top="30%" left="60%" />
                    <ShootingStar delay={5} top="5%" left="80%" />
                    <ShootingStar delay={2} top="60%" left="10%" />
                </div>
             </div>

             <div className="container mx-auto px-6 relative z-10">
               <div className="flex flex-col md:flex-row gap-16 items-start">
                  
                  {/* Left: Content */}
                  <div className="flex-1">
                     <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-emerald-600 dark:text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4 block"
                     >
                        Join The Revolution
                     </motion.span>
                     <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 font-display leading-tight"
                     >
                       Where Ideas Rise.<br />
                       Leaders Emerge.<br />
                       <span className="text-neutral-400 dark:text-neutral-600">Startups Begin.</span>
                     </motion.h2>
                     <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-12 font-light leading-relaxed"
                     >
                       At the Entrepreneur Development Cell, we believe that every student carries a spark—an idea waiting to be ignited. We are the hub of innovation, creativity, and entrepreneurial energy on campus, committed to empowering thinkers, dreamers, and future founders.
                     </motion.p>
                     
                     <div className="mb-8">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Why Join EDC?</h3>
                        <div className="grid grid-cols-1 gap-5">
                           {[
                             "Learn from founders, mentors, and industry experts",
                             "Participate in hackathons, startup challenges, and pitchfests",
                             "Turn your ideas into real-world products and ventures",
                             "Meet passionate peers, collaborators, and future co-founders",
                             "Get exclusive access to resources, incubation support, and funding opportunities"
                           ].map((item, i) => (
                             <motion.div 
                               key={i}
                               initial={{ opacity: 0, x: -20 }}
                               whileInView={{ opacity: 1, x: 0 }}
                               viewport={{ once: true }}
                               transition={{ delay: i * 0.1 + 0.3 }}
                               className="flex items-start group cursor-default"
                             >
                                <div className="w-6 h-6 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mr-4 mt-0.5 group-hover:border-emerald-500/50 transition-colors shadow-sm shrink-0">
                                   <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                </div>
                                <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors font-medium text-base">{item}</span>
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
                        className="p-10 md:p-12 rounded-[2.5rem] bg-white/60 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl relative overflow-hidden group hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-500 shadow-2xl"
                     >
                        {/* Quote Icon Background */}
                        <div className="absolute top-0 right-0 p-12 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                           <Star className="w-32 h-32 text-neutral-900 dark:text-white fill-current" />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-8">
                              <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                              <span className="text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Our Mission</span>
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-8 font-display leading-tight">
                            "To cultivate a dynamic entrepreneurial culture on campus by fostering innovation, leadership, and problem-solving skills—empowering students to become creators of change."
                          </h3>
                          
                          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-neutral-200/50 dark:border-neutral-700/50">
                             <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                   <div key={i} className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 border-2 border-white dark:border-neutral-900"></div>
                                ))}
                             </div>
                             <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                <span className="font-bold text-neutral-900 dark:text-white">500+</span> Students Empowered
                             </div>
                          </div>
                        </div>
                     </motion.div>
                  </div>

               </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};