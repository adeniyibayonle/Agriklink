import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/mockData';
import { TabType } from '../types';

interface HomeScreenProps {
  onNavigate: (tab: TabType) => void;
  onOpenAddExpense: () => void;
  onCallOperator: (name: string, phone: string) => void;
  onOpenNotifications: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenAddExpense,
  onCallOperator,
  onOpenNotifications,
}) => {
  const [activeCommodityFilter, setActiveCommodityFilter] = useState<'maize' | 'cassava' | 'soybean'>('maize');

  const commodityData = {
    maize: { name: 'Dry White Maize (100kg bag)', price: '₦48,000', change: '+4.2% this wk', bars: [40, 50, 65, 75, 90] },
    cassava: { name: 'High-Starch Cassava (Ton)', price: '₦62,000', change: '+2.8% this wk', bars: [50, 55, 60, 70, 82] },
    soybean: { name: 'TGX-1448E Soybean (50kg)', price: '₦39,500', change: '+5.1% this wk', bars: [45, 48, 62, 78, 95] },
  };

  const currentCommodity = commodityData[activeCommodityFilter];

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 animate-in fade-in duration-200">
      {/* Farmer Sub-Header & Cluster Status */}
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#904d00] font-bold tracking-wider uppercase">
              Cluster Member
            </p>
            <h1 className="text-[24px] text-[#00271d] tracking-tight font-extrabold leading-tight">
              E kaaro, Adebayo!
            </h1>
          </div>
          <button
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full bg-[#dee9fc] hover:bg-[#d0dbed] transition-colors flex items-center justify-center text-[#143d31] relative active:scale-95 cursor-pointer shadow-sm"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[24px]">notifications_none</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
          </button>
        </div>

        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 bg-[#c1ecda] text-[#002118] rounded-full shadow-sm">
          <span
            className="material-symbols-outlined text-[15px] text-[#005321]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide">
            Verified Maize Producer • 1.5 Ha Active
          </span>
        </div>
      </div>

      {/* Weather & Agronomy Window Card */}
      <div className="relative overflow-hidden bg-[#143d31] text-white rounded-2xl p-4 shadow-md">
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white">
              <span className="material-symbols-outlined text-[16px] text-[#6bff8f]">
                water_drop
              </span>
              <span className="text-[11px] uppercase font-extrabold tracking-wider">
                Field Meteorology
              </span>
            </div>
            <span className="text-[11px] text-[#7ea898] font-semibold">
              Updated 24m ago
            </span>
          </div>

          <div className="mt-1">
            <h2 className="text-[18px] text-white font-bold leading-snug">
              Egbeda Rainfall Window: 4 days until optimal ploughing rains.
            </h2>
            <p className="text-[13px] text-[#7ea898] mt-1 leading-normal">
              Field cluster moisture index at 68% saturation. Prepare disc harrows before ground hardens.
            </p>
          </div>

          <div className="mt-3 pt-2.5 flex items-center justify-between bg-[#00271d]/60 -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb77d] text-[18px]">
                calendar_month
              </span>
              <span className="text-[12px] text-white font-medium">
                Planting Target: 12–16 May
              </span>
            </div>
            <button
              onClick={() => onNavigate('machinery')}
              className="text-[12px] text-[#6bff8f] font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              Optimal <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Quick Actions 2x2 Grid */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#121c2a] uppercase tracking-wide font-bold">
            Essential Actions
          </span>
          <span className="text-[11px] text-[#904d00] font-bold">4 Available</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* 1. Book Tractor */}
          <button
            onClick={() => onNavigate('machinery')}
            className="flex flex-col justify-between p-4 bg-[#fe932c] text-[#663500] rounded-2xl shadow-sm text-left active:scale-[0.98] transition-transform min-h-[148px] hover:shadow-md cursor-pointer group"
            type="button"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-[#663500] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">agriculture</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
            </div>
            <div>
              <span className="text-[18px] leading-tight block font-extrabold text-[#663500]">
                Book Tractor
              </span>
              <span className="text-[13px] text-[#663500]/90 mt-1 block leading-tight font-medium">
                3 tractors active near Egbeda
              </span>
            </div>
          </button>

          {/* 2. Find Farmland */}
          <button
            onClick={() => onNavigate('farmland')}
            className="flex flex-col justify-between p-4 bg-[#eff4ff] text-[#121c2a] rounded-2xl shadow-sm text-left active:scale-[0.98] transition-transform min-h-[148px] hover:shadow-md cursor-pointer border border-[#dee9fc] group"
            type="button"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-[#dee9fc] flex items-center justify-center text-[#143d31] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">terrain</span>
              </div>
              <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-[#e6eeff] text-[#00271d]">
                NEW
              </span>
            </div>
            <div>
              <span className="text-[18px] leading-tight block font-bold text-[#00271d]">
                Find Farmland
              </span>
              <span className="text-[13px] text-[#414845] mt-1 block leading-tight">
                4 verified plots available
              </span>
            </div>
          </button>

          {/* 3. Record Expense */}
          <button
            onClick={onOpenAddExpense}
            className="flex flex-col justify-between p-4 bg-[#eff4ff] text-[#121c2a] rounded-2xl shadow-sm text-left active:scale-[0.98] transition-transform min-h-[148px] hover:shadow-md cursor-pointer border border-[#dee9fc] group"
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-[#dee9fc] flex items-center justify-center text-[#143d31] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">receipt_long</span>
            </div>
            <div>
              <span className="text-[18px] leading-tight block font-bold text-[#00271d]">
                Record Expense
              </span>
              <span className="text-[13px] text-[#414845] mt-1 block leading-tight">
                Log seed &amp; fuel receipts
              </span>
            </div>
          </button>

          {/* 4. Apply for Credit */}
          <button
            onClick={() => onNavigate('farm-ledger')}
            className="flex flex-col justify-between p-4 bg-[#eff4ff] text-[#121c2a] rounded-2xl shadow-sm text-left active:scale-[0.98] transition-transform min-h-[148px] hover:shadow-md cursor-pointer border border-[#dee9fc] group"
            type="button"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-xl bg-[#dee9fc] flex items-center justify-center text-[#143d31] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
              <span className="text-[11px] font-bold text-[#904d00] bg-[#ffdcc3]/50 px-1.5 py-0.5 rounded">
                78% READY
              </span>
            </div>
            <div>
              <span className="text-[18px] leading-tight block font-bold text-[#00271d]">
                Apply Credit
              </span>
              <span className="text-[13px] text-[#414845] mt-1 block leading-tight">
                Partner MFI readiness high
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Active Operations Card */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#121c2a] uppercase tracking-wide font-bold">
            Live Operations
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#00b853] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#00b853] animate-ping"></span>
            IN PROGRESS
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e6eeff] flex flex-col gap-3">
          {/* Title & GPS Meta */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1 text-[#904d00] font-bold">
                <span className="material-symbols-outlined text-[16px]">hardware</span>
                <span className="text-[11px] uppercase tracking-wide">Massey Ferguson 375</span>
              </div>
              <h3 className="text-[18px] text-[#00271d] font-bold mt-0.5">
                Ongoing Job: Land Harrowing
              </h3>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 bg-[#eff4ff] rounded-lg text-[#414845]">
              <span className="material-symbols-outlined text-[14px] text-[#904d00]">
                satellite_alt
              </span>
              <span className="text-[11px] font-semibold">Plot B4-North</span>
            </div>
          </div>

          {/* Stepper / Progress Bar */}
          <div className="flex flex-col gap-1.5 bg-[#eff4ff] p-3 rounded-xl border border-[#dee9fc]">
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-[#00271d] font-bold">Step 2 of 3: Harrowing underway</span>
              <span className="text-[#904d00] font-bold">1.2 / 1.5 Ha (80%)</span>
            </div>
            {/* Multi-segment visual bar */}
            <div className="w-full bg-[#d9e3f6] h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-[#00271d] h-full w-1/3"></div>
              <div className="bg-[#fe932c] h-full w-1/3 relative">
                <span className="absolute inset-0 bg-white/30 animate-pulse"></span>
              </div>
              <div className="bg-[#d9e3f6] h-full w-1/3"></div>
            </div>
            <div className="flex justify-between text-[#414845] text-[11px] mt-0.5">
              <span className="text-[#00271d] font-bold">1. Tillage (Done)</span>
              <span className="text-[#904d00] font-extrabold">2. Harrowing</span>
              <span>3. Ridging</span>
            </div>
          </div>

          {/* Operator Details & Direct Action */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                className="w-10 h-10 rounded-full object-cover shadow-inner flex-shrink-0"
                alt="Jide S."
                src={BRAND_ASSETS.jideOperator}
              />
              <div className="min-w-0 flex flex-col">
                <span className="text-[14px] font-bold text-[#00271d] truncate">
                  Jide S. (Operator)
                </span>
                <span className="text-[13px] text-[#414845] flex items-center gap-1 truncate">
                  <span
                    className="material-symbols-outlined text-[12px] text-[#fe932c]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.9 • Certified Driver
                </span>
              </div>
            </div>

            <button
              onClick={() => onCallOperator('Jide S.', '+234 803 712 9011')}
              className="h-11 px-4 rounded-xl bg-[#143d31] hover:bg-[#00271d] text-white text-[12px] font-bold flex items-center gap-1.5 active:scale-95 transition-all flex-shrink-0 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Call Operator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Egbeda Grain Market Price Ticker */}
      <div className="bg-[#eff4ff] rounded-2xl p-4 shadow-sm border border-[#dee9fc] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#904d00] text-[20px]">
              storefront
            </span>
            <span className="text-[11px] text-[#121c2a] uppercase font-extrabold tracking-wider">
              Commodity Watch
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#414845]">
            <span>Egbeda Local Exchange</span>
          </div>
        </div>

        {/* Commodity Filter Toggle */}
        <div className="flex items-center gap-2 my-1">
          {(['maize', 'cassava', 'soybean'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCommodityFilter(key)}
              className={`text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCommodityFilter === key
                  ? 'bg-[#143d31] text-white shadow-sm'
                  : 'bg-white text-[#414845] hover:bg-[#dee9fc]'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-0.5">
          <div>
            <p className="text-[14px] text-[#121c2a] font-semibold">
              {currentCommodity.name}
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-[20px] font-extrabold text-[#00271d]">
                {currentCommodity.price}
              </span>
              <span className="inline-flex items-center text-[#00b853] text-[12px] font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {currentCommodity.change}
              </span>
            </div>
          </div>

          {/* Mini Sparkline visual */}
          <div className="flex items-end gap-1 h-10 px-2 py-1 bg-white rounded-lg border border-[#d9e3f6]">
            {currentCommodity.bars.map((height, i) => (
              <div
                key={i}
                className="w-2 rounded-t-sm transition-all duration-300"
                style={{
                  height: `${height}%`,
                  backgroundColor:
                    i === currentCommodity.bars.length - 1
                      ? '#4ae176'
                      : i > 2
                      ? '#fe932c'
                      : '#c0c8c3',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cluster Field Verification Showcase */}
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-[#e6eeff]">
        <div className="h-32 w-full relative">
          <img
            className="w-full h-full object-cover"
            alt="Verified cluster fields"
            src={BRAND_ASSETS.clusterFarmlandBanner}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00271d]/90 via-[#00271d]/40 to-transparent"></div>
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md flex items-center gap-1 text-[#00271d]">
            <span
              className="material-symbols-outlined text-[14px] text-[#00b853]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              gite
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wide">
              Cluster Verification #EG-402
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#904d00] text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <h4 className="text-[14px] text-[#00271d] font-extrabold">
              OkoEgbeda Physical Title Guarantee
            </h4>
          </div>
          <p className="text-[13px] text-[#414845] leading-relaxed">
            All operators, tractor implements, and listed parcel coordinates in this cluster are physically visited, surveyed, and verified by OkoEgbeda agricultural extension officers.
          </p>
        </div>
      </div>
    </div>
  );
};
