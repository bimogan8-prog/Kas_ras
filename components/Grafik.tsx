
import React from 'react';
import { motion } from 'framer-motion';
import { Chart, ChartDataPoint } from './Chart';
import { GlassCard } from './ui/GlassCard';
import { formatIDR } from '../utils/formatters';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';

interface GrafikProps {
  monthlyIncome: number;
  monthlyExpense: number;
  yearlyChartData: ChartDataPoint[];
}

const MetricCard: React.FC<{ title: string; amount: number; icon: React.ReactElement<{ className?: string }>; colorClass: string; }> = 
({ title, amount, icon, colorClass }) => {
  return (
    <GlassCard className="p-4 flex items-center gap-4">
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}/20`}>
        {React.cloneElement(icon, { className: `w-5 h-5 ${colorClass}` })}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="font-semibold text-xl tracking-tight">
          {formatIDR(amount)}
        </p>
      </div>
    </GlassCard>
  );
};

export const Grafik: React.FC<GrafikProps> = ({ monthlyIncome, monthlyExpense, yearlyChartData }) => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Analitik Tahunan</h1>
      <p className="text-gray-400 mb-6">Visualisasi pemasukan dan pengeluaran per bulan.</p>

      <Chart data={yearlyChartData} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <MetricCard 
            title="Pemasukan Bulan Ini"
            amount={monthlyIncome}
            icon={<ArrowUpIcon />}
            colorClass="text-green-400"
        />
        <MetricCard 
            title="Pengeluaran Bulan Ini"
            amount={monthlyExpense}
            icon={<ArrowDownIcon />}
            colorClass="text-red-400"
        />
      </div>
    </motion.div>
  );
};
