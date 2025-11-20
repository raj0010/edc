import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { cn } from "../../lib/utils";

interface VelocityScrollProps {
  text: string;
  default_velocity?: number;
  className?: string;
}

interface ParallaxProps {
  children?: React.ReactNode;
  baseVelocity: number;
  className?: string;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap leading-[0.8]">
      <motion.div 
        className={cn("scroller font-display font-black uppercase text-6xl md:text-8xl lg:text-9xl tracking-tighter flex whitespace-nowrap flex-nowrap text-transparent bg-clip-text bg-gradient-to-b from-neutral-500 to-neutral-800 select-none", className)} 
        style={{ x }}
      >
        <span className="block mr-12 md:mr-24">{children} </span>
        <span className="block mr-12 md:mr-24">{children} </span>
        <span className="block mr-12 md:mr-24">{children} </span>
        <span className="block mr-12 md:mr-24">{children} </span>
      </motion.div>
    </div>
  );
}

export const VelocityScroll: React.FC<VelocityScrollProps> = ({ text, default_velocity = 5, className }) => {
  return (
    <section className="relative w-full py-16 bg-black border-y border-neutral-900 overflow-hidden flex flex-col gap-8">
      <ParallaxText baseVelocity={default_velocity} className={className}>{text}</ParallaxText>
      <ParallaxText baseVelocity={-default_velocity} className={className}>{text}</ParallaxText>
      
      {/* Vignette Overlay for cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-10"></div>
    </section>
  );
};