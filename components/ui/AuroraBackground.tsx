import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  showRadialGradient?: boolean;
  className?: string;
  children?: ReactNode;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col w-full min-h-screen bg-neutral-50 dark:bg-[#0F0F0F] text-neutral-900 dark:text-white transition-colors duration-300",
        className
      )}
      {...props}
    >
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-neutral-50 dark:bg-[#0F0F0F] transition-colors duration-300"></div>
        
        {/* Optimized Animated Gradients */}
        {showRadialGradient && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[80px] animate-blob mix-blend-multiply dark:mix-blend-screen will-change-transform [animation-duration:20s]"></div>
            <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[80px] animate-blob mix-blend-multiply dark:mix-blend-screen will-change-transform [animation-duration:20s]" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-emerald-400/20 dark:bg-emerald-600/10 rounded-full blur-[80px] animate-blob mix-blend-multiply dark:mix-blend-screen will-change-transform [animation-duration:20s]" style={{ animationDelay: '4s' }}></div>
          </>
        )}
        
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col">
          {children}
      </div>
    </div>
  );
};