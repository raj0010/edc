import React from 'react';
import { FeatureSplit } from '../ui/FeatureSplit';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const ConsultingPage: React.FC<Props> = ({ onBack }) => {
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

      <FeatureSplit 
        title="Consulting Club"
        subtitle="Strategic Solutions"
        description="Crack the toughest business cases with the Consulting Club. We prepare you for top-tier firms through rigorous case studies, mock interviews, and live consulting projects with real startups. Develop the analytical mindset required to solve complex organizational challenges."
        features={['Live Industry Projects', 'Case Study Competitions', 'Alumni Mentorship']}
        alignment="right"
        colorAccent="bg-blue-500"
      />
    </div>
  );
};