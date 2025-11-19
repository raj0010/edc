import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const FinancePage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20 relative overflow-hidden">
       <div className="container mx-auto px-6 py-8 relative z-20">
        <button 
          onClick={onBack}
          className="flex items-center text-neutral-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

       {/* Abstract Background */}
       <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-900/30 rounded-full blur-3xl"></div>
       </div>
       
       <div className="container mx-auto px-6 relative z-10 pt-10 pb-32">
          <div className="max-w-4xl mx-auto text-center">
             <h2 className="text-5xl md:text-7xl font-bold mb-8 font-display tracking-tighter text-white">
                Finance & <br/>
                <span className="text-emerald-500">Investment</span>
             </h2>
             <p className="text-xl text-neutral-400 mb-12 leading-relaxed">
                Master the language of money. Whether it's understanding crypto markets, analyzing stock trends, or managing venture capital funds, the Finance Club is your gateway to financial literacy and wealth management.
             </p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                   { label: "Assets Under Mgmt", value: "$50k+" },
                   { label: "Student Investors", value: "200+" },
                   { label: "Annual Return", value: "18%" }
                ].map((stat, i) => (
                   <div key={i} className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur hover:border-emerald-500/50 transition-colors">
                      <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-sm text-emerald-400 uppercase tracking-wider">{stat.label}</div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};