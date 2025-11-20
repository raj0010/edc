import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white font-display transition-colors">EDC Nexus</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-2 transition-colors">Empowering Student Entrepreneurs since 2010.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 dark:border-neutral-900 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 dark:text-neutral-600 transition-colors">
          <p>&copy; {new Date().getFullYear()} EDC Nexus. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-400">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};