import React from 'react';
import { PageHeader } from '../ui/PageHeader';
import { Club } from '../../types';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const EventsPage = ({ clubs }: { clubs: Club[] }) => {
    // Aggregate all club events
    const allEvents = clubs.map(c => ({...c.nextEvent, clubName: c.name, color: c.color, clubId: c.id}));

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0F0F0F]">
      <PageHeader title="Calendar" subtitle="Upcoming workshops, hackathons, and speaker sessions across all chapters." />
      <div className="container mx-auto px-6 pb-24">
        <div className="grid gap-6 max-w-5xl">
            {allEvents.map((event, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400`}>{event.clubName}</span>
                             <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{event.type}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">{event.title}</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">{event.description}</p>
                        
                        {event.speakers && event.speakers.length > 0 && (
                            <div className="mt-4 flex gap-4">
                                {event.speakers.map((s, idx) => (
                                    <div key={idx} className="text-xs">
                                        <span className="font-bold text-neutral-900 dark:text-white block">{s.name}</span>
                                        <span className="text-neutral-500">{s.role}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 min-w-[220px] border-l border-neutral-200 dark:border-neutral-800 pl-0 md:pl-8 border-t md:border-t-0 pt-6 md:pt-0 justify-center">
                        <div className="flex items-center gap-3 text-sm text-neutral-900 dark:text-white font-medium">
                            <Calendar className="w-4 h-4 text-neutral-400" />
                            {event.date}
                        </div>
                         <div className="flex items-center gap-3 text-sm text-neutral-900 dark:text-white font-medium">
                            <MapPin className="w-4 h-4 text-neutral-400" />
                            Innovation Block B
                        </div>
                        <button className="mt-2 w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                            Register Now <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};