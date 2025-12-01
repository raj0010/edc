import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TypingTextProps {
  text: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorColor?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 1500,
  className,
  cursorColor = "bg-blue-500"
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const i = loopNum % text.length;
    const fullText = text[i];

    // Handle Phase Transitions
    if (!isDeleting && displayedText === fullText) {
      // Finished typing, wait then delete
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText === '') {
      // Finished deleting, move to next
      setIsDeleting(false);
      setLoopNum(prev => prev + 1);
      return;
    }

    // Handle Typing
    const timeout = setTimeout(() => {
      setDisplayedText(prev => 
        isDeleting ? prev.slice(0, -1) : fullText.slice(0, prev.length + 1)
      );
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, loopNum, text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className={cn("inline-flex items-center tracking-tight", className)}>
      <span>{displayedText}</span>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "h-[0.8em] w-[3px] sm:w-[4px] ml-1 sm:ml-2 rounded-full",
          cursorColor
        )}
      />
    </div>
  );
};