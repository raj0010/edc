import React from 'react';
import { FeatureSplit } from '../ui/FeatureSplit';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const MarketingPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-6 py-8">
        <button 
          onClick={onBack}
          className="flex items-center text-neutral-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>
      
      <section className="relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-neutral-950 to-black"></div>
        <FeatureSplit 
          title="Marketing Club"
          subtitle="Amplify Your Voice"
          description="In the Marketing Club, we don't just talk about brands; we build them. From social media algorithms to guerrilla marketing tactics, dive deep into the psychology of selling. We organize workshops, live projects with local businesses, and hackathons for creative campaigns."
          features={['Social Media Analytics', 'Content Creation Suite', 'Brand Identity Workshops']}
          alignment="left"
          colorAccent="bg-pink-500"
        />
      </section>
    </div>
  );
};