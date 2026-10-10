/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { MachineryScreen } from './components/MachineryScreen';
import { FarmlandScreen } from './components/FarmlandScreen';
import { FarmLedgerScreen } from './components/FarmLedgerScreen';
import { AddEntryModal, CallModal, DossierModal, NotificationsModal } from './components/Modals';
import { INITIAL_LEDGER_ENTRIES, BRAND_ASSETS } from './data/mockData';
import { LedgerEntry, TabType } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>(INITIAL_LEDGER_ENTRIES);

  // Modals state
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [callModalData, setCallModalData] = useState<{ isOpen: boolean; name: string; phone: string }>({
    isOpen: false,
    name: 'Jide S.',
    phone: '+234 803 712 9011',
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleAddEntry = (newEntry: Omit<LedgerEntry, 'id'>) => {
    const entryWithId: LedgerEntry = {
      ...newEntry,
      id: `led-${Date.now()}`,
    };
    setLedgerEntries((prev) => [entryWithId, ...prev]);
  };

  const handleBookSuccess = (details: { machinery: string; plot: string; amount: number }) => {
    // Add escrow booking to ledger
    const newEntry: LedgerEntry = {
      id: `led-${Date.now()}`,
      title: `${details.machinery} Booking`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: details.amount,
      type: 'outflow',
      category: 'Tractor',
      verificationCode: `ESC-${Math.floor(1000 + Math.random() * 9000)}`,
      verificationStatus: 'verified',
      subtitle: `Escrow Locked • ${details.plot}`,
    };
    setLedgerEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#121c2a] flex justify-center selection:bg-[#c1ecda] selection:text-[#002118]">
      {/* Container framing for mobile-optimized high fidelity layout */}
      <div className="w-full max-w-md bg-[#f8f9ff] min-h-screen flex flex-col relative shadow-xl overflow-x-hidden">
        {/* Persistent Top Header */}
        <Header onProfileClick={() => setIsProfileModalOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-16 bg-[#f8f9ff]">
          {currentTab === 'home' && (
            <HomeScreen
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenAddExpense={() => setIsAddExpenseOpen(true)}
              onCallOperator={(name, phone) => setCallModalData({ isOpen: true, name, phone })}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
            />
          )}

          {currentTab === 'machinery' && (
            <MachineryScreen
              onBookSuccess={handleBookSuccess}
              onCallOperator={(name, phone) => setCallModalData({ isOpen: true, name, phone })}
            />
          )}

          {currentTab === 'farmland' && (
            <FarmlandScreen />
          )}

          {currentTab === 'farm-ledger' && (
            <FarmLedgerScreen
              entries={ledgerEntries}
              onAddEntry={handleAddEntry}
              onOpenDossier={() => setIsDossierOpen(true)}
              onOpenAddModal={() => setIsAddExpenseOpen(true)}
            />
          )}
        </main>

        {/* Persistent Bottom Tab Navigation */}
        <BottomNav currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />

        {/* Modals & Dialogs */}
        <DossierModal
          isOpen={isDossierOpen}
          onClose={() => setIsDossierOpen(false)}
        />

        <AddEntryModal
          isOpen={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
          onAdd={handleAddEntry}
        />

        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />

        <CallModal
          isOpen={callModalData.isOpen}
          onClose={() => setCallModalData((prev) => ({ ...prev, isOpen: false }))}
          operatorName={callModalData.name}
          phone={callModalData.phone}
        />

        {/* Profile Details Modal */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#27313f]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-[#dee9fc]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-[#904d00] tracking-wider">
                  Cluster Member Card
                </span>
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#dee9fc] flex items-center justify-center text-[#121c2a]"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="flex items-center gap-3 bg-[#eff4ff] p-3.5 rounded-2xl border border-[#dee9fc]">
                <img
                  src={BRAND_ASSETS.adebayoLarge}
                  alt="Adebayo"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h3 className="text-[16px] font-bold text-[#00271d]">Adebayo Adeleke</h3>
                  <p className="text-[12px] text-[#414845]">ID: OYO-EGB-FM-0824</p>
                  <div className="inline-flex items-center gap-1 mt-1 bg-[#c1ecda] text-[#002118] px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    Tier-2 Verified Farmer
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-[12px] bg-[#f8f9ff] p-3 rounded-2xl border border-[#e6eeff]">
                <div className="flex justify-between">
                  <span className="text-[#414845]">Cooperative:</span>
                  <span className="font-bold text-[#00271d]">Egbeda Farmers Co-op</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#414845]">Farmland Area:</span>
                  <span className="font-bold text-[#00271d]">1.5 Hectares Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#414845]">Primary Crops:</span>
                  <span className="font-bold text-[#00271d]">White Maize &amp; Cassava</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#414845]">Credit Standing:</span>
                  <span className="font-bold text-[#00b853]">78 / 100 (High Readiness)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setCurrentTab('farm-ledger');
                }}
                className="w-full h-11 bg-[#143d31] text-white font-bold rounded-xl text-[13px] hover:bg-[#00271d]"
              >
                View Full Credit Ledger
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
