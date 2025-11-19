import React from 'react';
import { Hero } from './Hero';
import { Club } from '../types';
import { ClubCard } from './ui/ClubCard';

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
              <ClubCard 
                key={club.id} 
                club={club} 
                index={index}
                onClick={() => onNavigate(club.id)} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};