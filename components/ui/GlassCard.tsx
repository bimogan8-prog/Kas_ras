
import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement>, MotionProps {
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`relative bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl ${className}`}
      {...props}
    >
      {/* Lapisan Gradien Statis */}
      <div className="absolute inset-0 rounded-2xl -z-10 bg-gradient-to-br from-indigo-500/20 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};
