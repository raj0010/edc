import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowUpRight, Zap, Target, Users } from 'lucide-react';

interface BentoItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

const BentoItem: React.FC<BentoItemProps> = ({ title, description, icon: Icon, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between group hover:border-neutral-600 transition-colors relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="text-neutral-400" />
      </div>
      <div className="mb-4">
        <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mb-4 group-hover:bg-neutral-700 transition-colors">
            <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
      </div>
      
      {/* Abstract visual decoration at bottom */}
      <div className="w-full h-12 bg-neutral-800/50 rounded-xl mt-4 overflow-hidden relative">
         <div className="absolute top-2 left-2 w-3/4 h-2 bg-neutral-700 rounded-full"></div>
         <div className="absolute top-6 left-2 w-1/2 h-2 bg-neutral-700 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] w-full max-w-6xl mx-auto p-4">
      {/* Large Main Block */}
      <BentoItem 
        title="Incubation Center" 
        description="We provide the soil for your ideas to grow. Access mentorship, resources, and funding opportunities directly through our network."
        icon={Zap}
        className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-neutral-900 to-neutral-900"
        delay={0.1}
      />
      
      {/* Side Blocks */}
      <BentoItem 
        title="Networking Events" 
        description="Connect with industry leaders and alumni."
        icon={Users}
        className="md:col-span-1 md:row-span-1"
        delay={0.2}
      />
      <BentoItem 
        title="Strategy Labs" 
        description="Workshops on market fit and scaling."
        icon={Target}
        className="md:col-span-1 md:row-span-1"
        delay={0.3}
      />
      
      {/* Bottom Wide Block */}
      <div className="md:col-span-2 md:row-span-1 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex items-center relative overflow-hidden group hover:border-neutral-600 transition-colors">
          <div className="z-10 relative">
            <h3 className="text-xl font-bold text-white mb-2">Portfolio Showcase</h3>
             <p className="text-sm text-neutral-400">Over 50+ startups incubated in the last 5 years.</p>
          </div>
          {/* Decorative Fanned Cards Mini */}
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 flex transform scale-75 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-24 h-32 bg-neutral-700 rounded-lg transform -rotate-12 border border-neutral-600"></div>
             <div className="w-24 h-32 bg-neutral-800 rounded-lg transform -rotate-6 -ml-16 border border-neutral-600"></div>
             <div className="w-24 h-32 bg-neutral-900 rounded-lg transform rotate-0 -ml-16 border border-neutral-600"></div>
          </div>
      </div>
    </div>
  );
};