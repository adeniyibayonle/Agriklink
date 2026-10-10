import React, { useState } from 'react';
import { LedgerEntry } from '../types';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ isOpen, onClose }) => {
  const [recipient, setRecipient] = useState('LAPO Microfinance Ag Desk');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  if (!isOpen) return null;

  const handleSend = () => {
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#27313f]/60 backdrop-blur-sm flex flex-col justify-end p-0 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-300 border-t-2 border-[#143d31]">
        <div className="w-12 h-1 bg-[#c0c8c3] rounded-full mx-auto"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#904d00] text-[24px]">verified</span>
            <h3 className="text-[18px] font-extrabold text-[#121c2a]">Export Certified Dossier</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#dee9fc] flex items-center justify-center text-[#121c2a] hover:bg-[#d0dbed]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-[13px] text-[#414845] leading-relaxed">
          This compiles verified tractor operations, seed provenance, and 3 cycles of harvest receipts into a tamper-proof dossier readable by loan officers.
        </p>

        <div className="bg-[#eff4ff] rounded-2xl p-3 flex flex-col gap-2.5 border border-[#dee9fc]">
          <div className="flex flex-col gap-1 text-[#121c2a]">
            <span className="text-[12px] font-bold text-[#414845]">Select MFI / Bank Recipient:</span>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white border border-[#dee9fc] text-[12px] font-bold text-[#00271d]"
            >
              <option value="LAPO Microfinance Ag Desk">LAPO Microfinance Ag Desk (Egbeda)</option>
              <option value="Egbeda Farmers Cooperative Society">Egbeda Farmers Cooperative Society</option>
              <option value="First City Monument Bank Ag Lending">First City Monument Bank Ag Lending</option>
            </select>
          </div>
          <div className="flex items-center justify-between text-[#121c2a] pt-1">
            <span className="text-[12px] text-[#414845]">Dossier ID:</span>
            <span className="text-[11px] font-mono text-[#414845] font-bold bg-[#dee9fc] px-2 py-0.5 rounded">
              DOS-OYO-2024-88A
            </span>
          </div>
          <div className="flex items-center justify-between text-[#121c2a]">
            <span className="text-[12px] text-[#414845]">Encryption:</span>
            <span className="text-[11px] text-[#00b853] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">lock</span> 256-Bit Signed SHA
            </span>
          </div>
        </div>

        <button
          onClick={handleSend}
          disabled={status !== 'idle'}
          className="min-h-[52px] w-full bg-[#fe932c] hover:bg-[#ea801b] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform cursor-pointer shadow-md"
        >
          {status === 'sending' ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>Encrypting &amp; Sending...</span>
            </>
          ) : status === 'sent' ? (
            <>
              <span className="material-symbols-outlined text-[20px] text-[#00280c]">done_all</span>
              <span className="text-[#00280c]">Sent to {recipient.split(' ')[0]} Ag Desk!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>Authorize &amp; Send via Secure Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entry: Omit<LedgerEntry, 'id'>) => void;
}

export const AddEntryModal: React.FC<AddEntryModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [type, setType] = useState<'outflow' | 'inflow'>('outflow');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Tractor' | 'Farmland' | 'Seeds' | 'Fertiliser' | 'Harvest' | 'Other'>('Fertiliser');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseInt(amount, 10);
    if (!parsedAmount || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const randomCode = `OKO-${Math.floor(1000 + Math.random() * 9000)}`;
      onAdd({
        title: description.trim(),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        amount: parsedAmount,
        type,
        category,
        verificationCode: randomCode,
        verificationStatus: 'verified',
        subtitle: `Logged via Mobile Cluster Entry • ${category}`,
      });
      setIsSubmitting(false);
      setAmount('');
      setDescription('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#27313f]/60 backdrop-blur-sm flex flex-col justify-end p-0 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-300 border-t-2 border-[#143d31]">
        <div className="w-12 h-1 bg-[#c0c8c3] rounded-full mx-auto"></div>
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-extrabold text-[#121c2a]">Record Farm Transaction</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#dee9fc] flex items-center justify-center text-[#121c2a] hover:bg-[#d0dbed]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-[12px] font-bold text-[#414845] mb-1">
              Transaction Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('outflow')}
                className={`py-2.5 rounded-xl text-[12px] font-bold transition-all ${
                  type === 'outflow'
                    ? 'bg-[#143d31] text-white shadow-sm'
                    : 'bg-[#dee9fc] text-[#121c2a]'
                }`}
              >
                Farm Outflow (Expense)
              </button>
              <button
                type="button"
                onClick={() => setType('inflow')}
                className={`py-2.5 rounded-xl text-[12px] font-bold transition-all ${
                  type === 'inflow'
                    ? 'bg-[#004018] text-[#6bff8f] shadow-sm'
                    : 'bg-[#dee9fc] text-[#121c2a]'
                }`}
              >
                Farm Inflow (Harvest)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#414845] mb-1">Type Tag</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] border border-[#dee9fc] text-[13px] font-bold text-[#00271d]"
            >
              <option value="Fertiliser">Fertiliser / Nutrients (NPK/Urea)</option>
              <option value="Seeds">Seed Purchase / Inputs</option>
              <option value="Tractor">Tractor / Mechanization Services</option>
              <option value="Farmland">Farmland Lease / Boundary Survey</option>
              <option value="Harvest">Harvest Sale / Grain Commodity</option>
              <option value="Other">Labour / Transport / Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#414845] mb-1">Amount (₦)</label>
            <input
              className="w-full h-12 px-3 rounded-xl bg-[#eff4ff] border border-[#dee9fc] text-[#121c2a] text-[18px] font-bold focus:outline-none focus:ring-2 focus:ring-[#143d31]"
              placeholder="e.g. 35,000"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#414845] mb-1">Description</label>
            <input
              className="w-full h-12 px-3 rounded-xl bg-[#eff4ff] border border-[#dee9fc] text-[#121c2a] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#143d31]"
              placeholder="e.g. Herbicide Application / Weed Control"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[52px] w-full bg-[#143d31] hover:bg-[#00271d] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform cursor-pointer shadow-md mt-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                <span>Encrypting onto Ledger...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>Save into Verified Ledger</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  operatorName: string;
  phone: string;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose, operatorName, phone }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#27313f]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-[#dee9fc]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00b853]">call</span>
            <h3 className="font-extrabold text-[16px] text-[#00271d]">Direct Operator Dispatch</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#dee9fc] flex items-center justify-center text-[#121c2a]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="bg-[#eff4ff] p-4 rounded-2xl flex flex-col items-center text-center gap-2 border border-[#dee9fc]">
          <div className="w-16 h-16 rounded-full bg-[#143d31] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">agriculture</span>
          </div>
          <h4 className="text-[16px] font-bold text-[#00271d]">{operatorName}</h4>
          <p className="text-[12px] text-[#414845]">Certified Tractor Pilot • Egbeda Cluster</p>
          <span className="text-[14px] font-mono font-bold text-[#904d00]">{phone}</span>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="w-full h-12 bg-[#143d31] hover:bg-[#00271d] text-white font-bold rounded-xl text-[13px] flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">phone_enabled</span>
            Direct Mobile Call
          </a>
          <button
            onClick={() => {
              alert(`WhatsApp dispatch ping sent to ${operatorName}`);
              onClose();
            }}
            className="w-full h-12 bg-[#004018] hover:bg-[#00280c] text-[#6bff8f] font-bold rounded-xl text-[13px] flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Send WhatsApp GPS Marker
          </button>
        </div>
      </div>
    </div>
  );
};

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Rainfall Alert',
      desc: 'Optimal ploughing window opens in 4 days across Egbeda South.',
      time: '24m ago',
      icon: 'water_drop',
      color: 'text-[#6bff8f]',
    },
    {
      id: 2,
      title: 'Tractor Assigned',
      desc: 'Sunday Alabi confirmed Plot A ploughing route for tomorrow 7:00 AM.',
      time: '2h ago',
      icon: 'agriculture',
      color: 'text-[#fe932c]',
    },
    {
      id: 3,
      title: 'Credit Score Boost',
      desc: 'Tier-2 verified after Pioneer seed receipt verification.',
      time: '1d ago',
      icon: 'verified_user',
      color: 'text-[#00b853]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#27313f]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-[#dee9fc]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#904d00]">notifications</span>
            <h3 className="font-extrabold text-[16px] text-[#00271d]">Cluster Dispatch Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#dee9fc] flex items-center justify-center text-[#121c2a]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {notifications.map((n) => (
            <div key={n.id} className="p-3 bg-[#eff4ff] rounded-2xl flex items-start gap-3 border border-[#dee9fc]">
              <div className="w-8 h-8 rounded-xl bg-[#143d31] flex items-center justify-center flex-shrink-0">
                <span className={`material-symbols-outlined text-[18px] ${n.color}`}>{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13px] font-bold text-[#00271d]">{n.title}</h4>
                  <span className="text-[10px] text-[#414845]">{n.time}</span>
                </div>
                <p className="text-[11px] text-[#414845] mt-0.5 leading-snug">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 bg-[#00271d] text-white font-bold rounded-xl text-[13px]"
        >
          Dismiss All
        </button>
      </div>
    </div>
  );
};
