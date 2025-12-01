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
    <footer className="w-full bg-neutral-50 dark:bg-[#0F0F0F] border-t border-neutral-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-300 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-6">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8">
                    <EDCLogo className="w-full h-full text-neutral-900 dark:text-white" />
                </div>
                <span className="text-sm font-bold font-display tracking-widest uppercase text-neutral-900 dark:text-white">EDC Nexus</span>
             </div>
             <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">
                Empowering the next generation of innovators, disruptors, and leaders across the University School of Management network.
             </p>
             <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-neutral-500 font-medium">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                    <span>Innovation Block B, University Campus</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-500 font-medium">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <span>contact@edc-nexus.edu</span>
                </div>
             </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-6">Explore</h4>
            <ul className="space-y-3">
               <li><button onClick={handleNav('home')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">Home</button></li>
               <li><button onClick={handleNav('about')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">About Us</button></li>
               <li><button onClick={handleNav('clubs')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">Our Clubs</button></li>
               <li><button onClick={handleNav('events')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">Events Calendar</button></li>
               <li><button onClick={handleNav('news')} className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors block hover:translate-x-1 duration-200">News & Stories</button></li>
            </ul>
          </div>

          {/* Column 3: Newsletter & Socials */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-6">Stay Connected</h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 leading-relaxed">
               Join our newsletter for the latest hackathons, speaker sessions, and funding opportunities.
            </p>
            <div className="flex gap-2 mb-8">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-neutral-500 placeholder-neutral-400 dark:text-white transition-all"
                />
                <button className="p-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl hover:opacity-90 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
            <div className="flex items-center gap-4">
                <SocialLink icon={Twitter} href="#" label="Twitter" />
                <SocialLink icon={Github} href="#" label="GitHub" />
                <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                <SocialLink icon={Instagram} href="#" label="Instagram" />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider text-center md:text-left">
                © 2024 Entrepreneur Development Cell. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
                <button onClick={handleNav('privacy')} className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={handleNav('terms')} className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Terms of Service</button>
                <button onClick={handleNav('cookies')} className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">Cookies</button>
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
        className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-all duration-200"
    >
        <Icon className="w-4 h-4" />
    </a>
);