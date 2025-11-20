import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Hammer, Rocket } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-black relative z-10 border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
        <div className="container mx-auto px-4 flex flex-col items-center">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                {
                    icon: Sparkles,
                    title: "Inspire",
                    desc: "Sparking the flame of innovation through world-class mentorship and visionary talks.",
                    gradient: "from-yellow-400/20 to-orange-500/20",
                    border: "hover:border-yellow-500/50"
                },
                {
                    icon: Hammer,
                    title: "Build",
                    desc: "Transforming raw concepts into tangible prototypes with our state-of-the-art incubation labs.",
                    gradient: "from-blue-400/20 to-indigo-500/20",
                    border: "hover:border-blue-500/50"
                },
                {
                    icon: Rocket,
                    title: "Launch",
                    desc: "Propelling startups to market success with seed funding networks and strategic partnerships.",
                    gradient: "from-pink-400/20 to-red-500/20",
                    border: "hover:border-pink-500/50"
                }
                ].map((item, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className={`group relative p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/40 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 ${item.border} transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-sm hover:shadow-md dark:shadow-none`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center mb-6 text-neutral-900 dark:text-white group-hover:scale-110 transition-transform duration-500 shadow-sm dark:shadow-none">
                        <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 font-display tracking-wide transition-colors">{item.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">{item.desc}</p>
                    </div>
                </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};