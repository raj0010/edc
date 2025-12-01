import React, { useRef } from 'react';
import { Github, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { EDCLogo } from './ui/EDCLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-white/5 bg-white dark:bg-black py-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                    <EDCLogo className="w-10 h-10 text-neutral-900 dark:text-white" />
                    <span className="text-xl font-bold font-display tracking-tight text-neutral-900 dark:text-white">EDC</span>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-sm">
                    The official Entrepreneur Development Cell of the University School of Management. Fostering the next generation of leaders across 5 campuses.
                </p>
            </div>

            {/* Links */}
            <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-6">Explore</h4>
                <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Marketing Club</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Startup Club</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Consulting Club</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Finance Club</a></li>
                </ul>
            </div>

            {/* Legal */}
            <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-6">University</h4>
                <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Student Council</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Campus Map</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Academic Calendar</a></li>
                    <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                </ul>
            </div>
        </div>

        <div className="pt-8 border-t border-neutral-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 font-medium tracking-wide uppercase">
                © 2024 University School of Management.
            </p>

            <div className="flex items-center gap-6">
                <SocialLink icon={Twitter} href="#" label="Twitter" />
                <SocialLink icon={Github} href="#" label="GitHub" />
                <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                <SocialLink icon={Instagram} href="#" label="Instagram" />
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
        className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
    >
        <Icon className="w-4 h-4" />
    </a>
);
