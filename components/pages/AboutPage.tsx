import React from 'react';
import { PageHeader } from '../ui/PageHeader';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Zap, Flag } from 'lucide-react';
import { cn } from '../../lib/utils';

// Values Data
const values = [
    { title: "Innovation", description: "We constantly challenge the status quo to find better solutions.", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Integrity", description: "Building trust through transparency and ethical leadership.", icon: Target, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Community", description: "We believe in the power of collective growth and mentorship.", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Resilience", description: "Failure is just a stepping stone to success.", icon: Zap, color: "text-purple-500", bg: "bg-purple-500/10" }
];

// Timeline Data
const timeline = [
    { year: "2014", title: "Inception", description: "Started as a small discussion group in the library basement with just 15 members." },
    { year: "2016", title: "First Seed Fund", description: "Launched the university's first student-run seed fund with a corpus of $50k." },
    { year: "2018", title: "Expansion", description: "Expanded operations to Mumbai and Bangalore campuses, unifying under 'EDC Nexus'." },
    { year: "2021", title: "Digital First", description: "Shifted to a hybrid model during the pandemic, launching the Virtual Incubation Portal." },
    { year: "2024", title: "Decade of Impact", description: "Celebrated 10 years with over 10,000 active members and 50+ successful startups incubated." }
];

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0F0F0F]">
      <PageHeader
        title="Our Story"
        subtitle="From a basement discussion group to a pan-India innovation ecosystem."
      />
      
      {/* Intro / Mission / Vision */}
      <div className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Mission */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2rem] relative overflow-hidden group"
            >
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                     <Target className="w-48 h-48 text-neutral-900 dark:text-white" />
                 </div>
                 <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4 block">Our Mission</span>
                    <h2 className="text-3xl font-black font-display text-neutral-900 dark:text-white mb-6">Empower & Enable</h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        To democratize access to entrepreneurial resources and education. We aim to equip every student with the mindset and tools required to build scalable solutions for real-world problems.
                    </p>
                 </div>
            </motion.div>

            {/* Vision */}
            <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="bg-neutral-900 dark:bg-white border border-neutral-800 dark:border-neutral-200 p-8 md:p-12 rounded-[2rem] relative overflow-hidden group"
            >
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                     <Flag className="w-48 h-48 text-white dark:text-black" />
                 </div>
                 <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-4 block">Our Vision</span>
                    <h2 className="text-3xl font-black font-display text-white dark:text-black mb-6">Global Impact</h2>
                    <p className="text-lg text-neutral-400 dark:text-neutral-600 leading-relaxed">
                        To become the world's leading student-run innovation hub, fostering a generation of ethical leaders who define the future of technology, business, and society.
                    </p>
                 </div>
            </motion.div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white dark:bg-neutral-900/50 py-24 border-y border-neutral-200 dark:border-neutral-800">
         <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-black font-display text-neutral-900 dark:text-white mb-6">Core Values</h2>
                <p className="text-neutral-600 dark:text-neutral-400">The guiding principles that define our culture and decision-making process.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((val, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                    >
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", val.bg, val.color)}>
                            <val.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{val.title}</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            {val.description}
                        </p>
                    </motion.div>
                ))}
            </div>
         </div>
      </div>

      {/* Timeline */}
      <div className="py-32 container mx-auto px-6">
         <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3 sticky top-32 h-fit">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Our Journey</span>
                <h2 className="text-4xl md:text-6xl font-black font-display text-neutral-900 dark:text-white mb-6 leading-[0.9]">
                    A DECADE OF <br /> EVOLUTION
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                    From humble beginnings to a powerhouse of innovation. Here is how we got here.
                </p>
                <button className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-xs uppercase tracking-wider">
                    Join the Legacy
                </button>
            </div>

            <div className="md:w-2/3 relative pl-8 md:pl-16 border-l border-neutral-200 dark:border-neutral-800">
                {timeline.map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="mb-16 relative"
                    >
                        {/* Dot */}
                        <div className="absolute -left-[41px] md:-left-[73px] top-2 w-5 h-5 rounded-full bg-white dark:bg-black border-4 border-neutral-900 dark:border-white z-10"></div>
                        
                        <div className="flex flex-col md:flex-row gap-4 md:items-baseline mb-2">
                             <span className="text-5xl font-black font-display text-neutral-200 dark:text-neutral-800">{item.year}</span>
                             <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                        </div>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
         </div>
      </div>

    </div>
  );
};