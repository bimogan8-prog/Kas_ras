
import React from 'react';
import { motion } from 'framer-motion';
import { FilterType } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { XIcon } from './icons/XIcon';
import { getMonthName } from '../utils/formatters';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onDateFilterClick: () => void;
  activeDateFilter: { month: number; year: number } | null;
  clearDateFilter: () => void;
}

const filters: FilterType[] = ['Semua', 'Debit', 'Kredit'];

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  onDateFilterClick,
  activeDateFilter,
  clearDateFilter
}) => {
  return (
    <div className="sticky top-0 z-30 py-4 bg-slate-900/80 backdrop-blur-xl">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter)}
            className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              activeFilter === filter ? 'text-white' : 'text-gray-400'
            }`}
          >
            {activeFilter === filter && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{filter}</span>
          </motion.button>
        ))}

        <div className="flex-grow" />

        {activeDateFilter ? (
            <div className="relative flex items-center bg-indigo-500/20 text-indigo-300 px-3 py-2 text-sm font-medium rounded-full whitespace-nowrap">
                <span>{getMonthName(activeDateFilter.month)} {activeDateFilter.year}</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={clearDateFilter} className="ml-2 -mr-1 p-1 rounded-full hover:bg-white/10">
                    <XIcon className="w-3 h-3" />
                </motion.button>
            </div>
        ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onDateFilterClick}
              className="p-2.5 rounded-full bg-white/10 text-gray-300"
              aria-label="Filter Tanggal"
            >
              <CalendarIcon className="w-4 h-4" />
            </motion.button>
        )}
      </div>
    </div>
  );
};
