import React from 'react';
import { formatIDR } from '../utils/formatters';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { WalletIcon } from './icons/WalletIcon';

interface DashboardProps {
  totalBalance: number;
}

// FIX: Updated the `icon` prop type to explicitly include `className`. This helps TypeScript
// correctly infer the props for `React.cloneElement` and resolves the type error.
const StatCard: React.FC<{ title: string; amount: number; icon: React.ReactElement<{ className?: string }>; colorClass: string; gradientClass: string; }> = 
({ title, amount, icon, colorClass, gradientClass }) => {
  return (
    <GlassCard 
      className="p-4 md:p-6 flex items-center gap-4"
      gradientClass={gradientClass}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}/20`}>
        {React.cloneElement(icon, { className: `w-6 h-6 ${colorClass}` })}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="font-semibold tracking-tight text-2xl md:text-3xl">
          {formatIDR(amount)}
        </p>
      </div>
    </GlassCard>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ totalBalance }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StatCard 
        title="Total Saldo Saat Ini"
        amount={totalBalance}
        icon={<WalletIcon />}
        colorClass="text-cyan-400"
        gradientClass="from-cyan-500/20"
      />
    </motion.div>
  );
};
