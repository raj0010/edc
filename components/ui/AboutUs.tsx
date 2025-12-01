import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Building, GraduationCap, ArrowRight } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Student Governed",
    description: "Operated entirely by the Student Council of the School of Management. We believe in learning by doing.",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Multi-Campus",
    description: "Active chapters in Delhi, Mumbai, Bangalore, Pune, and Hyderabad. One ID card, access to all hubs.",
    icon: Building,
    color: "bg-emerald-500"
  },
  {
    id: 3,
    title: "Academic Credit",
    description: "Active participation in EDC clubs translates to extra-curricular credits recognized by the university.",
    icon: GraduationCap,
    color: "bg-amber-500"
  },
  {
    id: 4,
    title: "Incubation",
    description: "Direct access to the University's seed fund and alumni investor network for promising startups.",
    icon: Zap,
    color: "bg-purple-500"
  }
];

export const AboutUs: React.FC = () => {
  return (
    <section className="relative py-32 bg-white dark:bg-[#0F0F0F] overflow-hidden transition-colors duration-300">
       <div className="container mx-auto px-6 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
             
             {/* Text Content - Golden Ratio ~38% */}
             <div className="lg:w-[38%] sticky top-32">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                >
                    <div className="h-px w-8 bg-neutral-900 dark:bg-white"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">About Us</span>
                </motion.div>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black font-display text-neutral-900 dark:text-white tracking-tighter leading-[0.95] mb-8"
                >
                   THE HUB OF <br/>
                   <span className="text-neutral-400">INNOVATION.</span>
                </motion.h2>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8 font-light">
                    The Entrepreneur Development Cell (EDC) is the flagship student body of the University School of Management. We bridge the gap between academic theory and real-world business execution.
                </p>

                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-neutral-900 dark:border-white pb-1 hover:gap-4 transition-all text-neutral-900 dark:text-white">
                    Read University Manifesto <ArrowRight className="w-3 h-3" />
                </button>
             </div>

             {/* Features Grid - Golden Ratio ~62% */}
             <div className="lg:w-[62%] grid grid-cols-1 md:grid-cols-2 gap-4">
                 {features.map((feature, idx) => (
                     <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-8 rounded-[2rem] bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group"
                     >
                         <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                             <feature.icon className="w-5 h-5" />
                         </div>
                         <h3 className="text-xl font-bold font-display text-neutral-900 dark:text-white mb-3">{feature.title}</h3>
                         <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{feature.description}</p>
                     </motion.div>
                 ))}
             </div>
          </div>

       </div>
    </section>
  );
};