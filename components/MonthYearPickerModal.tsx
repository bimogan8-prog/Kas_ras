
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { getMonthName } from '../utils/formatters';

interface MonthYearPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (month: number, year: number) => void;
}

const months = Array.from({ length: 12 }, (_, i) => i);

export const MonthYearPickerModal: React.FC<MonthYearPickerModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSelect = (month: number) => {
    onSelect(month, year);
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center" onClick={onClose}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="w-full max-w-lg bg-slate-900/80 backdrop-blur-2xl border-t border-white/10 rounded-t-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between mb-4">
            <motion.button whileTap={{scale: 0.9}} onClick={() => setYear(y => y - 1)} className="p-2 rounded-full hover:bg-white/10"><ChevronLeftIcon className="w-5 h-5"/></motion.button>
            <span className="font-semibold text-lg text-center">{year}</span>
            <motion.button whileTap={{scale: 0.9}} onClick={() => setYear(y => y + 1)} className="p-2 rounded-full hover:bg-white/10"><ChevronRightIcon className="w-5 h-5"/></motion.button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {months.map(month => (
              <motion.button
                key={month}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(month)}
                className="py-4 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-sm font-medium"
              >
                {getMonthName(month)}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
