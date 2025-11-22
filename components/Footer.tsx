import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 pt-8 pb-6 overflow-hidden transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 font-bold text-xl tracking-tighter font-display">
              <div className="w-7 h-7 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-neutral-900 shadow-lg">
                 <span className="font-display font-black text-base">N</span>
              </div>
              <span className="text-neutral-900 dark:text-white">EDC Nexus</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs text-xs">
              We empower dreamers to become doers through mentorship, funding, and community.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  className="w-7 h-7 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-900 hover:border-neutral-900 hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-black transition-all duration-300"
                >
                  <social.icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="font-bold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">Clubs</h4>
            <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              {['Marketing', 'Startup', 'Consulting', 'Finance'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 group">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              {['Events', 'Mentorship', 'Incubation', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="font-bold text-neutral-900 dark:text-white mb-3 text-xs uppercase tracking-wider">Stay Updated</h4>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg py-2 pl-9 pr-4 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all"
                />
              </div>
              <button className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-xs shadow-sm">
                Subscribe <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-neutral-500 dark:text-neutral-500">
          <p>&copy; {new Date().getFullYear()} EDC Nexus.</p>
          
          <div className="flex items-center gap-4">
             <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};