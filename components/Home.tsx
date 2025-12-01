
import React from 'react';
import { Hero } from './Hero';
import { ClubShowcase } from './ClubShowcase';
import { Features } from './Features';
import { Club, FeatureItem, NewsItem } from '../types';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { LatestEvent } from './ui/LatestEvent';
import { AboutUs } from './ui/AboutUs';
import { NewsFeed } from './ui/NewsFeed';

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
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <RevealSection>
        <Hero />
      </RevealSection>
      
      {/* Latest Event Alert Section */}
      {!isLoading && (
         <div className="py-8">
            <LatestEvent clubs={clubs} />
         </div>
      )}
      
      {/* Club Showcase */}
      <RevealSection delay={0.1}>
        <div className="py-12 bg-neutral-50/50 dark:bg-[#080808]">
            <ClubShowcase clubs={clubs} onExplore={onNavigate} isLoading={isLoading} />
        </div>
      </RevealSection>

      {!isLoading && (
        <>
          <Features features={features} />
          
          <div className="relative z-10">
            <AboutUs />
          </div>

          <NewsFeed news={news} />
        </>
      )}
    </div>
  );
};