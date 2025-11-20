import { cn } from "../../lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  delay = 0,
  showCursor = true,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  delay?: number;
  showCursor?: boolean;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.05,
          delay: stagger(0.1, { startDelay: delay }),
          ease: "easeOut",
        }
      );
    }
  }, [isInView, delay, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.split("").map((char, index) => (
                <motion.span
                  initial={{
                    opacity: 0,
                  }}
                  key={`char-${index}`}
                  className={cn(
                    `opacity-0 hidden`,
                    word.className
                  )}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Add space unless it's the last word */}
              {idx < words.length - 1 && <span>&nbsp;</span>}
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "font-bold text-center flex items-center justify-center",
        className
      )}
    >
      {renderWords()}
      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: delay,
          }}
          className={cn(
            "inline-block rounded-sm w-[4px] h-8 md:h-14 lg:h-20 bg-neutral-900 dark:bg-white ml-1 align-middle",
            cursorClassName
          )}
        ></motion.span>
      )}
    </div>
  );
};
