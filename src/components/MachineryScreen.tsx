import React, { useState } from 'react';
import { BRAND_ASSETS, INITIAL_PARCELS, MACHINERY_LIST, SERVICE_OPTIONS } from '../data/mockData';
import { MachineryItem } from '../types';

interface MachineryScreenProps {
  onBookSuccess?: (details: { machinery: string; plot: string; amount: number }) => void;
  onCallOperator?: (name: string, phone: string) => void;
}

export const MachineryScreen: React.FC<MachineryScreenProps> = ({
  onBookSuccess,
  onCallOperator,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedParcelId, setSelectedParcelId] = useState(INITIAL_PARCELS[0].id);
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICE_OPTIONS[0].id);
  const [activeMachinery, setActiveMachinery] = useState<MachineryItem>(MACHINERY_LIST[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [viewAllStandby, setViewAllStandby] = useState(false);

  const selectedParcel = INITIAL_PARCELS.find((p) => p.id === selectedParcelId) || INITIAL_PARCELS[0];
  const selectedService = SERVICE_OPTIONS.find((s) => s.id === selectedServiceId) || SERVICE_OPTIONS[0];

  const calculateEscrow = (machineryRate: number, hectares: number, multiplier: number) => {
    return Math.round(hectares * machineryRate * multiplier);
  };

  const calculatedAmount = calculateEscrow(
    activeMachinery.ratePerHa,
    selectedParcel.hectares,
    selectedService.multiplier
  );

  const filterOptions = [
    { id: 'all', label: 'All Equipment' },
    { id: 'tractors', label: 'Tractors (4WD)' },
    { id: 'ploughs', label: 'Ploughs & Harrows' },
    { id: 'sprayers', label: 'Boom Sprayers' },
    { id: 'harvesters', label: 'Harvesters' },
  ];

  const handleConfirmBooking = () => {
    setIsModalOpen(false);
    setShowToast(true);

    if (onBookSuccess) {
      onBookSuccess({
        machinery: activeMachinery.title,
        plot: selectedParcel.name,
        amount: calculatedAmount,
      });
    }

    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-in fade-in duration-200">
      {/* Toast Notification */}
      <div
        className={`fixed top-20 left-4 right-4 max-w-md mx-auto z-50 bg-[#00271d] text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform border border-[#c1ecda]/30 ${
          showToast ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <span
          className="material-symbols-outlined text-[#6bff8f] text-[28px] flex-shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          verified
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-white leading-tight">
            Escrow Locked Successfully
          </p>
          <p className="text-[12px] text-[#7ea898] leading-tight mt-0.5">
            {activeMachinery.operator.name} has been notified with plot GPS coordinates.
          </p>
        </div>
        <button
          onClick={() => setShowToast(false)}
          className="text-[#7ea898] hover:text-white p-1"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="px-4 pt-2 pb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#904d00] font-extrabold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">tune</span> Mechanized Dispatch
          </span>
          <span className="text-[11px] bg-[#dee9fc] text-[#414845] px-2.5 py-0.5 rounded-full font-bold">
            Live Hub
          </span>
        </div>
        <h1 className="text-[24px] text-[#00271d] font-extrabold tracking-tight leading-tight">
          Equipment &amp; Booking
        </h1>
        <p className="text-[13px] text-[#414845]">
          High-power mechanization pooled across cooperative clusters with guaranteed dispatch escrow.
        </p>
      </div>

      {/* Radar Banner */}
      <div className="px-4 my-2">
        <div className="bg-[#143d31] text-white rounded-2xl p-3 shadow-sm flex items-center gap-3 border border-[#00271d]">
          <div className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#00271d] text-[#4ae176]">
            <span className="material-symbols-outlined text-[20px]">radar</span>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#4ae176] animate-ping"></span>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#6bff8f]"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-white leading-snug">
              3 verified tractors working within 7km
            </p>
            <p className="text-[12px] text-[#7ea898] truncate">
              Active in Egbeda Central • Fast redeploy today
            </p>
          </div>
        </div>
      </div>

      {/* Filter Horizontal Scroll */}
      <div className="w-full overflow-x-auto no-scrollbar py-2 px-4 flex items-center gap-2">
        {filterOptions.map((filter) => {
          const isActive = selectedFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`whitespace-nowrap px-3.5 py-2 rounded-full text-[12px] font-bold transition-all shadow-sm active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-[#00271d] text-white'
                  : 'bg-[#e6eeff] text-[#121c2a] hover:bg-[#dee9fc]'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Featured Machine Booking Card */}
      <div className="px-4 mt-2 flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col border border-[#dee9fc]">
          {/* Card Hero Image */}
          <div className="relative w-full h-52 bg-[#e6eeff]">
            <img
              className="w-full h-full object-cover"
              alt={activeMachinery.title}
              src={activeMachinery.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00271d]/85 via-[#00271d]/20 to-transparent"></div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#00271d] text-[11px] px-2.5 py-1 rounded-full shadow-sm font-bold">
                <span
                  className="material-symbols-outlined text-[#4ae176] text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                Inspected Machinery
              </span>
              <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#904d00] text-[11px] px-2.5 py-1 rounded-full shadow-sm font-bold">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
                Escrow Protection
              </span>
            </div>

            {/* Title & Rate */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
              <div>
                <span className="inline-block px-2 py-0.5 rounded bg-[#6bff8f] text-[#002109] text-[11px] font-bold uppercase tracking-wider mb-1">
                  Ready in Cluster
                </span>
                <p className="text-[18px] font-extrabold text-white leading-tight drop-shadow-sm">
                  {activeMachinery.title}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-[20px] font-black text-[#ffdcc3]">
                  ₦{activeMachinery.ratePerHa.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#eff4ff] block font-medium">/ Hectare</span>
              </div>
            </div>
          </div>

          {/* Card Details */}
          <div className="p-4 flex flex-col gap-3">
            {/* Operator Row */}
            <div className="flex items-center justify-between py-1.5 bg-[#eff4ff] px-3 rounded-xl border border-[#dee9fc]">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  alt={activeMachinery.operator.name}
                  src={activeMachinery.operator.avatar}
                />
                <div className="min-w-0">
                  <span className="text-[13px] text-[#121c2a] font-bold block truncate">
                    {activeMachinery.operator.name}
                  </span>
                  <span className="text-[12px] text-[#414845] flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[#fe932c] text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-bold text-[#121c2a]">{activeMachinery.operator.rating}</span> • {activeMachinery.operator.completedJobs} verified jobs
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-[#d9e3f6] text-[#00271d] font-bold px-2 py-1 rounded-lg">
                  Operator Included
                </span>
                {onCallOperator && (
                  <button
                    onClick={() => onCallOperator(activeMachinery.operator.name, activeMachinery.operator.phone)}
                    className="p-1 rounded-full bg-white text-[#143d31] hover:bg-[#dee9fc] transition-colors"
                    title="Call Operator"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </button>
                )}
              </div>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-2 text-[#414845] text-[12px]">
              <div className="bg-[#f8f9ff] rounded-xl p-2.5 flex items-start gap-2 border border-[#e6eeff]">
                <span className="material-symbols-outlined text-[#00271d] text-[18px] mt-0.5">
                  local_gas_station
                </span>
                <div>
                  <span className="text-[11px] font-bold text-[#121c2a] block">Fuel Allotment</span>
                  <span className="text-[#414845] text-[12px]">{activeMachinery.fuelAllotment}</span>
                </div>
              </div>
              <div className="bg-[#f8f9ff] rounded-xl p-2.5 flex items-start gap-2 border border-[#e6eeff]">
                <span className="material-symbols-outlined text-[#00280c] text-[18px] mt-0.5">
                  event_available
                </span>
                <div>
                  <span className="text-[11px] font-bold text-[#121c2a] block">Available</span>
                  <span className="text-[#414845] text-[12px]">{activeMachinery.availability}</span>
                </div>
              </div>
            </div>

            {/* Quick Configuration Box */}
            <div className="bg-[#f8f9ff] rounded-2xl p-3.5 flex flex-col gap-3 border border-[#dee9fc]">
              <span className="text-[12px] font-bold text-[#121c2a] uppercase tracking-wide flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00271d] text-[16px]">
                  assignment_turned_in
                </span>
                Quick Configuration
              </span>

              {/* Farm Parcel Select */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#414845]">
                  Farm Parcel (Verified Boundaries)
                </label>
                <div className="relative">
                  <select
                    value={selectedParcelId}
                    onChange={(e) => setSelectedParcelId(e.target.value)}
                    className="w-full h-12 pl-3 pr-8 rounded-xl bg-white text-[#121c2a] text-[13px] font-medium appearance-none shadow-sm border border-[#dee9fc] focus:outline-none focus:ring-2 focus:ring-[#143d31] cursor-pointer"
                  >
                    {INITIAL_PARCELS.map((parcel) => (
                      <option key={parcel.id} value={parcel.id}>
                        {parcel.name}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-3.5 pointer-events-none text-[#414845] text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Service Required Select */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#414845]">
                  Service Required
                </label>
                <div className="relative">
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full h-12 pl-3 pr-8 rounded-xl bg-white text-[#121c2a] text-[13px] font-medium appearance-none shadow-sm border border-[#dee9fc] focus:outline-none focus:ring-2 focus:ring-[#143d31] cursor-pointer"
                  >
                    {SERVICE_OPTIONS.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.label}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-3.5 pointer-events-none text-[#414845] text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Escrow Calculated Row */}
              <div className="p-3 bg-[#eff4ff] rounded-xl flex items-center justify-between border border-[#dee9fc]">
                <div>
                  <span className="text-[11px] text-[#414845] block">Calculated Escrow Hold</span>
                  <span className="text-[20px] font-extrabold text-[#00271d]">
                    ₦{calculatedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] bg-[#dee9fc] text-[#00271d] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">gavel</span> Escrow Locked
                  </span>
                  <span className="text-[11px] text-[#414845] block mt-0.5 font-medium">
                    GPS Sign-off release
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full h-[52px] bg-[#fe932c] hover:bg-[#ea801b] text-[#663500] font-extrabold text-[15px] rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:translate-y-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">lock</span>
              Schedule &amp; Lock Escrow
            </button>
            <p className="text-[12px] text-center text-[#414845] leading-normal">
              Funds released to operator only upon completed boundary confirmation.
            </p>
          </div>
        </div>

        {/* Nearby Standby Equipment */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[18px] text-[#00271d] font-bold">
            Nearby Standby Equipment
          </span>
          <button
            onClick={() => setViewAllStandby(!viewAllStandby)}
            className="text-[12px] text-[#904d00] font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            {viewAllStandby ? 'Show Less' : 'View All (8)'}{' '}
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Standby Tractor Cards */}
        <div
          onClick={() => {
            setActiveMachinery(MACHINERY_LIST[1]);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className={`bg-white rounded-2xl p-3.5 shadow-sm border border-[#dee9fc] flex items-center justify-between gap-3 transition-all hover:shadow-md cursor-pointer ${
            activeMachinery.id === MACHINERY_LIST[1].id ? 'ring-2 ring-[#00271d]' : ''
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-14 h-14 rounded-xl bg-[#e6eeff] flex-shrink-0 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Mahindra 575 DI"
                src={BRAND_ASSETS.mahindraTractor}
              />
              <span className="absolute bottom-0 right-0 bg-[#00271d] text-[#6bff8f] text-[9px] px-1 font-bold rounded-tl">
                45HP
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="text-[14px] font-bold text-[#00271d] truncate">
                Mahindra 575 DI (45 HP)
              </h2>
              <div className="flex items-center gap-2 mt-0.5 text-[#414845] text-[12px]">
                <span className="font-bold text-[#121c2a]">₦30,000/Ha</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-[#904d00] font-medium">
                  <span className="material-symbols-outlined text-[13px]">near_me</span> 2.5km away
                </span>
              </div>
              <span className="text-[11px] text-[#00b853] font-semibold mt-0.5 block truncate">
                Tiller • Ridge Maker • Inspected
              </span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#00271d] flex items-center justify-center flex-shrink-0 hover:bg-[#dee9fc] transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>

        {viewAllStandby && (
          <div
            onClick={() => {
              setActiveMachinery({
                id: 'john-deere-5075',
                title: 'John Deere 5075E (75 HP)',
                hp: 75,
                ratePerHa: 38000,
                image: BRAND_ASSETS.tractorMF,
                operator: {
                  name: 'Biodun Adeola',
                  avatar: BRAND_ASSETS.sundayAlabi,
                  rating: 5.0,
                  completedJobs: 54,
                  phone: '+234 802 119 5544',
                },
                features: ['Heavy Disc Harrow', 'Subsoiler', 'GPS Guidance'],
                fuelAllotment: '100% fuel included',
                availability: 'Today, 4:00 PM',
                tags: ['Inspected Machinery', 'Escrow Protection'],
                category: 'tractors',
              });
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#dee9fc] flex items-center justify-between gap-3 transition-all hover:shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-14 h-14 rounded-xl bg-[#e6eeff] flex-shrink-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="John Deere"
                  src={BRAND_ASSETS.tractorMF}
                />
                <span className="absolute bottom-0 right-0 bg-[#00271d] text-[#6bff8f] text-[9px] px-1 font-bold rounded-tl">
                  75HP
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="text-[14px] font-bold text-[#00271d] truncate">
                  John Deere 5075E (75 HP)
                </h2>
                <div className="flex items-center gap-2 mt-0.5 text-[#414845] text-[12px]">
                  <span className="font-bold text-[#121c2a]">₦38,000/Ha</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-[#904d00] font-medium">
                    <span className="material-symbols-outlined text-[13px]">near_me</span> 3.8km away
                  </span>
                </div>
                <span className="text-[11px] text-[#00b853] font-semibold mt-0.5 block truncate">
                  Subsoiler • Disc Harrow • GPS Ready
                </span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#00271d] flex items-center justify-center flex-shrink-0 hover:bg-[#dee9fc] transition-colors">
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        )}

        {/* Dispatch Guarantee Banner */}
        <div className="bg-[#dee9fc] rounded-2xl p-4 shadow-sm flex items-start gap-3 border border-[#d9e3f6]">
          <div className="w-9 h-9 rounded-full bg-white text-[#904d00] flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-[#00271d]">
              OkoEgbeda Dispatch Guarantee
            </p>
            <p className="text-[12px] text-[#414845] mt-1 leading-relaxed">
              If operator fails to show or breakdown occurs, 100% refund or free backup tractor dispatched within 90 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Escrow Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#27313f]/60 backdrop-blur-sm flex items-end justify-center p-0 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-[#d9e3f6] rounded-full mx-auto -mt-1"></div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#904d00] font-bold uppercase tracking-wider block">
                  Escrow Authorization
                </span>
                <h2 className="text-[18px] font-extrabold text-[#00271d]">
                  Confirm &amp; Lock Funds
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#e6eeff] flex items-center justify-center text-[#414845] hover:bg-[#dee9fc] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-[#eff4ff] rounded-2xl p-3.5 flex flex-col gap-2.5 text-[13px] border border-[#dee9fc]">
              <div className="flex justify-between">
                <span className="text-[#414845]">Machinery:</span>
                <span className="font-bold text-[#121c2a] text-right">{activeMachinery.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#414845]">Assigned Operator:</span>
                <span className="font-bold text-[#121c2a]">{activeMachinery.operator.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#414845]">Selected Land:</span>
                <span className="font-bold text-[#121c2a] text-right">{selectedParcel.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#414845]">Service:</span>
                <span className="font-bold text-[#121c2a] text-right">{selectedService.label}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#dee9fc] bg-[#e6eeff] px-2.5 py-2 rounded-xl">
                <span className="font-bold text-[#00271d]">Escrow Total:</span>
                <span className="font-extrabold text-[#00271d] text-[16px]">
                  ₦{calculatedAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-[#f8f9ff] p-3 rounded-xl border border-[#dee9fc]">
              <span className="material-symbols-outlined text-[#004018] text-[20px] mt-0.5 flex-shrink-0">
                info
              </span>
              <p className="text-[12px] text-[#414845] leading-normal">
                A lien will be temporarily held from your wallet. {activeMachinery.operator.name} will navigate to the coordinate boundary tomorrow at 7:00 AM.
              </p>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full h-[52px] bg-[#00271d] hover:bg-[#143d31] text-white text-[14px] font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[20px] text-[#6bff8f]">check_circle</span>
              Authorize Escrow Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
