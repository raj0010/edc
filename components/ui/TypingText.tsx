import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TypingTextProps {
  text: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  repeat?: boolean;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  className,
  textColors,
  variableSpeed,
  repeat = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const currentColor = textColors ? textColors[loopNum % textColors.length] : undefined;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const i = loopNum % text.length;
    const fullText = text[i];

    let delta = typingSpeed;
    if (variableSpeed && !isDeleting) {
      delta = Math.floor(Math.random() * (variableSpeed.max - variableSpeed.min + 1)) + variableSpeed.min;
    }
    if (isDeleting) delta = deletingSpeed;

    const handleTyping = () => {
      setDisplayedText((current) => {
        if (isDeleting) {
          return fullText.substring(0, current.length - 1);
        } else {
          return fullText.substring(0, current.length + 1);
        }
      });
    };

    // Determine logic based on current state
    if (!isDeleting && displayedText === fullText) {
      if (!repeat && loopNum === text.length - 1) return;
      // Finished typing, pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayedText === '') {
      // Finished deleting, move to next text
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setLoopNum((l) => l + 1);
      }, 200); 
    } else {
      // Continue typing or deleting
      timeout = setTimeout(handleTyping, delta);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, loopNum, text, typingSpeed, deletingSpeed, pauseDuration, variableSpeed, repeat]);

  return (
    <span 
      className={cn("inline-flex items-center", className)} 
      style={{ color: currentColor, transition: 'color 0.3s ease' }}
    >
      {displayedText}
      {showCursor && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className={cn("ml-1 font-light text-current", className)}
        >
          {cursorCharacter}
        </motion.span>
      )}
    </span>
  );
};