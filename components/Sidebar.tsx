
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGridIcon } from './icons/LayoutGridIcon';
import { SettingsIcon } from './icons/SettingsIcon';

const NavItem = ({ icon, label, isActive = false }: { icon: React.ReactNode; label: string, isActive?: boolean }) => (
  <motion.a
    href="#"
    whileTap={{ scale: 0.95 }}
    className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </motion.a>
);

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-950/60 backdrop-blur-xl border-r border-white/10 p-4">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white">
          O
        </div>
        <span className="ml-3 font-bold text-lg text-white">Obsidian Kas</span>
      </div>
      <nav className="flex flex-col space-y-2">
        <NavItem icon={<LayoutGridIcon className="w-5 h-5" />} label="Dashboard" isActive={true} />
        <NavItem icon={<SettingsIcon className="w-5 h-5" />} label="Pengaturan" />
      </nav>
      <div className="mt-auto text-xs text-gray-500">
        <p>&copy; 2024 Obsidian Corp.</p>
        <p>Versi 1.0.0</p>
      </div>
    </aside>
  );
};
