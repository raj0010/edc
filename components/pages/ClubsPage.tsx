import React from 'react';
import { PageHeader } from '../ui/PageHeader';
import { ClubShowcase } from '../ClubShowcase';
import { Club } from '../../types';

export const ClubsPage = ({ clubs, onNavigate }: { clubs: Club[], onNavigate: (id: string) => void }) => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0F0F0F]">
      <PageHeader title="Our Clubs" subtitle="Explore the 4 pillars of our innovation ecosystem." />
      <div className="py-12">
        <ClubShowcase clubs={clubs} onExplore={onNavigate} />
      </div>
    </div>
  );
};