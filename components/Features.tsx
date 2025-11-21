import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, Code2 } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white font-display mb-6 tracking-tight">
                What We Do
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl font-light">
                We don't just talk about entrepreneurship. We provide the structured pathway to take you from zero to one.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* Card 1: Inspire (Tall Left) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:col-span-4 md:row-span-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group"
            >
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center mb-4 shadow-sm border border-neutral-200 dark:border-white/5">
                        <Sparkles className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="mt-auto">
                        <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 font-display">Inspire</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            Through speaker sessions, workshops, and startup stories, we inspire students to think beyond boundaries and dare to build something new.
                        </p>
                    </div>
                </div>
                
                {/* Abstract Visual */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-amber-500/20 dark:group-hover:bg-amber-500/10 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neutral-200/50 dark:from-black/50 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Card 2: Build (Wide Top Right) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-8 bg-neutral-900 dark:bg-black border border-neutral-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group"
            >
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    <div className="flex-1">
                        <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mb-6 border border-neutral-700">
                            <Code2 className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 font-display">Build</h3>
                        <p className="text-neutral-400 leading-relaxed mb-6">
                            EDC provides hands-on learning, mentorship, and resources that help students transform ideas into scalable, impactful ventures.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                             <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700">Mentorship</span>
                             <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700">Resources</span>
                             <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700">Hands-on Learning</span>
                        </div>
                    </div>
                    
                    {/* Visual: Fake Code/Terminal */}
                    <div className="flex-1 w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-xs text-neutral-400 shadow-2xl opacity-90 group-hover:opacity-100 transition-all md:translate-x-8 md:translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4">
                        <div className="flex gap-1.5 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-wrap"><span className="text-purple-400 mr-2">const</span> <span className="text-blue-400">venture</span> = <span className="text-green-400">new Startup()</span>;</div>
                            <div className="flex flex-wrap"><span className="text-blue-400">venture</span>.<span className="text-yellow-400">build</span>({'{'}</div>
                            <div className="pl-4"><span className="text-neutral-500">mvp:</span> <span className="text-orange-400">true</span>,</div>
                            <div className="pl-4"><span className="text-neutral-500">growth:</span> <span className="text-green-400">'exponential'</span></div>
                            <div>{'}'});</div>
                            <div className="flex mt-2"><span className="text-neutral-500">// Executing vision...</span></div>
                        </div>
                    </div>
                </div>
                
                {/* Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[100px] pointer-events-none"></div>
            </motion.div>

            {/* Card 3: Launch (Wide Bottom Right) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group text-white shadow-xl"
            >
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="flex-1">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
                            <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold mb-2 font-display">Launch</h3>
                        <p className="text-indigo-100 leading-relaxed max-w-md">
                            From idea validation to pitching and incubation, we offer the right ecosystem to take your startup dreams from concept to reality.
                        </p>
                     </div>
                     
                     {/* Visual: Stat Graph */}
                     <div className="relative w-full md:w-64 h-32 md:h-auto flex items-end justify-between gap-2">
                        {[30, 45, 35, 60, 50, 80, 95].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + (i * 0.1), duration: 1, type: "spring" }}
                                className="w-full bg-white/20 rounded-t-sm hover:bg-white/40 transition-colors"
                            ></motion.div>
                        ))}
                        {/* Rising Line overlay */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none">
                             <motion.path
                                d="M0 80 C 50 80, 50 60, 100 60 S 150 50, 200 20"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 1.5 }}
                             />
                        </svg>
                     </div>
                 </div>
                 
                 {/* Noise Texture */}
                 <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};