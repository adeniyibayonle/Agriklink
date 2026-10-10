import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'machinery', label: 'Machinery', icon: 'agriculture' },
    { id: 'farmland', label: 'Farmland', icon: 'map' },
    { id: 'farm-ledger', label: 'Farm Ledger', icon: 'account_balance_wallet' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 pb-[max(env(safe-area-inset-bottom),0.5rem)] bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_-2px_10px_rgba(0,0,0,0.04)] border-t border-[#e6eeff]">
      <div className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 transition-all rounded-lg active:scale-95 cursor-pointer ${
                isActive
                  ? 'text-[#143d31] font-bold'
                  : 'text-[#414845] hover:text-[#121c2a] font-medium'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {isActive && (
                  <span className="absolute -top-1 right-0 w-1.5 h-1.5 bg-[#fe932c] rounded-full" />
                )}
              </div>
              <span className={`text-[11px] leading-[14px] mt-0.5 tracking-tight ${isActive ? 'font-extrabold text-[#143d31]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
