import React from 'react';
import { Hero } from './Hero';
import { Club } from '../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeProps {
  clubs: Club[];
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ clubs, onNavigate }) => {
  return (
    <div className="min-h-screen bg-black">
      <Hero clubs={clubs} onExplore={onNavigate} />
      
      {/* Brief Descriptions Section */}
      <section className="py-24 bg-neutral-950 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-display mb-4">Our Domains</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Explore the four pillars that define the Entrepreneur Development Cell. Click on any card to dive deeper.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubs.map((club, index) => (
              <motion.div 
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => onNavigate(club.id)}
                className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all cursor-pointer flex flex-col h-full"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${club.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <club.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{club.name}</h3>
                <p className="text-sm text-neutral-400 mb-6 flex-grow leading-relaxed">
                  {club.description}
                </p>
                <div className="flex items-center text-sm font-medium text-white mt-auto">
                  Explore Page <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};