
import React from 'react';
import { motion } from 'framer-motion';
import { HomeIcon } from './icons/HomeIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { ViewType } from '../types';

interface BottomNavBarProps {
  onAddClick: () => void;
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick }) => (
    <motion.button onClick={onClick} whileTap={{scale: 0.9}} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}>
        {icon}
        <span className="text-xs">{label}</span>
    </motion.button>
);

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ onAddClick, activeView, onNavigate }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-2">
        <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 max-w-lg mx-auto flex justify-around items-center p-2 rounded-2xl shadow-lg">
            <NavItem 
                icon={<HomeIcon className="w-6 h-6"/>} 
                label="Beranda" 
                isActive={activeView === 'dashboard'}
                onClick={() => onNavigate('dashboard')}
            />
            <motion.button whileTap={{ scale: 0.95 }} onClick={onAddClick} className="text-indigo-400 -mt-8">
                <div className="relative">
                    <div className="absolute -inset-2 bg-slate-900 rounded-full"/>
                    <PlusCircleIcon className="relative w-16 h-16" />
                </div>
            </motion.button>
            <NavItem 
                icon={<ChartBarIcon className="w-6 h-6"/>}
                label="Grafik"
                isActive={activeView === 'grafik'}
                onClick={() => onNavigate('grafik')}
            />
        </div>
    </div>
  );
};
