
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { XIcon } from './icons/XIcon';

interface CustomSelectProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const triggerButton = (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex items-center justify-between bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 text-white text-left focus:outline-none focus:ring-1 focus:ring-indigo-500"
    >
      <span className={selectedValue ? 'text-white' : 'text-gray-500'}>
        {selectedValue || `Pilih ${label}`}
      </span>
      <motion.div animate={{ rotate: isOpen && isDesktop ? 180 : 0 }}>
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </motion.div>
    </motion.button>
  );

  if (isDesktop) {
    return (
      <div className="relative">
        <label className="text-xs text-gray-400 mb-1 block">{label}</label>
        {triggerButton}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-20 max-h-48 overflow-y-auto"
            >
              {options.map((option) => (
                <li key={option} onClick={() => handleSelect(option)} className="px-4 py-2 text-gray-300 hover:bg-white/10 cursor-pointer">
                  {option}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">{label}</label>
      {triggerButton}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end" onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="w-full bg-slate-900 border-t border-white/10 rounded-t-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{label}</h3>
                <motion.button type="button" whileTap={{scale:0.9}} onClick={() => setIsOpen(false)} className="p-2 rounded-full -mr-2">
                  <XIcon className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>
              <ul className="max-h-[50vh] overflow-y-auto space-y-2">
                {options.map((option) => (
                  <li key={option}>
                    <button type="button" onClick={() => handleSelect(option)} className="w-full text-left px-4 py-3 rounded-lg bg-slate-800/60 hover:bg-slate-700/60">
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
