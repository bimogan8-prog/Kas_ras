import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  gradientClass?: string;
}

// FIX: Changed component from React.FC to a plain function component.
// This resolves a TypeScript error where framer-motion's extended `children` prop type
// (which can include MotionValues) conflicts with the more restrictive `React.ReactNode`
// type enforced by `React.FC`.
export const GlassCard = ({ children, className, gradientClass, ...props }: GlassCardProps) => {
  const defaultGradient = "from-indigo-500/20";
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`relative bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl ${className}`}
      {...props}
    >
      {/* Lapisan Gradien yang dapat disesuaikan */}
      <div className={`absolute inset-0 rounded-2xl -z-10 bg-gradient-to-br via-transparent to-transparent opacity-50 pointer-events-none ${gradientClass || defaultGradient}`} />
      
      {/* FIX: The wrapper for children must also be a motion component.
          A standard `div` cannot render `MotionValue` children, which are part of
          framer-motion's extended prop types and cause a type error. */}
      <motion.div className="relative">
        {children}
      </motion.div>
    </motion.div>
  );
};
