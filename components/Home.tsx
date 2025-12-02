import React from 'react';
import { Hero } from './Hero';
import { ClubShowcase } from './ClubShowcase';
import { Club, FeatureItem, NewsItem } from '../types';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { LatestEvent } from './ui/LatestEvent';
import { NewsFeed } from './ui/NewsFeed';
import { Marquee } from './ui/Marquee';
import { CallToAction } from './ui/CallToAction';

interface HomeProps {
  clubs: Club[];
  features: FeatureItem[];
  news: NewsItem[];
  onNavigate: (page: string) => void;
  isLoading?: boolean;
}

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealSection: React.FC<RevealSectionProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={cn("w-full will-change-transform", className)}
  >
    {children}
  </motion.div>
);

export const Home: React.FC<HomeProps> = ({ clubs, features, news, onNavigate, isLoading }) => {
  // Determine featured content dynamically
  const featuredClub = clubs.find(c => c.id === 'startup') || clubs[0];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <RevealSection>
        <Hero />
      </RevealSection>
      
      {/* 1. Kinetic Marquee to break the fold */}
      <RevealSection delay={0.2}>
        <Marquee items={["Innovation", "Leadership", "Disruption", "Incubation", "Scale", "Impact"]} />
      </RevealSection>

      {/* 2. Latest Event - Needs Data */}
      {!isLoading && (
        <RevealSection delay={0.3}>
           <div className="py-8">
              <LatestEvent club={featuredClub} />
           </div>
        </RevealSection>
      )}
      
      {/* 3. Main Club Showcase (Handles internal skeletons) */}
      <RevealSection delay={0.1}>
        <div className="py-12 bg-neutral-50/50 dark:bg-[#0F0F0F]">
            <ClubShowcase clubs={clubs} onExplore={onNavigate} isLoading={isLoading} />
        </div>
      </RevealSection>

      {/* 4. News Feed - Content - Needs Data */}
      {!isLoading && (
          <NewsFeed news={news} />
      )}

      {/* 5. Strong Final CTA - Static Content, Render Immediately */}
      <CallToAction onJoin={() => { 
          const btn = document.querySelector('[aria-label="Join Ecosystem"]') as HTMLElement;
          if(btn) btn.click();
      }} />
    </div>
  );
};