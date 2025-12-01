import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, QrCode, Barcode } from 'lucide-react';
import { Club } from '../../types';

interface LatestEventProps {
  clubs: Club[];
  onRegister?: () => void;
}

const GOLDEN_EASE: [number, number, number, number] = [0.236, 1, 0.382, 1];

export const LatestEvent: React.FC<LatestEventProps> = ({ clubs, onRegister }) => {
  const featuredClub = clubs.find(c => c.id === 'startup') || clubs[0];
  if (!featuredClub || !featuredClub.nextEvent) return null;

  const event = featuredClub.nextEvent;
  const [datePart, timePart] = event.date.split('•').map(s => s.trim());
  const month = datePart.split(' ')[0];
  const day = datePart.split(' ')[1];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20 relative z-20">
      <motion.div 
        initial={{ opacity: 0, rotateX: 10, y: 50 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: GOLDEN_EASE }}
        whileHover={{ scale: 1.016, y: -5 }}
        className="relative w-full flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-2xl group"
      >
        {/* Holographic Background Effect */}
        <div className="absolute inset-0 bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 z-0"></div>
        <div className={`absolute inset-0 bg-gradient-to-r ${featuredClub.color} opacity-10 mix-blend-overlay group-hover:opacity-20 transition-opacity duration-700`}></div>
        
        {/* Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10 pointer-events-none"></div>

        {/* Main Content (Left) */}
        <div className="flex-1 p-8 md:p-10 relative z-20 border-b md:border-b-0 md:border-r border-white/10 border-dashed">
            <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Upcoming Event</span>
                   <div className={`inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 ${featuredClub.accentColor} text-[10px] font-bold uppercase tracking-widest`}>
                       {featuredClub.name}
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Live</span>
                </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white font-display uppercase leading-[0.9] mb-6 tracking-tighter">
                {event.title}
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">Location</span>
                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                       <MapPin className="w-4 h-4 opacity-70" /> Hall A, Innovation Hub
                    </div>
                </div>
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">Time</span>
                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                       <Clock className="w-4 h-4 opacity-70" /> {timePart}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={onRegister}
                    className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-black/10 dark:shadow-white/10"
                >
                    Get Ticket
                </button>
            </div>
        </div>

        {/* Stub (Right) */}
        <div className="w-full md:w-64 bg-neutral-100/50 dark:bg-black/20 p-8 relative z-20 flex flex-col justify-between items-center text-center">
             {/* Cutout circles for tear-off effect */}
             <div className="absolute -top-3 left-1/2 md:top-1/2 md:-left-3 w-6 h-6 bg-[#fafafa] dark:bg-[#050505] rounded-full transform -translate-x-1/2 md:-translate-y-1/2"></div>
             <div className="absolute -bottom-3 left-1/2 md:top-auto md:bottom-auto md:top-1/2 md:-right-3 w-0 h-0 md:w-6 md:h-6 bg-transparent rounded-full"></div> {/* Hidden right cutout for visual balance if needed, simplified */}
             
             <div>
                <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">{month}</div>
                <div className="text-6xl font-black text-neutral-900 dark:text-white font-display tracking-tighter">{day}</div>
             </div>

             <div className="w-full py-4 border-t border-b border-white/10 my-4">
                 <QrCode className="w-20 h-20 mx-auto text-neutral-800 dark:text-white opacity-90" />
             </div>

             <div className="flex flex-col items-center gap-1 opacity-50">
                <Barcode className="w-32 h-8 text-neutral-800 dark:text-white" />
                <span className="text-[8px] font-mono text-neutral-500 tracking-[0.2em]">ADMIT ONE</span>
             </div>
        </div>
      </motion.div>
    </section>
  );
};
