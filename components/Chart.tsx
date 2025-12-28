
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { formatIDR } from '../utils/formatters';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

export interface ChartDataPoint {
  label: string;
  income: number;
  expense: number;
}

interface ChartProps {
  data: ChartDataPoint[];
}

const Bar: React.FC<{ height: number; color: string; amount: number; onHover: (data: { amount: number, color: string } | null) => void }> = ({ height, color, amount, onHover }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: `${height}%`, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scaleY: 1.05, backgroundColor: `${color.slice(0, -4)}/60` }}
      onHoverStart={() => onHover({ amount, color })}
      onHoverEnd={() => onHover(null)}
      className={`w-full rounded-t-sm ${color}`}
      style={{ originY: 1 }}
    />
  );
};

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const [hoveredData, setHoveredData] = useState<{ amount: number, color: string } | null>(null);

  const { maxAmount, hasData } = useMemo(() => {
    const allAmounts = data.flatMap(d => [d.income, d.expense]);
    const max = Math.max(...allAmounts);
    return {
      maxAmount: max > 0 ? max : 1, 
      hasData: max > 0
    };
  }, [data]);
  
  if (!hasData) {
    return (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20 lg:mt-28">
            <TrendingUpIcon className="w-12 h-12 mb-4" />
            <h3 className="font-semibold text-lg">Grafik Belum Tersedia</h3>
            <p className="max-w-xs text-sm">Tidak ada data transaksi untuk ditampilkan dalam rentang waktu ini.</p>
        </div>
    )
  }

  return (
    <GlassCard className="p-4 md:p-6 mt-4">
      <div className="flex justify-between items-center mb-4 min-h-[24px]">
        <AnimatePresence>
          {hoveredData && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`font-semibold ${hoveredData.color.replace('bg', 'text').replace('-500', '-400')}`}
            >
              {formatIDR(hoveredData.amount)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-end h-64 gap-1 md:gap-1.5">
        {data.map((item) => (
          <div key={item.label} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group">
            <div className="flex w-full h-full items-end gap-0.5">
                <Bar height={(item.income / maxAmount) * 100} color="bg-green-500" amount={item.income} onHover={setHoveredData}/>
                <Bar height={(item.expense / maxAmount) * 100} color="bg-red-500" amount={item.expense} onHover={setHoveredData}/>
            </div>
            <span className="text-[10px] text-gray-500 group-hover:text-gray-300 transform-gpu">{item.label}</span>
          </div>
        ))}
      </div>
       <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-green-500" />
          <span className="text-gray-400">Pemasukan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-red-500" />
          <span className="text-gray-400">Pengeluaran</span>
        </div>
      </div>
    </GlassCard>
  );
};
