import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Club } from '../../types';
import { ArrowLeft, Bell, Users, ArrowUpRight, Calendar, MoreHorizontal, Mail, ExternalLink, ChevronDown } from 'lucide-react';

interface ClubDashboardProps {
  club: Club;
  onBack: () => void;
  onJoin?: () => void;
}

export const ClubDashboard: React.FC<ClubDashboardProps> = ({ club, onBack, onJoin }) => {
  const Icon = club.icon;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('About');
  const [expandedLead, setExpandedLead] = useState<number | null>(null);

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

  // Helper for toggle keyboard interaction
  const handleToggleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setNotificationsEnabled(!notificationsEnabled);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white px-4 md:px-8 pt-32 md:pt-40 pb-20 font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors duration-300">
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            
            {/* --- HERO CARD (Spans 3 Columns) --- */}
            <motion.div 
                variants={itemVariants}
                className="col-span-1 md:col-span-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden min-h-[500px] flex flex-col justify-between group shadow-xl transition-colors"
            >
                {/* Dynamic Background Glow */}
                <div className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br ${club.color} opacity-10 dark:opacity-20 blur-[120px] rounded-full pointer-events-none group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-1000`}></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 mix-blend-overlay pointer-events-none"></div>

                {/* Top Bar inside Card */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 mb-8">
                    <button 
                        onClick={onBack}
                        aria-label="Go back to hub"
                        className="flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group/back bg-white/50 dark:bg-black/40 hover:bg-white/80 dark:hover:bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-md border border-neutral-200 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover/back:-translate-x-1 transition-transform" aria-hidden="true" />
                        <span className="text-sm font-medium">Back to Hub</span>
                    </button>

                    {/* Navigation Pills (Tab List) */}
                    <div className="flex flex-wrap gap-2 md:gap-0 p-1.5 bg-white/50 dark:bg-black/40 backdrop-blur-md rounded-full border border-neutral-200 dark:border-white/5" role="tablist" aria-label="Dashboard sections">
                        {['About', 'Events', 'Resources'].map((item) => (
                           <button 
                             key={item} 
                             role="tab"
                             aria-selected={activeTab === item}
                             aria-controls={`panel-${item}`}
                             id={`tab-${item}`}
                             tabIndex={activeTab === item ? 0 : -1}
                             onClick={() => setActiveTab(item)}
                             className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 ${
                               activeTab === item 
                                 ? 'bg-neutral-900 dark:bg-neutral-800 text-white shadow-lg' 
                                 : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800/50'
                             }`}
                           >
                             {item}
                           </button>
                        ))}
                        <button 
                            onClick={onJoin}
                            aria-label={`Join ${club.name}`}
                            className={`ml-2 px-6 py-2 rounded-full bg-gradient-to-r ${club.color} text-white text-sm font-bold shadow-lg hover:shadow-${club.accentColor}/50 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20`}
                        >
                            Join Club
                        </button>
                    </div>
                </div>

                {/* Main Content - Dynamic based on Tab (Tab Panels) */}
                <div className="relative z-10 mt-4 flex-1 flex flex-col justify-end">
                  <AnimatePresence mode="wait">
                    {activeTab === 'About' && (
                      <motion.div
                        key="about"
                        role="tabpanel"
                        id="panel-About"
                        aria-labelledby="tab-About"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                      >
                        <div className="max-w-2xl w-full">
                            <div className="flex flex-col md:flex-row gap-6 md:items-center mb-6">
                                <div className="w-20 h-20 rounded-3xl bg-white/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700/50 backdrop-blur-md flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
                                    <Icon className={`w-10 h-10 ${club.accentColor}`} />
                                </div>
                                <div>
                                    <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[0.9] text-neutral-900 dark:text-white transition-colors">
                                    {club.name}
                                    </h1>
                                </div>
                            </div>
                            
                            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg mb-8 font-light transition-colors">
                              {club.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 items-center mb-8">
                               <div className={`px-4 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 bg-white/5 ${club.accentColor} text-xs font-bold tracking-wider uppercase flex items-center`}>
                                  <span className={`w-2 h-2 rounded-full bg-current mr-2 animate-pulse`}></span>
                                  Recruiting Now
                               </div>
                               <div className="h-1 w-1 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
                               <div className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                                  {club.tagline}
                                </div>
                            </div>

                             {/* Leadership Contacts List */}
                             <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-white/10">
                                <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">Leadership Contacts</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                                    {club.leads.map((lead, index) => (
                                        <div key={index} className="flex flex-col">
                                            <button 
                                                onClick={() => setExpandedLead(expandedLead === index ? null : index)}
                                                className="flex items-center justify-between w-full text-left group focus:outline-none"
                                                aria-expanded={expandedLead === index}
                                            >
                                                <div>
                                                    <div className="text-neutral-900 dark:text-white font-bold text-sm group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{lead.name}</div>
                                                    <div className="text-xs text-neutral-500 group-hover:text-neutral-400">{lead.role}</div>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 transition-all duration-300 ${expandedLead === index ? 'rotate-180 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white' : 'group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700'}`}>
                                                    <ChevronDown className="w-3 h-3" />
                                                </div>
                                            </button>
                                            <AnimatePresence>
                                                {expandedLead === index && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-3 pb-1 flex flex-col gap-2 pl-1">
                                                            {lead.email && (
                                                                <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group/link">
                                                                    <div className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center group-hover/link:bg-neutral-200 dark:group-hover/link:bg-white/10">
                                                                        <Mail className="w-3 h-3" />
                                                                    </div>
                                                                    {lead.email}
                                                                </a>
                                                            )}
                                                            {lead.socialUrl && (
                                                                <a href={lead.socialUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group/link">
                                                                    <div className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center group-hover/link:bg-neutral-200 dark:group-hover/link:bg-white/10">
                                                                        <ExternalLink className="w-3 h-3" />
                                                                    </div>
                                                                    Social Profile
                                                                </a>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>

                        {/* Stats Column */}
                        <div className="flex flex-row md:flex-col gap-8 md:gap-4 self-start md:self-end" aria-label="Club Statistics">
                            {club.stats.map((stat, i) => (
                                <div key={i} className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-neutral-200 dark:border-white/5 min-w-[120px]">
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
                        role="tabpanel"
                        id="panel-Events"
                        aria-labelledby="tab-Events"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex flex-col justify-center"
                      >
                         <div className="mb-8">
                             <h2 className="text-4xl font-bold font-display text-neutral-900 dark:text-white mb-2 transition-colors">Upcoming Schedule</h2>
                             <p className="text-neutral-600 dark:text-neutral-400 transition-colors">Join us for workshops, speaker sessions, and hackathons.</p>
                         </div>

                         <div className="grid gap-4">
                            {/* Featured Next Event */}
                            <button className="w-full text-left p-6 rounded-3xl bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white dark:hover:bg-white/10 transition-colors cursor-pointer group/event focus:outline-none focus:ring-2 focus:ring-neutral-500">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${club.color} flex items-center justify-center text-white shadow-lg`}>
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className={`text-xs font-bold ${club.accentColor} uppercase tracking-wider mb-1`}>{club.nextEvent.type}</div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white transition-colors">{club.nextEvent.title}</h3>
                                    </div>
                                </div>
                                <div className="text-right md:pl-8 md:border-l border-neutral-200 dark:border-white/10">
                                    <div className="text-2xl font-bold font-display text-neutral-900 dark:text-white transition-colors">{club.nextEvent.date.split('•')[0]}</div>
                                    <div className="text-sm text-neutral-500 dark:text-neutral-400">{club.nextEvent.date.split('•')[1]}</div>
                                </div>
                            </button>
                            
                            {/* Placeholder for future events */}
                            <div className="p-6 rounded-3xl bg-white/20 dark:bg-white/5 border border-neutral-200 dark:border-white/5 flex items-center justify-center text-neutral-500 border-dashed" role="note">
                                <span className="text-sm">More events to be announced soon...</span>
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {activeTab === 'Resources' && (
                      <motion.div
                        key="resources"
                        role="tabpanel"
                        id="panel-Resources"
                        aria-labelledby="tab-Resources"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex flex-col justify-center"
                      >
                         <div className="mb-8">
                             <h2 className="text-4xl font-bold font-display text-neutral-900 dark:text-white mb-2 transition-colors">Member Resources</h2>
                             <p className="text-neutral-600 dark:text-neutral-400 transition-colors">Exclusive tools and guides for club members.</p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {['Club Handbook 2024', 'Mentorship Portal', 'Project Archive', 'Learning Roadmap'].map((item, i) => (
                                 <a key={i} href="#" className="p-5 rounded-2xl bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer group/res flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-neutral-500">
                                     <span className="font-medium text-neutral-900 dark:text-white transition-colors">{item}</span>
                                     <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center group-hover/res:bg-neutral-200 dark:group-hover/res:bg-white/20 transition-colors">
                                        <ArrowUpRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover/res:text-neutral-900 dark:group-hover/res:text-white" />
                                     </div>
                                 </a>
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
              className="col-span-1 bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-8 flex flex-col justify-between h-[320px] relative overflow-hidden group hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
                <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 ${notificationsEnabled ? 'text-neutral-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-500'} transition-colors`}>
                       <Bell className={`w-6 h-6 ${notificationsEnabled ? 'fill-current' : ''}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white font-display mb-2 transition-colors">Alerts</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors">
                       Get notified about {club.name.split(' ')[0]} workshops and meetups.
                    </p>
                </div>
                
                {/* Interactive Toggle */}
                <div 
                    role="switch"
                    aria-checked={notificationsEnabled}
                    aria-label="Enable notifications"
                    tabIndex={0}
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    onKeyDown={handleToggleKeyDown}
                    className={`relative z-10 flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 ${
                        notificationsEnabled 
                          ? `bg-${club.accentColor.split('-')[1]}-100 dark:bg-${club.accentColor.split('-')[1]}-900/20 border-${club.accentColor.split('-')[1]}-500/50 text-${club.accentColor.split('-')[1]}-700 dark:text-white` 
                          : 'bg-neutral-100 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700/50 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                    }`}
                >
                    <span className={`text-sm font-bold ${notificationsEnabled ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        {notificationsEnabled ? 'On' : 'Off'}
                    </span>
                    <div className={`w-12 h-7 rounded-full p-1 relative transition-colors duration-300 ${notificationsEnabled ? `bg-${club.accentColor.split('-')[1]}-500` : 'bg-neutral-300 dark:bg-neutral-700'}`}>
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
              className="col-span-1 bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-6 flex flex-col h-[320px] relative group overflow-hidden transition-colors"
            >
                <div className="flex justify-between items-center mb-4 px-2 relative z-10">
                   <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display transition-colors">Up Next</h3>
                   <button aria-label="More options" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-500">
                       <MoreHorizontal className="text-neutral-500 w-5 h-5" />
                   </button>
                </div>
                
                <button 
                  className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-[1.5rem] border border-neutral-200 dark:border-neutral-700/50 overflow-hidden relative cursor-pointer group/card w-full text-left focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  aria-label={`RSVP for ${club.nextEvent.title}`}
                >
                    {/* Card Background with Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-0 group-hover/card:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                       <Calendar className={`w-12 h-12 text-neutral-400 dark:text-neutral-600 mb-4 group-hover/card:scale-110 group-hover/card:${club.accentColor} transition-all duration-500`} aria-hidden="true" />
                       <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{club.nextEvent.type}</p>
                       <h4 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight mb-1 transition-colors">{club.nextEvent.title}</h4>
                       <p className={`text-sm font-medium ${club.accentColor}`}>{club.nextEvent.date}</p>
                    </div>

                    {/* Hover Action */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300" aria-hidden="true">
                        <div className="w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl uppercase tracking-wide hover:bg-neutral-700 dark:hover:bg-neutral-200 text-center transition-colors">
                            RSVP Now
                        </div>
                    </div>
                </button>
            </motion.div>

            {/* Widget 3: Team Grid (Bottom Right) */}
            <motion.div 
              variants={itemVariants}
              className="col-span-1 bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-8 flex flex-col justify-between h-[320px] transition-colors"
            >
                <div>
                    <div className="flex justify-between items-baseline mb-6">
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white font-display transition-colors">Leads</h3>
                        <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Core Team</span>
                    </div>
                    
                    {/* 2x2 Avatar Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-2" role="list" aria-label="Team members">
                        {club.leads.slice(0, 4).map((lead, i) => (
                            <div 
                                key={i} 
                                role="listitem"
                                tabIndex={0}
                                className="group/member relative aspect-square rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors cursor-pointer overflow-hidden focus:outline-none focus:border-neutral-500"
                                aria-label={`${lead.name}, ${lead.role}`}
                            >
                                <Users className="w-5 h-5 text-neutral-400 dark:text-neutral-600 group-hover/member:text-neutral-900 dark:group-hover/member:text-white transition-colors mb-1" aria-hidden="true" />
                                <div className="text-[10px] text-neutral-500 font-medium uppercase text-center px-1 opacity-0 group-hover/member:opacity-100 group-focus:opacity-100 transition-opacity absolute bottom-2">
                                    {lead.role}
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-tr ${club.color} opacity-0 group-hover/member:opacity-10 transition-opacity`}></div>
                                
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-bold rounded opacity-0 group-hover/member:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                    {lead.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="w-full py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 group/btn focus:outline-none focus:ring-2 focus:ring-neutral-500">
                    View All Members
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </button>
            </motion.div>

        </motion.div>
    </div>
  );
};