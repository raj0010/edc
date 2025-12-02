import React from 'react';
import { Github, Twitter, Linkedin, Instagram, ArrowRight, MapPin, Mail } from 'lucide-react';
import { EDCLogo } from './ui/EDCLogo';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleNav = (page: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate?.(page);
      window.scrollTo(0,0);
  };

  return (
    <footer className="w-full bg-neutral-50 dark:bg-[#0F0F0F] border-t border-neutral-200 dark:border-white/5 pt-10 md:pt-20 pb-8 transition-colors duration-300 relative z-10 overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-300 dark:via-white/10 to-transparent opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-8 md:mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6 md:pr-10 flex flex-col items-center md:items-start text-center md:text-left">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-8 md:h-8">
                    <EDCLogo className="w-full h-full text-neutral-900 dark:text-white" />
                </div>
                <span className="text-sm font-bold font-display tracking-widest uppercase text-neutral-900 dark:text-white">EDC Nexus</span>
             </div>
             
             {/* Hidden on mobile for minimal look */}
             <p className="hidden md:block text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-sm">
                Empowering the next generation of innovators, disruptors, and leaders across the University School of Management network.
             </p>
             
             {/* Hidden on mobile */}
             <div className="hidden md:flex flex-col space-y-4 pt-2 w-full">
                <div className="flex items-start gap-3 text-sm text-neutral-500 font-medium">
                    <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                    <span>Innovation Block B,<br/>University Campus</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-500 font-medium">
                    <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>contact@edc-nexus.edu</span>
                </div>
             </div>
          </div>

          {/* Column 2: Explore - Hidden on Mobile */}
          <div className="hidden md:flex flex-col items-start w-full">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-6">Explore</h4>
            <ul className="space-y-3 w-full">
               <li><button onClick={handleNav('home')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">Home</button></li>
               <li><button onClick={handleNav('about')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">About Us</button></li>
               <li><button onClick={handleNav('clubs')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">Our Clubs</button></li>
               <li><button onClick={handleNav('events')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">Calendar</button></li>
               <li><button onClick={handleNav('news')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">News</button></li>
            </ul>
          </div>

          {/* Column 3: Newsletter & Socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="hidden md:block text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-6">Stay Connected</h4>
            <p className="hidden md:block text-neutral-500 dark:text-neutral-400 text-sm mb-4 leading-relaxed max-w-xs">
               Join our newsletter for the latest hackathons, speaker sessions, and funding opportunities.
            </p>
            
            {/* Newsletter Input */}
            <div className="flex gap-2 mb-6 md:mb-8 w-full max-w-sm">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-neutral-500 placeholder-neutral-400 dark:text-white transition-all shadow-sm"
                />
                <button className="p-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl hover:opacity-90 transition-opacity shadow-lg shrink-0">
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
                <SocialLink icon={Twitter} href="#" label="Twitter" />
                <SocialLink icon={Github} href="#" label="GitHub" />
                <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                <SocialLink icon={Instagram} href="#" label="Instagram" />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-white/5 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider text-center md:text-left">
                © 2024 Entrepreneur Development Cell.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
                <button onClick={handleNav('privacy')} className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</button>
                <button onClick={handleNav('terms')} className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</button>
            </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon: Icon, href, label }: { icon: any, href: string, label: string }) => (
    <a 
        href={href} 
        aria-label={label}
        className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all duration-200 hover:scale-110 hover:border-neutral-300 dark:hover:border-neutral-700"
    >
        <Icon className="w-5 h-5 md:w-4 md:h-4" />
    </a>
);