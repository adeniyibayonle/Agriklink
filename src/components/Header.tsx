import React from 'react';
import { BRAND_ASSETS } from '../data/mockData';

interface HeaderProps {
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-40 bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-[max(env(safe-area-inset-top),0.5rem)]">
      <div className="h-16 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            alt="OkoEgbeda Brand Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src={BRAND_ASSETS.logo}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[18px] text-[#00271d] font-extrabold tracking-tight leading-none truncate">
              OkoEgbeda
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[#904d00] text-[13px]">
                location_on
              </span>
              <span className="text-[11px] font-bold text-[#414845] truncate">
                Egbeda Cluster, Oyo
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onProfileClick}
            className="relative flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-[#c1ecda] transition-all cursor-pointer"
            title="View Adebayo's Profile"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={BRAND_ASSETS.adebayoProfile}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#4ae176] rounded-full flex items-center justify-center border border-white">
              <span className="material-symbols-outlined text-[#002109] text-[10px] font-bold">
                check
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
