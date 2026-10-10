import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/mockData';
import { LedgerEntry } from '../types';

interface FarmLedgerScreenProps {
  entries: LedgerEntry[];
  onAddEntry: (entry: Omit<LedgerEntry, 'id'>) => void;
  onOpenDossier: () => void;
  onOpenAddModal: () => void;
}

export const FarmLedgerScreen: React.FC<FarmLedgerScreenProps> = ({
  entries,
  onOpenDossier,
  onOpenAddModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'outflow' | 'inflow'>('all');

  // Compute live totals
  const totalOutflow = entries
    .filter((e) => e.type === 'outflow')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalInflow = entries
    .filter((e) => e.type === 'inflow')
    .reduce((sum, item) => sum + item.amount, 0);

  // Filter entries
  const filteredEntries = entries.filter((e) => {
    if (selectedFilter === 'all') return true;
    return e.type === selectedFilter;
  });

  // Calculate composition breakdown
  const tractorOutflow = entries
    .filter((e) => e.type === 'outflow' && e.category === 'Tractor')
    .reduce((sum, item) => sum + item.amount, 0);
  const seedsOutflow = entries
    .filter((e) => e.type === 'outflow' && e.category === 'Seeds')
    .reduce((sum, item) => sum + item.amount, 0);
  const fertOrOtherOutflow = Math.max(0, totalOutflow - tractorOutflow - seedsOutflow);

  const tractorPct = totalOutflow > 0 ? (tractorOutflow / totalOutflow) * 100 : 36.8;
  const seedsPct = totalOutflow > 0 ? (seedsOutflow / totalOutflow) * 100 : 21.1;
  const fertPct = totalOutflow > 0 ? (fertOrOtherOutflow / totalOutflow) * 100 : 42.1;

  return (
    <div className="flex flex-col w-full pb-24 animate-in fade-in duration-200">
      <div className="px-4 pt-2 flex flex-col gap-4">
        {/* Profile & Credit-Readiness Header Card */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#dee9fc] flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#ffdcc3]/30 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Profile Row */}
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  className="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white"
                  alt="Adebayo Adeleke"
                  src={BRAND_ASSETS.adebayoLarge}
                />
                <span className="absolute -bottom-1 -right-1 bg-[#4ae176] text-[#002109] rounded-full p-0.5 flex items-center justify-center border border-white">
                  <span className="material-symbols-outlined text-[14px] font-bold">verified</span>
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <h1 className="text-[18px] font-extrabold text-[#121c2a] truncate">
                    Adebayo Adeleke
                  </h1>
                </div>
                <span className="text-[12px] text-[#414845] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[15px] text-[#904d00]">eco</span>
                  Egbeda South Cluster • Maize &amp; Cassava
                </span>
              </div>
            </div>

            <button
              onClick={onOpenDossier}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#dee9fc] text-[#00271d] hover:bg-[#00271d] hover:text-white transition-all active:scale-95 cursor-pointer shadow-sm"
              title="Share Credit Dossier"
            >
              <span className="material-symbols-outlined text-[20px]">ios_share</span>
            </button>
          </div>

          {/* Credit Readiness Score Meter Card */}
          <div className="bg-[#143d31] text-white rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden border border-[#00271d]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ffdcc3] text-[18px]">
                  verified_user
                </span>
                <span className="text-[11px] text-[#dee9fc] tracking-wider uppercase font-extrabold">
                  Credit Readiness Score
                </span>
              </div>
              <span className="bg-white/15 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                Tier-2 Verified
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[28px] text-white font-extrabold leading-none">78</span>
              <span className="text-[16px] text-[#7ea898] font-bold">/ 100</span>
              <span className="text-[11px] text-[#6bff8f] font-bold ml-auto flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> Top 12% in Cluster
              </span>
            </div>

            {/* Visual Progress Bar Meter */}
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden flex my-1">
              <div
                className="bg-gradient-to-r from-[#ffdcc3] via-[#6bff8f] to-[#4ae176] h-full rounded-full transition-all duration-700"
                style={{ width: '78%' }}
              ></div>
            </div>

            <p className="text-[12px] text-[#eff4ff] pt-0.5 leading-snug">
              Eligible for Partner Input Financing &amp; Mechanisation Pre-approval.
            </p>
          </div>

          {/* Financial Partner Trust Badges */}
          <div className="flex flex-col gap-1.5 pt-0.5">
            <span className="text-[11px] text-[#414845] font-extrabold uppercase tracking-wider">
              Accepted by Lending Partners
            </span>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-[#dee9fc] px-3 py-1 rounded-full text-[#121c2a] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[#904d00] text-[16px]">account_balance</span>
                <span>LAPO Microfinance</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#dee9fc] px-3 py-1 rounded-full text-[#121c2a] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[#004018] text-[16px]">groups</span>
                <span>Egbeda Farmers Co-op</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Financial Snapshot */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-extrabold text-[#00271d]">Seasonal Snapshot</h2>
              <p className="text-[11px] text-[#414845] font-semibold">2024 Early Maize Cycle • 1.5 Hectares</p>
            </div>
            <span className="text-[11px] font-bold bg-[#dee9fc] text-[#00271d] px-2.5 py-0.5 rounded-full">
              Cycle Active
            </span>
          </div>

          {/* Outflow & Inflow Cards (Two Column) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Outflow Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee9fc] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#414845] font-semibold">Total Outflow</span>
                <span className="material-symbols-outlined text-[#904d00] text-[18px]">arrow_outward</span>
              </div>
              <div className="my-2">
                <span className="text-[20px] font-extrabold text-[#00271d] block">
                  ₦{totalOutflow.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#904d00] font-bold">100% Documented</span>
              </div>
              <div className="text-[11px] text-[#414845] leading-tight">
                Prep, Seed &amp; Nutrients
              </div>
            </div>

            {/* Inflow / Harvest Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee9fc] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#414845] font-semibold">Projected Yield</span>
                <span className="material-symbols-outlined text-[#4ae176] text-[18px]">south_west</span>
              </div>
              <div className="my-2">
                <span className="text-[20px] font-extrabold text-[#00271d] block">
                  ₦{(420000 + totalInflow).toLocaleString()}
                </span>
                <span className="text-[11px] text-[#414845] font-semibold">~8.5 tonnes</span>
              </div>
              <div className="text-[11px] text-[#414845] leading-tight">
                At current cluster gate rate
              </div>
            </div>
          </div>

          {/* Breakdown Strip */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee9fc] flex flex-col gap-2.5">
            <span className="text-[12px] text-[#121c2a] font-bold">Seasonal Outflow Composition</span>
            {/* Visual Stacked Bar */}
            <div className="h-2.5 w-full bg-[#dee9fc] rounded-full flex overflow-hidden">
              <div
                className="bg-[#00271d] h-full transition-all duration-300"
                style={{ width: `${tractorPct}%` }}
                title={`Tractor: ₦${tractorOutflow.toLocaleString()}`}
              ></div>
              <div
                className="bg-[#fe932c] h-full transition-all duration-300"
                style={{ width: `${seedsPct}%` }}
                title={`Seeds: ₦${seedsOutflow.toLocaleString()}`}
              ></div>
              <div
                className="bg-[#00280c] h-full transition-all duration-300"
                style={{ width: `${fertPct}%` }}
                title={`Fertiliser & Other: ₦${fertOrOtherOutflow.toLocaleString()}`}
              ></div>
            </div>

            {/* Legend Items */}
            <div className="grid grid-cols-3 gap-1 pt-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00271d] flex-shrink-0"></span>
                  <span className="text-[11px] text-[#414845] truncate font-medium">Tractor</span>
                </div>
                <span className="text-[12px] text-[#121c2a] font-bold">₦{tractorOutflow.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#fe932c] flex-shrink-0"></span>
                  <span className="text-[11px] text-[#414845] truncate font-medium">Seeds</span>
                </div>
                <span className="text-[12px] text-[#121c2a] font-bold">₦{seedsOutflow.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00280c] flex-shrink-0"></span>
                  <span className="text-[11px] text-[#414845] truncate font-medium">Fertiliser</span>
                </div>
                <span className="text-[12px] text-[#121c2a] font-bold">₦{fertOrOtherOutflow.toLocaleString()}</span>
              </div>
            </div>

            {/* Verified Track Record Banner */}
            <div className="mt-2 bg-[#eff4ff] rounded-xl p-2.5 flex items-center gap-2.5 border border-[#dee9fc]">
              <span className="material-symbols-outlined text-[#904d00] text-[20px] flex-shrink-0">
                history_edu
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] text-[#121c2a] font-bold truncate">
                  3 Completed Harvest Cycles Logged
                </span>
                <span className="text-[11px] text-[#414845]">
                  100% on-time equipment rental repayment record
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action CTA Cards */}
        <div className="flex flex-col gap-2.5">
          {/* Primary Transaction Dossier Button */}
          <button
            onClick={onOpenDossier}
            className="w-full min-h-[52px] bg-[#fe932c] hover:bg-[#ea801b] text-white rounded-xl text-[14px] font-bold px-4 py-3 flex items-center justify-between shadow-md active:translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[#663500]">Generate &amp; Share Credit Dossier</span>
                <span className="text-[11px] text-[#663500]/90 font-normal">
                  Encrypted PDF for Bank &amp; MFI Ag Loan Officers
                </span>
              </div>
            </div>
            <span className="bg-white text-[#663500] px-2 py-0.5 rounded text-[11px] font-black shadow-sm">
              PDF
            </span>
          </button>

          {/* Log Expense / Income Button */}
          <button
            onClick={onOpenAddModal}
            className="w-full min-h-[48px] bg-white hover:bg-[#eff4ff] text-[#00271d] border border-[#dee9fc] rounded-xl text-[14px] font-bold px-4 py-3 flex items-center justify-center gap-2 shadow-sm transition-colors active:translate-y-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#00271d]">add_circle</span>
            <span>+ Add Farm Expense / Income</span>
          </button>
        </div>

        {/* Recent Ledger Activity Feed */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-extrabold text-[#00271d]">Recent Ledger Feed</h2>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#904d00] font-bold">May 2024</span>
              {/* Filter pills */}
              <div className="flex items-center gap-1 bg-[#dee9fc] p-0.5 rounded-lg text-[10px]">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                    selectedFilter === 'all' ? 'bg-[#00271d] text-white' : 'text-[#414845]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter('outflow')}
                  className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                    selectedFilter === 'outflow' ? 'bg-[#00271d] text-white' : 'text-[#414845]'
                  }`}
                >
                  Out
                </button>
                <button
                  onClick={() => setSelectedFilter('inflow')}
                  className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                    selectedFilter === 'inflow' ? 'bg-[#00271d] text-white' : 'text-[#414845]'
                  }`}
                >
                  In
                </button>
              </div>
            </div>
          </div>

          {/* Feed Container */}
          <div className="flex flex-col gap-2">
            {filteredEntries.map((entry) => {
              const isOutflow = entry.type === 'outflow';
              const iconName =
                entry.category === 'Tractor'
                  ? 'agriculture'
                  : entry.category === 'Farmland'
                  ? 'landscape'
                  : entry.category === 'Seeds'
                  ? 'grain'
                  : entry.category === 'Fertiliser'
                  ? 'science'
                  : 'payments';

              return (
                <div
                  key={entry.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee9fc] flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-[#dee9fc] flex items-center justify-center text-[#00271d] flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[22px]">{iconName}</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[13px] font-bold text-[#121c2a] truncate">
                        {entry.title}
                      </span>
                      <span
                        className={`text-[15px] font-extrabold whitespace-nowrap ${
                          isOutflow ? 'text-[#121c2a]' : 'text-[#00b853]'
                        }`}
                      >
                        {isOutflow ? '-' : '+'}₦{entry.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] text-[#414845]">{entry.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#c0c8c3]"></span>
                      <span className="text-[11px] text-[#00b853] bg-[#dee9fc] px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">
                          {entry.verificationStatus === 'receipt_verified' ? 'check_circle' : 'verified'}
                        </span>
                        {entry.verificationCode}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#414845] mt-1 leading-snug">
                      {entry.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dispute & Data Privacy Statement Box */}
        <div className="bg-[#dee9fc]/70 rounded-2xl p-4 flex items-start gap-3 border border-[#d9e3f6]">
          <span className="material-symbols-outlined text-[#717975] text-[20px] flex-shrink-0 mt-0.5">
            shield_with_heart
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#121c2a] font-bold">Data Privacy Guarantee</span>
            <p className="text-[12px] text-[#414845] leading-relaxed">
              Your farm data is shared only with certified lenders when you explicitly authorize an application. You retain full control to revoke ledger access anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
