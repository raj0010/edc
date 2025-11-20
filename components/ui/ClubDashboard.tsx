import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Club } from '../../types';
import { ArrowLeft, Bell, Users, ArrowUpRight, Calendar, MoreHorizontal } from 'lucide-react';

interface ClubDashboardProps {
  club: Club;
  onBack: () => void;
  onJoin?: () => void;
}

export const ClubDashboard: React.FC<ClubDashboardProps> = ({ club, onBack, onJoin }) => {
  const Icon = club.icon;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('About');

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-8 pt-32 md:pt-40 pb-20 font-sans selection:bg-neutral-800">
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            
            {/* --- HERO CARD (Spans 3 Columns) --- */}
            <motion.div 
                variants={itemVariants}
                className="col-span-1 md:col-span-3 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden min-h-[500px] flex flex-col justify-between group shadow-2xl"
            >
                {/* Dynamic Background Glow */}
                <div className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br ${club.color} opacity-20 blur-[120px] rounded-full pointer-events-none group-hover:opacity-30 transition-opacity duration-1000`}></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                {/* Top Bar inside Card */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 mb-8">
                    <button 
                        onClick={onBack}
                        className="flex items-center text-neutral-400 hover:text-white transition-colors group/back bg-black/40 hover:bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/5 hover:border-white/20"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover/back:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Hub</span>
                    </button>

                    {/* Navigation Pills */}
                    <div className="flex flex-wrap gap-2 md:gap-0 p-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/5">
                        {['About', 'Events', 'Resources'].map((item) => (
                           <button 
                             key={item} 
                             onClick={() => setActiveTab(item)}
                             className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                               activeTab === item 
                                 ? 'bg-neutral-800 text-white shadow-lg' 
                                 : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                             }`}
                           >
                             {item}
                           </button>
                        ))}
                        <button 
                            onClick={onJoin}
                            className={`ml-2 px-6 py-2 rounded-full bg-gradient-to-r ${club.color} text-white text-sm font-bold shadow-lg hover:shadow-${club.accentColor}/50 hover:scale-105 transition-all duration-300`}
                        >
                            Join Club
                        </button>
                    </div>
                </div>

                {/* Main Content - Dynamic based on Tab */}
                <div className="relative z-10 mt-4 flex-1 flex flex-col justify-end">
                  <AnimatePresence mode="wait">
                    {activeTab === 'About' && (
                      <motion.div
                        key="about"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                      >
                        <div className="max-w-2xl">
                            <div className="w-20 h-20 rounded-3xl bg-neutral-900/50 border border-neutral-700/50 backdrop-blur-md flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                <Icon className={`w-10 h-10 ${club.accentColor}`} />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6 leading-[0.9] text-white">
                              {club.name}
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-lg mb-8 font-light">
                              {club.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 items-center">
                               <div className={`px-4 py-1.5 rounded-full border border-white/10 bg-white/5 ${club.accentColor} text-xs font-bold tracking-wider uppercase flex items-center`}>
                                  <span className={`w-2 h-2 rounded-full bg-current mr-2 animate-pulse`}></span>
                                  Recruiting Now
                               </div>
                               <div className="h-1 w-1 bg-neutral-700 rounded-full"></div>
                               <div className="text-neutral-400 text-sm font-medium">
                                  {club.tagline}
                               </div>
                            </div>
                        </div>

                        {/* Stats Column */}
                        <div className="flex flex-row md:flex-col gap-8 md:gap-4">
                            {club.stats.map((stat, i) => (
                                <div key={i} className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/5 min-w-[120px]">
                                    <div className={`text-2xl font-bold ${club.accentColor} font-display`}>{stat.value}</div>
                                    <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'Events' && (
                      <motion.div
                        key="events"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex flex-col justify-center"
                      >
                         <div className="mb-8">
                             <h2 className="text-4xl font-bold font-display text-white mb-2">Upcoming Schedule</h2>
                             <p className="text-neutral-400">Join us for workshops, speaker sessions, and hackathons.</p>
                         </div>

                         <div className="grid gap-4">
                            {/* Featured Next Event */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/10 transition-colors cursor-pointer group/event">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${club.color} flex items-center justify-center text-white shadow-lg`}>
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className={`text-xs font-bold ${club.accentColor} uppercase tracking-wider mb-1`}>{club.nextEvent.type}</div>
                                        <h3 className="text-xl font-bold text-white">{club.nextEvent.title}</h3>
                                    </div>
                                </div>
                                <div className="text-right md:pl-8 md:border-l border-white/10">
                                    <div className="text-2xl font-bold font-display text-white">{club.nextEvent.date.split('•')[0]}</div>
                                    <div className="text-sm text-neutral-400">{club.nextEvent.date.split('•')[1]}</div>
                                </div>
                            </div>
                            
                            {/* Placeholder for future events */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral-500 border-dashed">
                                <span className="text-sm">More events to be announced soon...</span>
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {activeTab === 'Resources' && (
                      <motion.div
                        key="resources"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex flex-col justify-center"
                      >
                         <div className="mb-8">
                             <h2 className="text-4xl font-bold font-display text-white mb-2">Member Resources</h2>
                             <p className="text-neutral-400">Exclusive tools and guides for club members.</p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {['Club Handbook 2024', 'Mentorship Portal', 'Project Archive', 'Learning Roadmap'].map((item, i) => (
                                 <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/res flex items-center justify-between">
                                     <span className="font-medium text-white">{item}</span>
                                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/res:bg-white/20 transition-colors">
                                        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover/res:text-white" />
                                     </div>
                                 </div>
                             ))}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </motion.div>

            {/* --- BOTTOM WIDGETS ROW --- */}

            {/* Widget 1: Status & Toggle (Bottom Left) */}
            <motion.div 
              variants={itemVariants}
              className="col-span-1 bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 flex flex-col justify-between h-[320px] relative overflow-hidden group hover:border-neutral-700 transition-colors"
            >
                <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mb-4 ${notificationsEnabled ? 'text-white' : 'text-neutral-500'} transition-colors`}>
                       <Bell className={`w-6 h-6 ${notificationsEnabled ? 'fill-current' : ''}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display mb-2">Alerts</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                       Get notified about {club.name.split(' ')[0]} workshops and meetups.
                    </p>
                </div>
                
                {/* Interactive Toggle */}
                <div 
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative z-10 flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                        notificationsEnabled 
                          ? `bg-${club.accentColor.split('-')[1]}-900/20 border-${club.accentColor.split('-')[1]}-500/50` 
                          : 'bg-neutral-800/50 border-neutral-700/50 hover:bg-neutral-800'
                    }`}
                >
                    <span className={`text-sm font-bold ${notificationsEnabled ? 'text-white' : 'text-neutral-400'}`}>
                        {notificationsEnabled ? 'On' : 'Off'}
                    </span>
                    <div className={`w-12 h-7 rounded-full p-1 relative transition-colors duration-300 ${notificationsEnabled ? `bg-${club.accentColor.split('-')[1]}-500` : 'bg-neutral-700'}`}>
                        <motion.div 
                            layout
                            className="w-5 h-5 bg-white rounded-full shadow-md"
                            animate={{ x: notificationsEnabled ? 20 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Widget 2: Featured Event (Bottom Middle) */}
            <motion.div 
              variants={itemVariants}
              className="col-span-1 bg-neutral-900 border border-neutral-800 rounded-[2rem] p-6 flex flex-col h-[320px] relative group overflow-hidden"
            >
                <div className="flex justify-between items-center mb-4 px-2 relative z-10">
                   <h3 className="text-xl font-bold text-white font-display">Up Next</h3>
                   <div className="p-2 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer">
                       <MoreHorizontal className="text-neutral-500 w-5 h-5" />
                   </div>
                </div>
                
                <div className="flex-1 bg-neutral-800 rounded-[1.5rem] border border-neutral-700/50 overflow-hidden relative cursor-pointer group/card">
                    {/* Card Background with Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-0 group-hover/card:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                       <Calendar className={`w-12 h-12 text-neutral-600 mb-4 group-hover/card:scale-110 group-hover/card:${club.accentColor} transition-all duration-500`} />
                       <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{club.nextEvent.type}</p>
                       <h4 className="text-lg font-bold text-white leading-tight mb-1">{club.nextEvent.title}</h4>
                       <p className={`text-sm font-medium ${club.accentColor}`}>{club.nextEvent.date}</p>
                    </div>

                    {/* Hover Action */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                        <button className="w-full py-3 bg-white text-black font-bold text-xs rounded-xl uppercase tracking-wide hover:bg-neutral-200">
                            RSVP Now
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Widget 3: Team Grid (Bottom Right) */}
            <motion.div 
              variants={itemVariants}
              className="col-span-1 bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 flex flex-col justify-between h-[320px]"
            >
                <div>
                    <div className="flex justify-between items-baseline mb-6">
                        <h3 className="text-2xl font-bold text-white font-display">Leads</h3>
                        <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Core Team</span>
                    </div>
                    
                    {/* 2x2 Avatar Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        {club.leads.slice(0, 4).map((lead, i) => (
                            <div key={i} className="group/member relative">
                                <div className="aspect-square rounded-2xl bg-neutral-800 border border-neutral-700 flex flex-col items-center justify-center hover:border-neutral-500 transition-colors cursor-pointer relative overflow-hidden">
                                    <Users className="w-5 h-5 text-neutral-600 group-hover/member:text-white transition-colors mb-1" />
                                    <div className="text-[10px] text-neutral-500 font-medium uppercase text-center px-1 opacity-0 group-hover/member:opacity-100 transition-opacity absolute bottom-2">
                                        {lead.role}
                                    </div>
                                    <div className={`absolute inset-0 bg-gradient-to-tr ${club.color} opacity-0 group-hover/member:opacity-10 transition-opacity`}></div>
                                </div>
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover/member:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                    {lead.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 group/btn">
                    View All Members
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
            </motion.div>

        </motion.div>
    </div>
  );
};