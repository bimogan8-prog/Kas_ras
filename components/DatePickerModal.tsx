
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  initialDate: Date;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({ isOpen, onClose, onSelectDate, initialDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const daysInMonth = useMemo(() => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const days = [];
    while (date.getMonth() === currentDate.getMonth()) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentDate]);

  const firstDayOfMonth = useMemo(() => {
    const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday as first day of week
  }, [currentDate]);

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const header = currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const weekDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  const calendarView = (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex items-center justify-between mb-4">
        <motion.button whileTap={{scale: 0.9}} onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-white/10"><ChevronLeftIcon className="w-5 h-5"/></motion.button>
        <span className="font-semibold text-center">{header}</span>
        <motion.button whileTap={{scale: 0.9}} onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-white/10"><ChevronRightIcon className="w-5 h-5"/></motion.button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
        {weekDays.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
        {daysInMonth.map(day => {
          const isSelected = day.toDateString() === initialDate.toDateString();
          return (
            <motion.button
              key={day.toString()}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelectDate(day)}
              className={`w-full aspect-square rounded-full text-sm flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-500 text-white font-semibold' : 'hover:bg-slate-700/60'}`}
            >
              {day.getDate()}
            </motion.button>
          );
        })}
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard className="p-4">
            {calendarView}
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-end" onClick={onClose}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="w-full bg-slate-900 border-t border-white/10 rounded-t-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />
        {calendarView}
      </motion.div>
    </div>
  );
};
