import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Club } from '../../types';
import { ArrowLeft, Bell, Users, ArrowUpRight, Calendar, MoreHorizontal, Mail, ExternalLink, ChevronDown, Clock, Plus, UserCircle2, Target, Lightbulb, ArrowRight } from 'lucide-react';
import { getIcon } from '../../lib/iconMap';

interface ClubDashboardProps {
  club: Club;
  onBack: () => void;
  onJoin?: () => void;
}

const GOLDEN_EASE: [number, number, number, number] = [0.236, 1, 0.382, 1];
const PHI_DELAY = 0.0618;

export const ClubDashboard: React.FC<ClubDashboardProps> = ({ club, onBack, onJoin }) => {
  const Icon = getIcon(club.icon);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('About');
  const [expandedLead, setExpandedLead] = useState<number | null>(null);
  const [isEventExpanded, setIsEventExpanded] = useState(false);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: PHI_DELAY,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            duration: 0.618, 
            ease: GOLDEN_EASE 
        } 
    }
  };

  const handleToggleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setNotificationsEnabled(!notificationsEnabled);
    }
  };

  return (
    <div className="text-neutral-900 dark:text-white px-4 md:px-8 pt-28 md:pt-32 pb-12 font-sans transition-colors duration-300 flex-1 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            
            {/* --- HERO CARD (Spans 3 Columns) --- */}
            <motion.div 
                variants={itemVariants}
                className="col-span-1 md:col-span-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden min-h-[500px] h-auto flex flex-col justify-between group shadow-xl transition-colors"
            >
                {/* Dynamic Background Glow */}
                <div className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br ${club.color} opacity-10 dark:opacity-20 blur-[120px] rounded-full pointer-events-none group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-1000`}></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 mix-blend-overlay pointer-events-none"></div>

                {/* Top Bar inside Card */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 relative z-10 mb-8">
                    <motion.button 
                        whileHover={{ x: -3 }}
                        onClick={onBack}
                        aria-label="Go back to hub"
                        className="flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors group/back bg-white/50 dark:bg-black/40 hover:bg-white/80 dark:hover:bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-neutral-200 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-wider">Back</span>
                    </motion.button>

                    {/* Navigation Pills */}
                    <div className="flex flex-wrap gap-1 md:gap-0 p-1 bg-white/50 dark:bg-black/40 backdrop-blur-md rounded-full border border-neutral-200 dark:border-white/5" role="tablist">
                        {['About', 'Events', 'Resources'].map((item) => (
                           <button 
                             key={item} 
                             role="tab"
                             aria-selected={activeTab === item}
                             onClick={() => setActiveTab(item)}
                             className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 ${
                               activeTab === item 
                                 ? 'bg-neutral-900 dark:bg-neutral-800 text-white shadow-lg' 
                                 : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800/50'
                             }`}
                           >
                             {item}
                           </button>
                        ))}
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onJoin}
                            className={`ml-2 px-5 py-1.5 rounded-full bg-gradient-to-r ${club.color} text-white text-[10px] font-bold uppercase tracking-wider shadow-lg hover:shadow-${club.accentColor}/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20`}
                        >
                            Join Club
                        </motion.button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 mt-auto">
                  <AnimatePresence mode="wait">
                    {activeTab === 'About' && (
                      <motion.div
                        key="about"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.382, ease: GOLDEN_EASE }}
                        className="flex flex-col gap-8"
                      >
                         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                            <div className="max-w-3xl w-full">
                                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 sm:items-center mb-6">
                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-[1.5rem] bg-white/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700/50 backdrop-blur-md flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 shrink-0">
                                        <Icon className={`w-8 h-8 md:w-10 md:h-10 ${club.accentColor}`} />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display tracking-tighter leading-[0.9] text-neutral-900 dark:text-white transition-colors mb-2">
                                        {club.name}
                                        </h1>
                                        <div className="flex flex-wrap gap-3 items-center">
                                            <div className={`px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/5 ${club.accentColor} text-[10px] font-bold tracking-widest uppercase flex items-center`}>
                                                <span className={`w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse`}></span>
                                                Recruiting Now
                                            </div>
                                            <div className="text-neutral-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">
                                                {club.tagline}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-base md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl font-light transition-colors">
                                  {club.description}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-row flex-wrap md:flex-col gap-4 w-full md:w-auto border-t pt-6 lg:border-t-0 lg:pt-0 border-neutral-200 dark:border-white/10">
                                {club.stats.map((stat, i) => (
                                    <motion.div 
                                      key={i} 
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.2 + (i * 0.1) }}
                                      className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-neutral-200 dark:border-white/5 min-w-[120px] flex-1 md:flex-none"
                                    >
                                        <div className={`text-2xl font-bold ${club.accentColor} font-display`}>{stat.value}</div>
                                        <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                         {/* Leadership List */}
                         <div className="mt-4 pt-6 border-t border-neutral-200 dark:border-white/10">
                            <h3 className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">Leadership</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {club.leads.map((lead, index) => (
                                    <div key={index} className="p-3 rounded-xl bg-white/30 dark:bg-white/5 border border-neutral-200 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-colors">
                                        <button 
                                            onClick={() => setExpandedLead(expandedLead === index ? null : index)}
                                            className="flex items-center justify-between w-full text-left group focus:outline-none"
                                        >
                                            <div>
                                                <div className="text-neutral-900 dark:text-white font-bold text-xs group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{lead.name}</div>
                                                <div className="text-[10px] text-neutral-500">{lead.role}</div>
                                            </div>
                                            <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-300 ${expandedLead === index ? 'rotate-180' : ''}`} />
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
                                                    <div className="pt-3 pb-1 flex flex-col gap-2">
                                                        {lead.email && (
                                                            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-[10px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                                                <Mail className="w-2.5 h-2.5" />
                                                                {lead.email}
                                                            </a>
                                                        )}
                                                        {lead.socialUrl && (
                                                            <a href={lead.socialUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                                                <ExternalLink className="w-2.5 h-2.5" />
                                                                Profile
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
                      </motion.div>
                    )}

                    {activeTab === 'Events' && (
                      <motion.div
                        key="events"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.382, ease: GOLDEN_EASE }}
                        className="w-full py-4"
                      >
                         <div className="mb-8">
                             <h2 className="text-3xl font-bold font-display text-neutral-900 dark:text-white mb-2 transition-colors">Upcoming Schedule</h2>
                             <p className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors max-w-2xl">Join us for workshops, speaker sessions, and hackathons designed to accelerate your growth.</p>
                         </div>

                         <div className="grid gap-4">
                            <motion.div
                              layout
                              className="overflow-hidden rounded-3xl bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors"
                            >
                                <button 
                                  onClick={() => setIsEventExpanded(!isEventExpanded)}
                                  className="w-full text-left p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group/event focus:outline-none"
                                >
                                    <div className="flex items-center gap-6 flex-1">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${club.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className={`text-[10px] font-bold ${club.accentColor} uppercase tracking-widest mb-1`}>{club.nextEvent.type}</div>
                                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white transition-colors">{club.nextEvent.title}</h3>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-8">
                                         <div className="text-right hidden md:block">
                                            <div className="text-lg font-bold font-display text-neutral-900 dark:text-white transition-colors">{club.nextEvent.date.split('•')[0]}</div>
                                            <div className="text-xs font-medium text-neutral-500">{club.nextEvent.date.split('•')[1]}</div>
                                        </div>
                                        <motion.div 
                                            animate={{ rotate: isEventExpanded ? 180 : 0 }}
                                            className="text-neutral-400 group-hover/event:text-neutral-900 dark:group-hover/event:text-white transition-colors"
                                        >
                                            <ChevronDown className="w-5 h-5" />
                                        </motion.div>
                                    </div>
                                </button>

                                <AnimatePresence>
                                   {isEventExpanded && (
                                     <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 md:pl-24 md:pr-6"
                                     >
                                        <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
                                            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 max-w-3xl">
                                              {club.nextEvent.description || "Join us for this exciting event where we dive deep into the latest trends and strategies."}
                                            </p>
                                            
                                            {club.nextEvent.speakers && club.nextEvent.speakers.length > 0 && (
                                              <div className="mb-6">
                                                  <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Featured Speakers</h4>
                                                  <div className="flex flex-wrap gap-3">
                                                      {club.nextEvent.speakers.map((speaker, idx) => (
                                                          <div key={idx} className="flex items-center gap-3 bg-neutral-100 dark:bg-white/5 pr-4 py-1.5 pl-1.5 rounded-full border border-neutral-200 dark:border-white/5">
                                                              <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-white/10">
                                                                  <UserCircle2 className="w-5 h-5" />
                                                              </div>
                                                              <div>
                                                                  <div className="text-xs font-bold text-neutral-900 dark:text-white">{speaker.name}</div>
                                                                  <div className="text-[9px] text-neutral-500">{speaker.role}</div>
                                                              </div>
                                                          </div>
                                                      ))}
                                                  </div>
                                              </div>
                                            )}

                                            <div className="flex gap-3">
                                                <button className={`px-5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg`}>
                                                   RSVP Now <ArrowRight className="w-3 h-3" />
                                                </button>
                                                <button className={`px-4 py-2 rounded-xl bg-transparent border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2`}>
                                                   <Plus className="w-3 h-3" /> Add to Calendar
                                                </button>
                                            </div>
                                        </div>
                                     </motion.div>
                                   )}
                                </AnimatePresence>
                            </motion.div>
                         </div>
                      </motion.div>
                    )}

                    {activeTab === 'Resources' && (
                      <motion.div
                        key="resources"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.382, ease: GOLDEN_EASE }}
                        className="w-full py-6"
                      >
                         <div className="mb-8">
                             <h2 className="text-3xl font-bold font-display text-neutral-900 dark:text-white mb-2 transition-colors">Member Resources</h2>
                             <p className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors">Exclusive tools and guides for club members.</p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {['Club Handbook 2024', 'Mentorship Portal', 'Project Archive', 'Learning Roadmap'].map((item, i) => (
                                 <motion.a 
                                    key={i} 
                                    href="#" 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                                    className="p-6 rounded-[1.5rem] bg-white/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 transition-all cursor-pointer group/res flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-neutral-500"
                                 >
                                     <span className="text-base font-bold text-neutral-900 dark:text-white transition-colors">{item}</span>
                                     <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center group-hover/res:bg-neutral-900 dark:group-hover/res:bg-white transition-colors">
                                        <ArrowUpRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover/res:text-white dark:group-hover/res:text-black" />
                                     </div>
                                 </motion.a>
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
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="col-span-1 bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[320px] h-auto relative overflow-hidden group hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
                <div className="relative z-10 mb-4">
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
                    <span className={`text-xs font-bold uppercase tracking-wider ${notificationsEnabled ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        {notificationsEnabled ? 'Enabled' : 'Disabled'}
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
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="col-span-1 bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-6 flex flex-col min-h-[320px] h-auto relative group overflow-hidden transition-colors"
            >
                <div className="flex justify-between items-center mb-4 px-2 relative z-10">
                   <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display transition-colors">Up Next</h3>
                   <button aria-label="More options" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-500">
                       <MoreHorizontal className="text-neutral-500 w-5 h-5" />
                   </button>
                </div>
                
                <button 
                  className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-[2rem] border border-neutral-200 dark:border-neutral-700/50 overflow-hidden relative cursor-pointer group/card w-full text-left focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  aria-label={`RSVP for ${club.nextEvent.title}`}
                >
                    {/* Card Background with Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-0 group-hover/card:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                       <Calendar className={`w-12 h-12 text-neutral-400 dark:text-neutral-600 mb-4 group-hover/card:scale-110 group-hover/card:${club.accentColor} transition-all duration-500`} aria-hidden="true" />
                       <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">{club.nextEvent.type}</p>
                       <h4 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight mb-2 transition-colors line-clamp-2">{club.nextEvent.title}</h4>
                       <p className={`text-sm font-bold ${club.accentColor}`}>{club.nextEvent.date}</p>
                    </div>

                    {/* Hover Action */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300" aria-hidden="true">
                        <div className="w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl uppercase tracking-widest hover:bg-neutral-700 dark:hover:bg-neutral-200 text-center transition-colors">
                            RSVP
                        </div>
                    </div>
                </button>
            </motion.div>

            {/* Widget 3: Team Grid (Bottom Right) */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="col-span-1 bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[320px] h-auto transition-colors"
            >
                <div className="mb-4">
                    <div className="flex justify-between items-baseline mb-6">
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white font-display transition-colors">Leads</h3>
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Core Team</span>
                    </div>
                    
                    {/* 2x2 Avatar Grid */}
                    <div className="grid grid-cols-2 gap-3" role="list" aria-label="Team members">
                        {club.leads.slice(0, 4).map((lead, i) => (
                            <div 
                                key={i} 
                                role="listitem"
                                tabIndex={0}
                                className="group/member relative aspect-square rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors cursor-pointer overflow-hidden focus:outline-none focus:border-neutral-500"
                                aria-label={`${lead.name}, ${lead.role}`}
                            >
                                <Users className="w-6 h-6 text-neutral-400 dark:text-neutral-600 group-hover/member:text-neutral-900 dark:group-hover/member:text-white transition-colors mb-2" aria-hidden="true" />
                                <div className="text-[9px] text-neutral-500 font-medium uppercase text-center px-1 opacity-0 group-hover/member:opacity-100 group-focus:opacity-100 transition-opacity absolute bottom-3">
                                    {lead.role.split(' ')[0]}
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-tr ${club.color} opacity-0 group-hover/member:opacity-10 transition-opacity`}></div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="w-full py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group/btn focus:outline-none focus:ring-2 focus:ring-neutral-500">
                    View All
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </button>
            </motion.div>

        </motion.div>
    </div>
  );
};
