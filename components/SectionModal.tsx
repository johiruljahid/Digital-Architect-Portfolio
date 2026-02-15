
import React from 'react';

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleColor: string;
  children: React.ReactNode;
}

export const SectionModal: React.FC<SectionModalProps> = ({ isOpen, onClose, title, titleColor, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/20 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative w-full max-w-5xl glass-card rounded-[2.5rem] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 md:p-12 overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-12 rounded-full ${titleColor}`} />
              <h2 className={`text-5xl md:text-6xl font-black tracking-tight ${titleColor.replace('bg-', 'text-')}`}>
                {title}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-3 rounded-full bg-white/50 hover:bg-white/80 transition-colors shadow-sm"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
