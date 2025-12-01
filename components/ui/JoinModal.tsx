import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown, Sparkles } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Auto close after success message
      setTimeout(() => {
        if (isOpen) onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4"
          >
            <div className="w-full max-w-md pointer-events-auto">
               <div className="bg-[#0F0F0F] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden relative ring-1 ring-white/10">
              
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white transition-colors z-20 rounded-full hover:bg-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Decorative Top Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"></div>

                <div className="relative p-8">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                      >
                        {/* Header */}
                        <div className="mb-8">
                           <div className="w-10 h-10 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-center mb-4 text-white">
                              <Sparkles className="w-5 h-5" />
                           </div>
                           <h2 className="text-2xl font-bold text-white font-display tracking-tight">Join the Cell</h2>
                           <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
                             Ready to shape the future? Apply now to become a member of the Entrepreneur Development Cell.
                           </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div className="space-y-1.5">
                            <label htmlFor="name" className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Full Name</label>
                            <div className="group relative">
                                <input
                                  type="text"
                                  id="name"
                                  required
                                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all text-sm"
                                  placeholder="John Doe"
                                />
                                <div className="absolute inset-0 rounded-xl ring-1 ring-white/0 group-hover:ring-white/10 pointer-events-none transition-all"></div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label htmlFor="email" className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="group relative">
                                <input
                                  type="email"
                                  id="email"
                                  required
                                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all text-sm"
                                  placeholder="john@college.edu"
                                />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label htmlFor="club" className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Interest</label>
                            <div className="relative group">
                              <select
                                id="club"
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all cursor-pointer text-sm"
                              >
                                <option value="marketing">Marketing Club</option>
                                <option value="startup">Startup Club</option>
                                <option value="consulting">Consulting Club</option>
                                <option value="finance">Finance Club</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none group-hover:text-neutral-300 transition-colors" />
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-neutral-200 transition-all transform active:scale-[0.98] mt-2 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-white/5 relative overflow-hidden group/btn"
                          >
                             <span className="relative z-10 flex items-center gap-2">
                                {isLoading ? (
                                    <>
                                       <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                       <span>Processing...</span>
                                    </>
                                ) : (
                                    "Submit Application"
                                )}
                             </span>
                             {/* Button shine effect */}
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"></div>
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <motion.div 
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", duration: 0.8 }}
                          className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 relative"
                        >
                           <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>
                           <Check className="w-10 h-10 text-emerald-500 relative z-10" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-display">Welcome Aboard!</h3>
                        <p className="text-neutral-400 text-sm max-w-xs mx-auto leading-relaxed">
                          Your application has been received. We'll be in touch shortly with next steps.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};