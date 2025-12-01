import React from 'react';
import { motion } from 'framer-motion';
import { NewsItem } from '../../types';
import { Megaphone, Trophy, Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NewsFeedProps {
  news: NewsItem[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Announcement': return Megaphone;
    case 'Achievement': return Trophy;
    case 'Opportunity': return Lightbulb;
    default: return Megaphone;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Announcement': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    case 'Achievement': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    case 'Opportunity': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    default: return 'text-neutral-500 bg-neutral-500/10 border-neutral-500/20';
  }
};

export const NewsFeed: React.FC<NewsFeedProps> = ({ news }) => {
  return (
    <section className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-black font-display text-neutral-900 dark:text-white mb-4"
                >
                    LATEST UPDATES
                </motion.h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-lg">
                    Stay connected with the latest breakthroughs, campus news, and upcoming opportunities across the network.
                </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                View Archive <ArrowRight className="w-4 h-4" />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, idx) => {
                const Icon = getCategoryIcon(item.category);
                const colorClass = getCategoryColor(item.category);

                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative p-8 rounded-[2rem] bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-xl"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("p-3 rounded-xl border", colorClass)}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{item.date}</span>
                        </div>
                        
                        <div className="mb-4">
                            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3 inline-block", colorClass)}>
                                {item.category}
                            </span>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                {item.title}
                            </h3>
                        </div>

                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                            {item.summary}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
                             <span className="text-xs font-bold text-neutral-500">{item.author}</span>
                             <button className="p-2 rounded-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 shadow-sm">
                                 <ArrowRight className="w-4 h-4" />
                             </button>
                        </div>
                    </motion.div>
                );
            })}
        </div>
        
        <div className="mt-8 md:hidden text-center">
             <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                View Archive <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </div>
    </section>
  );
};
