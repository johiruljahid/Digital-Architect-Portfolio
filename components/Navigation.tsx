
import React from 'react';
import { Section, NavItem } from '../types';
import { NAV_ITEMS } from '../constants';

interface NavigationProps {
  onSelect: (section: Section) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-16 px-4">
      {NAV_ITEMS.map((item) => (
        <div key={item.id} className="flex flex-col items-center group cursor-pointer" onClick={() => onSelect(item.id)}>
          <div className="relative">
            {/* Glossy Button Style */}
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl shadow-2xl glass-card transform transition-transform duration-300 group-hover:scale-110 group-active:scale-95 z-10 overflow-hidden`}>
              <div className={`absolute inset-0 opacity-10 bg-${item.color}-500 group-hover:opacity-20 transition-opacity`} />
              <span className="relative drop-shadow-lg">{item.icon}</span>
            </div>
            {/* Outer Glow */}
            <div className={`absolute -inset-2 rounded-full blur-xl opacity-0 group-hover:opacity-30 bg-${item.color}-400 transition-opacity`} />
          </div>
          
          <button className="mt-4 px-6 py-2 rounded-xl glass-bg border border-white/80 shadow-sm overflow-hidden relative group">
            <div className={`absolute inset-0 bg-${item.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity`} />
            <span className={`relative text-xs font-black tracking-[0.2em] text-gray-800 group-hover:text-${item.color}-600`}>
              {item.label}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};
