import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Club } from '../../types';
import { ArrowLeft, Bell, Users, ArrowUpRight, Calendar, Mail, ExternalLink, CheckCircle2, Sparkles, MoveRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ClubDashboardProps {
  club: Club;
  onBack: () => void;
  onJoin?: () => void;
}

const FadeInSection = ({ children, className, delay = 0 }: { children?: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ClubDashboard: React.FC<ClubDashboardProps> = ({ club, onBack, onJoin }) => {
  const Icon = club.icon;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Navigation Animations
  const navBackgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const navTitleOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const navTitleY = useTransform(scrollYProgress, [0.15, 0.25], [10, 0]);
  
  // Hero Animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white transition-colors duration-500 selection:bg-neutral-200 dark:selection:bg-neutral-800 overflow-x-hidden">
        
        {/* --- FIXED BACKGROUNDS --- */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Dynamic Gradient Blob */}
            <div className={cn(
                "absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-20 dark:opacity-30 animate-pulse-slow mix-blend-multiply dark:mix-blend-screen bg-gradient-to-b",
                club.color
            )} />
             <div className={cn(
                "absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-10 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen bg-gradient-to-t",
                club.color
            )} />
            {/* Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
        </div>

        {/* --- PERSISTENT NAVIGATION BAR --- */}
        <nav className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300">
            {/* Background Layer */}
            <motion.div 
              style={{ opacity: navBackgroundOpacity }}
              className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-white/5"
            />

            <div className="container mx-auto px-6 h-full flex items-center justify-between relative z-10">
               <div className="flex items-center gap-4">
                  <button 
                     onClick={onBack}
                     className="w-10 h-10 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-neutral-200 dark:border-white/10 flex items-center justify-center hover:bg-white dark:hover:bg-white/20 transition-colors group"
                  >
                     <ArrowLeft className="w-5 h-5 text-neutral-900 dark:text-white group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  
                  <motion.div 
                    style={{ opacity: navTitleOpacity, y: navTitleY }}
                    className="flex flex-col hidden md:flex"
                  >
                     <span className="font-bold text-lg font-display tracking-tight leading-none">{club.name}</span>
                     <span className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">{club.tagline}</span>
                  </motion.div>
               </div>
               
               <div className="flex items-center gap-4">
                   <button 
                      onClick={onJoin}
                      className={cn(
                          "px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform active:scale-95 relative overflow-hidden group/btn",
                          "bg-gradient-to-r",
                          club.color
                      )}
                   >
                      <span className="relative z-10">Join Now</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                   </button>
               </div>
            </div>
        </nav>

        <main className="relative z-10 flex flex-col">
            
            {/* --- HERO SECTION --- */}
            <motion.section 
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="min-h-screen flex flex-col justify-center relative px-6 pt-20 pb-0"
            >
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
                    {/* Left Content */}
                    <div className="lg:col-span-7 flex flex-col gap-8 pt-12 lg:pt-0">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={cn(
                                "inline-flex items-center self-start px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest bg-white/50 dark:bg-white/5 backdrop-blur-sm",
                                `border-${club.accentColor.split('-')[1]}-500/30 text-${club.accentColor.split('-')[1]}-600 dark:text-${club.accentColor.split('-')[1]}-400`
                            )}
                        >
                            <Sparkles className="w-3 h-3 mr-2 fill-current" />
                            {club.tagline}
                        </motion.div>

                        <div className="relative">
                           <motion.h1 
                               initial={{ opacity: 0, y: 40 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.2, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                               className="text-7xl md:text-9xl lg:text-[10rem] font-black font-display tracking-tighter leading-[0.85] text-neutral-900 dark:text-white"
                           >
                               {club.name.replace(' Club', '')}
                               <span className={cn("block text-transparent bg-clip-text bg-gradient-to-r", club.color)}>
                                   CLUB.
                               </span>
                           </motion.h1>
                           
                           {/* Decorative Elements on Text */}
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: '150px' }}
                             transition={{ delay: 0.8, duration: 1 }}
                             className={cn("h-2 md:h-4 mt-4 rounded-full bg-gradient-to-r", club.color)}
                           />
                        </div>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-300 font-light max-w-2xl leading-relaxed border-l-4 border-neutral-200 dark:border-neutral-800 pl-6"
                        >
                            {club.description}
                        </motion.p>

                        {/* Stats Row */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-8 md:gap-16 mt-8"
                        >
                            {club.stats.map((stat, i) => (
                                <div key={i} className="flex flex-col group cursor-default">
                                    <span className={cn("text-4xl md:text-5xl font-bold font-display group-hover:scale-110 transition-transform origin-left duration-300", club.accentColor)}>
                                        {stat.value}
                                    </span>
                                    <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider mt-1 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Visual */}
                    <div className="lg:col-span-5 relative h-[400px] md:h-[600px] flex items-center justify-center pointer-events-none">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            transition={{ type: "spring", duration: 2, bounce: 0.2 }}
                            className="relative z-10 w-full h-full flex items-center justify-center perspective-1000"
                        >
                             {/* Glassmorphism Icon Container */}
                             <div className="w-72 h-72 md:w-96 md:h-96 rounded-[3rem] bg-gradient-to-br from-white/40 to-white/10 dark:from-white/10 dark:to-transparent backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl flex items-center justify-center relative group animate-float">
                                <div className={cn("absolute inset-0 rounded-[3rem] bg-gradient-to-br opacity-30 blur-3xl transition-opacity group-hover:opacity-50", club.color)}></div>
                                <Icon className={cn("w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl text-neutral-900 dark:text-white relative z-10", club.accentColor)} strokeWidth={1.5} />
                                
                                {/* Floating Orbs */}
                                <div className={cn("absolute top-10 left-10 w-4 h-4 rounded-full", club.accentColor.replace('text-', 'bg-'))}></div>
                                <div className={cn("absolute bottom-12 right-12 w-6 h-6 rounded-full opacity-60", club.accentColor.replace('text-', 'bg-'))}></div>
                             </div>
                        </motion.div>
                    </div>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1, duration: 1 }}
                   className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
                >
                   <div className="w-[1px] h-16 bg-gradient-to-b from-neutral-400 to-transparent dark:from-neutral-600"></div>
                </motion.div>
            </motion.section>

            {/* --- CONTENT GRID --- */}
            <section className="container mx-auto px-6 pb-32 pt-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* 1. Features Block (Large Left) */}
                    <div className="md:col-span-8 row-span-2">
                        <FadeInSection className="h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 md:p-12 flex flex-col relative overflow-hidden group shadow-sm">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold font-display mb-8">What We Do</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {club.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700/50 hover:bg-white dark:hover:bg-neutral-800 transition-colors">
                                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", `bg-${club.accentColor.split('-')[1]}-100 dark:bg-${club.accentColor.split('-')[1]}-900/20`)}>
                                                <CheckCircle2 className={cn("w-5 h-5", club.accentColor)} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">Feature {i + 1}</h3>
                                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{feature}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-10">
                                    <p className="text-neutral-500 dark:text-neutral-400 italic">
                                        "{club.description} We provide a hands-on environment for students to excel."
                                    </p>
                                </div>
                            </div>
                            {/* Decor */}
                            <div className={cn("absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-5 blur-[80px] pointer-events-none", club.color)}></div>
                        </FadeInSection>
                    </div>

                    {/* 2. Next Event Block (Right Top) */}
                    <div className="md:col-span-4">
                        <FadeInSection delay={0.2} className="h-full min-h-[300px] bg-neutral-900 dark:bg-white text-white dark:text-black rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-lg">
                             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                             <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500", club.color)}></div>
                             
                             <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-3 py-1 rounded-full bg-white/20 dark:bg-black/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                                        Upcoming
                                    </div>
                                    <Calendar className="w-6 h-6 opacity-50" />
                                </div>
                                <h3 className="text-3xl font-bold font-display leading-tight mb-2">{club.nextEvent.title}</h3>
                                <p className="text-white/70 dark:text-black/70 font-medium">{club.nextEvent.type}</p>
                             </div>

                             <div className="relative z-10 pt-8 border-t border-white/20 dark:border-black/10 mt-auto">
                                <div className="text-2xl font-bold mb-1">{club.nextEvent.date.split('•')[0]}</div>
                                <div className="text-sm opacity-70">{club.nextEvent.date.split('•')[1]}</div>
                                <div className="mt-4 flex items-center gap-2 text-sm font-bold hover:gap-4 transition-all">
                                    RSVP Now <MoveRight className="w-4 h-4" />
                                </div>
                             </div>
                        </FadeInSection>
                    </div>

                    {/* 3. Notification Toggle (Right Bottom) */}
                    <div className="md:col-span-4">
                        <FadeInSection delay={0.3} className="h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Bell className={cn("w-6 h-6", notificationsEnabled ? club.accentColor : "text-neutral-400")} />
                                    <h3 className="text-xl font-bold font-display">Get Notified</h3>
                                </div>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    Receive alerts for upcoming {club.name} workshops.
                                </p>
                            </div>
                            <button 
                                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                className={cn(
                                    "w-full py-3 rounded-xl font-bold text-sm transition-all mt-4 flex items-center justify-center gap-2",
                                    notificationsEnabled 
                                        ? `bg-${club.accentColor.split('-')[1]}-100 dark:bg-${club.accentColor.split('-')[1]}-900/30 text-${club.accentColor.split('-')[1]}-700 dark:text-${club.accentColor.split('-')[1]}-300` 
                                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                )}
                            >
                                {notificationsEnabled ? "Notifications On" : "Turn On Alerts"}
                            </button>
                        </FadeInSection>
                    </div>

                    {/* 4. Leadership Team (Full Width) */}
                    <div className="md:col-span-12 mt-6">
                        <FadeInSection delay={0.4}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-4">
                                <div>
                                    <h2 className="text-4xl font-bold font-display mb-2">Leadership</h2>
                                    <p className="text-neutral-500 dark:text-neutral-400">The core team driving {club.name} forward.</p>
                                </div>
                                <button className="hidden md:flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all mt-4 md:mt-0">
                                    View All Members <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {club.leads.map((lead, i) => (
                                    <div key={i} className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:scale-110 transition-transform">
                                                <Users className="w-8 h-8" />
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {lead.email && <a href={`mailto:${lead.email}`} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"><Mail className="w-4 h-4" /></a>}
                                                {lead.socialUrl && <a href={lead.socialUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"><ExternalLink className="w-4 h-4" /></a>}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold mb-1">{lead.name}</h3>
                                        <p className={cn("text-xs font-bold uppercase tracking-wider", club.accentColor)}>{lead.role}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeInSection>
                    </div>

                    {/* 5. Resources (Full Width / Bottom) */}
                    <div className="md:col-span-12 mt-12">
                         <div className="bg-neutral-100 dark:bg-neutral-900/50 rounded-[3rem] p-12 text-center border border-transparent dark:border-neutral-800">
                             <h2 className="text-3xl font-bold font-display mb-6">Resources & Tools</h2>
                             <div className="flex flex-wrap justify-center gap-4">
                                 {['Club Handbook', 'Mentorship Portal', 'Project Archive', 'Event Calendar', 'Budget Request'].map((r, i) => (
                                     <button key={i} className="px-6 py-3 bg-white dark:bg-neutral-800 rounded-full shadow-sm hover:shadow-md border border-neutral-200 dark:border-neutral-700 font-medium text-sm transition-all hover:scale-105 hover:border-neutral-300 dark:hover:border-neutral-500">
                                         {r}
                                     </button>
                                 ))}
                             </div>
                         </div>
                    </div>

                </div>
            </section>
        </main>
    </div>
  );
};