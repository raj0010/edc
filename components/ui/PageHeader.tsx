import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <div className="pt-32 pb-12 px-6 container mx-auto text-center md:text-left relative z-10">
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
    >
        <h1 className="text-4xl md:text-6xl font-black font-display text-neutral-900 dark:text-white mb-4 uppercase tracking-tighter">
            {title}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            {subtitle}
        </p>
    </motion.div>
  </div>
);