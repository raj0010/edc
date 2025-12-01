
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { EDCLogo } from '../../components/ui/EDCLogo';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'nexus2024') {
      onLogin(password);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-[#050505] p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12">
            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-neutral-900 dark:text-white" />
                </div>
                <h2 className="text-2xl font-black font-display text-neutral-900 dark:text-white tracking-tight">Admin Access</h2>
                <p className="text-center text-neutral-500 dark:text-neutral-400 mt-2 text-sm">
                    Enter your credentials to access the Admin Control Center.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 ml-1">Secure Key</label>
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-neutral-100 dark:bg-neutral-950 border ${error ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'} rounded-xl px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all`}
                            placeholder="••••••••"
                            autoFocus
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Lock className="w-4 h-4 text-neutral-400" />
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs font-bold ml-1 animate-pulse">Access Denied: Invalid Key</p>
                    )}
                </div>

                <button 
                    type="submit"
                    className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
                >
                    Authenticate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                    Authorized Personnel Only
                </p>
            </div>
        </div>
      </motion.div>
    </div>
  );
};
