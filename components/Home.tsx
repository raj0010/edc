import React from 'react';
import { Hero } from './Hero';
import { Club } from '../types';
import { VelocityScroll } from './ui/VelocityScroll';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface HomeProps {
  clubs: Club[];
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ clubs, onNavigate }) => {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Hero clubs={clubs} onExplore={onNavigate} />
      
      <div className="relative z-10 bg-black">
        <VelocityScroll 
          text="MARKETING • FINANCE • STARTUP • CONSULTING •" 
          default_velocity={3}
          className="text-neutral-800 hover:text-white transition-colors duration-500"
        />
        
        {/* --- Mission / Why Join Section --- */}
        <section className="py-24 md:py-32 bg-black border-t border-neutral-900 relative overflow-hidden">
           {/* Decor */}
           <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-neutral-900/20 rounded-full blur-[128px] pointer-events-none"></div>

           <div className="container mx-auto px-6">
             <div className="flex flex-col md:flex-row gap-16 items-start">
                
                {/* Left: Content */}
                <div className="flex-1">
                   <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4 block">Why Join EDC?</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-display leading-tight">
                     Cultivate your skills.<br />
                     <span className="text-neutral-500">Disrupt the status quo.</span>
                   </h2>
                   <p className="text-xl text-neutral-400 mb-12 font-light leading-relaxed">
                     Join a community where ambition meets opportunity. From validating your first startup idea to mastering complex financial models, EDC provides the ecosystem you need to thrive.
                   </p>
                   
                   <div className="grid grid-cols-1 gap-6">
                      {[
                        "Learn from founders, mentors, and industry experts",
                        "Participate in hackathons and pitchfests",
                        "Turn ideas into real-world products",
                        "Get exclusive access to funding opportunities",
                        "Meet passionate peers and co-founders"
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center group"
                        >
                           <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mr-4 group-hover:border-emerald-500/50 transition-colors">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                           </div>
                           <span className="text-neutral-300 group-hover:text-white transition-colors">{item}</span>
                        </motion.div>
                      ))}
                   </div>
                </div>

                {/* Right: Visual Quote */}
                <div className="flex-1 w-full sticky top-32">
                   <div className="p-12 rounded-[2.5rem] bg-neutral-900/50 border border-neutral-800 backdrop-blur relative overflow-hidden group hover:border-neutral-700 transition-colors duration-500">
                      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                         <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.017C7.91243 16 7.017 16.8954 7.017 18V21H14.017ZM19.017 10V21H21.017V10L19.017 10ZM3.017 10V21H5.017V10L3.017 10ZM2.017 10H22.017V8C22.017 4.68629 19.3307 2 16.017 2H8.017C4.70329 2 2.017 4.68629 2.017 8V10Z" />
                         </svg>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                        "Let’s build, innovate, and disrupt — together."
                      </h3>
                      <div className="w-16 h-1 bg-emerald-500 mb-6"></div>
                      <p className="text-neutral-400">
                        Whether you're an aspiring entrepreneur or a curious innovator, EDC is your launchpad.
                      </p>
                   </div>
                </div>

             </div>
           </div>
        </section>
      </div>
    </div>
  );
};