import React from 'react';
import { BentoGrid } from '../ui/BentoGrid';
import { ArrowLeft, Rocket } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const StartupPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20">
       <div className="container mx-auto px-6 py-8">
        <button 
          onClick={onBack}
          className="flex items-center text-neutral-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-6 mb-16 text-center">
           <div className="inline-block p-2 rounded-full bg-violet-500/10 mb-4">
              <Rocket className="w-6 h-6 text-violet-400" />
           </div>
           <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-white">Startup Club Ecosystem</h2>
           <p className="text-neutral-400 max-w-2xl mx-auto">
             A complete ecosystem designed to take you from zero to one. We provide the infrastructure, you provide the innovation.
           </p>
        </div>
        <BentoGrid />
      </section>
    </div>
  );
};