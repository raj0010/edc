import React from 'react';
import { PageHeader } from '../ui/PageHeader';

interface LegalPageProps {
    type: 'privacy' | 'terms' | 'cookies';
}

const contentMap = {
    privacy: {
        title: "Privacy Policy",
        updated: "October 10, 2024",
        body: "Your privacy is important to us. This policy outlines how EDC Nexus collects, uses, and protects your personal information..."
    },
    terms: {
        title: "Terms of Service",
        updated: "September 01, 2024",
        body: "By accessing the EDC Nexus platform, you agree to comply with these terms. Usage of our resources is a privilege..."
    },
    cookies: {
        title: "Cookie Policy",
        updated: "August 20, 2024",
        body: "We use cookies to enhance your experience. This includes essential cookies for authentication and analytics cookies to improve our services..."
    }
};

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
    const content = contentMap[type];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0F0F0F]">
      <PageHeader title={content.title} subtitle={`Last Updated: ${content.updated}`} />
      
      <div className="container mx-auto px-6 pb-24">
         <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 max-w-4xl">
             <div className="prose dark:prose-invert max-w-none">
                 <p className="lead text-xl text-neutral-600 dark:text-neutral-300">{content.body}</p>
                 
                 <h3 className="text-xl font-bold mt-8 mb-4 text-neutral-900 dark:text-white">1. Introduction</h3>
                 <p className="text-neutral-500 dark:text-neutral-400">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                 </p>

                 <h3 className="text-xl font-bold mt-8 mb-4 text-neutral-900 dark:text-white">2. Usage Rights</h3>
                 <p className="text-neutral-500 dark:text-neutral-400">
                     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                 </p>

                 <h3 className="text-xl font-bold mt-8 mb-4 text-neutral-900 dark:text-white">3. User Responsibilities</h3>
                 <p className="text-neutral-500 dark:text-neutral-400">
                     Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                 </p>
             </div>
         </div>
      </div>
    </div>
  );
};