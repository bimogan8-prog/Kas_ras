
import React from 'react';
import { formatIDR } from '../utils/formatters';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';

interface DashboardProps {
  totalBalance: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ totalBalance }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
    >
      <GlassCard className="md:col-span-2 p-4 md:p-6">
        <p className="text-sm text-gray-400">Total Saldo Saat Ini</p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight mt-1">
          {formatIDR(totalBalance)}
        </p>
      </GlassCard>
      <GlassCard className="p-4 md:p-6">
        <p className="text-sm text-gray-400">Pemasukan Bulan Ini</p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-green-400 tracking-tight mt-1">
          {formatIDR(3000000)}
        </p>
      </GlassCard>
      
    </motion.div>
  );
};
