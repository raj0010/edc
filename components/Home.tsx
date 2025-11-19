import React from 'react';
import { Hero } from './Hero';
import { Club } from '../types';

interface HomeProps {
  clubs: Club[];
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ clubs, onNavigate }) => {
  return (
    <div className="min-h-screen bg-black">
      <Hero clubs={clubs} onExplore={onNavigate} />
    </div>
  );
};