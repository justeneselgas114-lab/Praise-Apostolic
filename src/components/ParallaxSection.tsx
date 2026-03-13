import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../lib/utils';

interface ParallaxSectionProps {
  image: string;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  heightClassName?: string;
  parallaxSpeed?: number;
}

export default function ParallaxSection({ 
  image, 
  children, 
  className, 
  overlayClassName = "bg-pap-primary/60", 
  heightClassName = "min-h-[60vh]",
  parallaxSpeed = 0.3
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Calculate the movement. 
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${parallaxSpeed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={ref} 
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        heightClassName,
        className
      )}
    >
      <motion.div 
        style={{ y, scale }} 
        className="absolute inset-0 z-0 h-[150%] -top-[25%]"
      >
        <img 
          src={image} 
          alt="" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className={cn("absolute inset-0", overlayClassName)} />
      </motion.div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}
