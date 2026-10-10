import React, { useState } from 'react';
import { FARMLAND_LISTINGS } from '../data/mockData';
import { FarmlandListing } from '../types';

interface FarmlandScreenProps {
  onRequestInspection?: (parcel: FarmlandListing) => void;
  onReviewAgreement?: (parcel: FarmlandListing) => void;
}

export const FarmlandScreen: React.FC<FarmlandScreenProps> = ({
  onRequestInspection,
  onReviewAgreement,
}) => {
  const [activeParcel] = useState<FarmlandListing>(FARMLAND_LISTINGS[0]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [inspectStatus, setInspectStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [agreementStatus, setAgreementStatus] = useState<'idle' | 'downloading' | 'viewed'>('idle');
  const [showMapModal, setShowMapModal] = useState(false);

  const handleInspectClick = () => {
    if (onRequestInspection) {
      onRequestInspection(activeParcel);
      return;
    }
    setInspectStatus('loading');
    setTimeout(() => {
      setInspectStatus('success');
      setTimeout(() => setInspectStatus('idle'), 4000);
    }, 1200);
  };

  const handleAgreementClick = () => {
    if (onReviewAgreement) {
      onReviewAgreement(activeParcel);
      return;
    }
    setAgreementStatus('downloading');
    setTimeout(() => {
      setAgreementStatus('viewed');
      setTimeout(() => setAgreementStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-in fade-in duration-200">
      {/* Cluster Header Status Banner */}
      <div className="px-4 pt-2 pb-2">
        <div className="flex items-center justify-between gap-2 bg-[#dee9fc] text-[#121c2a] rounded-2xl px-3.5 py-2.5 shadow-sm border border-[#d9e3f6]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#904d00] text-[20px] flex-shrink-0 animate-pulse">
              radar
            </span>
            <span className="text-[12px] font-bold truncate text-[#00271d]">
              Egbeda East Agricultural Corridor
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 bg-white text-[#00271d] px-2.5 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#4ae176]"></span>
            <span className="text-[11px] font-bold">12 Verified Parcels</span>
          </div>
        </div>
      </div>

      {/* Main Farmland Listing Content */}
      <div className="px-4 flex flex-col gap-4">
        {/* Image Media Stack with Carousel Preview */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#e6eeff] shadow-md border border-[#dee9fc]">
          <div className="relative h-64 w-full">
            <img
              className="w-full h-full object-cover"
              alt={activeParcel.title}
              src={activeParcel.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00271d]/90 via-[#00271d]/20 to-transparent"></div>

            {/* Floating Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5 max-w-[80%]">
                <span className="bg-white/95 backdrop-blur-md text-[#00271d] text-[11px] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 font-bold">
                  <span
                    className="material-symbols-outlined text-[#4ae176] text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  {activeParcel.surveyNumber}
                </span>
              </div>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer ${
                  isFavorited
                    ? 'bg-[#ffdcc3] text-[#904d00]'
                    : 'bg-white/90 text-[#414845] hover:text-[#904d00]'
                }`}
                title="Save Parcel"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={isFavorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {isFavorited ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>

            {/* Title & Location Overlay */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[#ffdcc3] text-[16px]">
                  pin_drop
                </span>
                <span className="text-[12px] text-[#dee9fc] tracking-wide uppercase font-bold">
                  {activeParcel.locationAxis}
                </span>
              </div>
              <h1 className="text-[22px] text-white font-extrabold leading-tight drop-shadow-sm">
                {activeParcel.title}
              </h1>
            </div>
          </div>

          {/* Trust Triad Pill Banner */}
          <div className="bg-[#143d31] px-3.5 py-2.5 text-[#7ea898] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="material-symbols-outlined text-[#6bff8f] text-[16px]">
                check_circle
              </span>
              <span className="text-[11px] text-white font-medium">Family Head Authority Verified</span>
            </div>
            <span className="text-white/40 text-xs">•</span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="material-symbols-outlined text-[#6bff8f] text-[16px]">
                assignment_turned_in
              </span>
              <span className="text-[11px] text-white font-medium">Survey Plan Registered</span>
            </div>
            <span className="text-white/40 text-xs">•</span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="material-symbols-outlined text-[#6bff8f] text-[16px]">
                shield
              </span>
              <span className="text-[11px] text-white font-medium">Zero Boundary Dispute</span>
            </div>
          </div>
        </div>

        {/* Pricing Summary Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee9fc] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[12px] text-[#414845] font-semibold">Annual Rental Valuation</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[24px] font-extrabold text-[#00271d]">
                ₦{activeParcel.ratePerHaYear.toLocaleString()}
              </span>
              <span className="text-[12px] text-[#414845]">/ Ha / Year</span>
            </div>
            <span className="text-[11px] text-[#904d00] font-bold mt-0.5">
              Total: ₦{activeParcel.totalPriceYear.toLocaleString()} / year ({activeParcel.hectares} Ha)
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="bg-[#004018] text-[#00b853] text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6bff8f] animate-ping"></span>
              {activeParcel.status}
            </span>
            <span className="text-[11px] text-[#414845] font-semibold">
              {activeParcel.leaseType}
            </span>
          </div>
        </div>

        {/* Verified Map Anchor */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#00271d] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#904d00]">explore</span>
              Cadastral Survey Boundary
            </span>
            <span className="text-[11px] text-[#414845] font-semibold">Coordinates Locked</span>
          </div>

          <div
            onClick={() => setShowMapModal(true)}
            className="relative w-full h-36 rounded-2xl bg-[#e6eeff] overflow-hidden shadow-sm border border-[#dee9fc] cursor-pointer group"
          >
            <img
              src={activeParcel.mapImage}
              alt="Cadastral map"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-[#00271d]/20 backdrop-blur-[1px]"></div>
            <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[#904d00] text-[16px]">satellite_alt</span>
              <span className="text-[11px] text-[#121c2a] font-bold">
                {activeParcel.beaconId}
              </span>
            </div>
            <div className="absolute top-2 right-2 bg-[#00271d] text-white px-2 py-1 rounded-lg text-[11px] font-bold">
              {activeParcel.polygonSize}
            </div>
            <div className="absolute top-2 left-2 bg-white/90 text-[#00271d] px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">zoom_in</span> Tap to inspect
            </div>
          </div>
        </div>

        {/* Soil & Agronomic Specs Grid */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-extrabold text-[#00271d] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#904d00] text-[22px]">compost</span>
              Soil &amp; Agronomic Profile
            </h2>
            <span className="text-[11px] text-[#414845] bg-[#e6eeff] px-2 py-0.5 rounded-full font-bold">
              Lab Verified
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Soil Type Card */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#dee9fc] flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#dee9fc] flex items-center justify-center text-[#00271d]">
                  <span className="material-symbols-outlined text-[18px]">nature</span>
                </div>
                <span className="text-[12px] text-[#414845] font-bold">Soil Type</span>
              </div>
              <p className="text-[13px] text-[#121c2a] font-bold leading-snug">
                {activeParcel.soilType}
              </p>
              <span className="text-[11px] text-[#414845] mt-1 leading-tight">{activeParcel.soilDesc}</span>
            </div>

            {/* Water Source Card */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#dee9fc] flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#dee9fc] flex items-center justify-center text-[#904d00]">
                  <span className="material-symbols-outlined text-[18px]">water_drop</span>
                </div>
                <span className="text-[12px] text-[#414845] font-bold">Water Source</span>
              </div>
              <p className="text-[13px] text-[#121c2a] font-bold leading-snug">
                {activeParcel.waterSource}
              </p>
              <span className="text-[11px] text-[#414845] mt-1 leading-tight">{activeParcel.waterDesc}</span>
            </div>

            {/* Topography Card */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#dee9fc] flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#dee9fc] flex items-center justify-center text-[#00271d]">
                  <span className="material-symbols-outlined text-[18px]">landscape</span>
                </div>
                <span className="text-[12px] text-[#414845] font-bold">Topography</span>
              </div>
              <p className="text-[13px] text-[#121c2a] font-bold leading-snug">
                {activeParcel.topography}
              </p>
              <span className="text-[11px] text-[#414845] mt-1 leading-tight">{activeParcel.topographyDesc}</span>
            </div>

            {/* Prior Cultivation Card */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#dee9fc] flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#dee9fc] flex items-center justify-center text-[#904d00]">
                  <span className="material-symbols-outlined text-[18px]">agriculture</span>
                </div>
                <span className="text-[12px] text-[#414845] font-bold">Prior History</span>
              </div>
              <p className="text-[13px] text-[#121c2a] font-bold leading-snug">
                {activeParcel.priorHistory}
              </p>
              <span className="text-[11px] text-[#414845] mt-1 leading-tight">{activeParcel.priorDesc}</span>
            </div>
          </div>
        </div>

        {/* Digital Agreement Summary Preview Box */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee9fc] flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00271d] text-[22px]">contract</span>
              <span className="text-[16px] font-extrabold text-[#00271d]">
                Digital Lease Agreement Preview
              </span>
            </div>
            <span className="bg-[#c1ecda] text-[#002118] text-[11px] px-2.5 py-0.5 rounded-full font-bold">
              Standard Oyo Law
            </span>
          </div>

          <div className="flex flex-col gap-2.5 bg-[#eff4ff] rounded-xl p-3 text-[#121c2a] border border-[#dee9fc]">
            {/* Landowner Row */}
            <div className="flex items-start justify-between gap-2">
              <span className="text-[12px] text-[#414845] min-w-[90px] font-medium">Landowner</span>
              <div className="text-right flex flex-col items-end">
                <span className="text-[13px] font-bold text-[#00271d]">
                  {activeParcel.landowner.name}
                </span>
                <span className="text-[11px] text-[#904d00] font-bold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">how_to_reg</span>
                  ID &amp; Family Consent Verified
                </span>
              </div>
            </div>

            {/* Lease Term */}
            <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-[#dee9fc]">
              <span className="text-[12px] text-[#414845] font-medium">Tenure Term</span>
              <span className="text-[13px] font-bold text-[#00271d]">{activeParcel.tenureTerm}</span>
            </div>

            {/* Permitted Use */}
            <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-[#dee9fc]">
              <span className="text-[12px] text-[#414845] font-medium">Permitted Use</span>
              <span className="text-[13px] font-bold text-[#121c2a] text-right">
                {activeParcel.permittedUse}
              </span>
            </div>

            {/* Protected Clauses */}
            <div className="pt-2 flex flex-col gap-1.5 border-t border-[#dee9fc]">
              <span className="text-[12px] text-[#414845] font-bold">
                Enforceable Legal Safeguards
              </span>
              <div className="flex flex-col gap-1.5 text-[#414845]">
                {activeParcel.safeguards.map((clause, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[#00271d] text-[16px] flex-shrink-0 mt-0.5">
                      verified_user
                    </span>
                    <span className="text-[12px] text-[#121c2a] leading-tight">{clause}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Callout Badge */}
          <div className="bg-[#e6eeff] rounded-xl p-3 flex items-center gap-3 border border-[#dee9fc]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm text-[#00271d]">
              <span className="material-symbols-outlined text-[20px]">assignment_ind</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#904d00] font-extrabold uppercase tracking-wider">
                Field Verification Log
              </span>
              <p className="text-[12px] text-[#121c2a] leading-tight mt-0.5">
                Inspected on-ground by {activeParcel.inspector.role}{' '}
                <strong className="text-[#00271d] font-bold">{activeParcel.inspector.name}</strong> on {activeParcel.inspector.date}.
              </p>
            </div>
          </div>
        </div>

        {/* Action CTA Group */}
        <div className="flex flex-col gap-3 pt-1">
          {/* Primary CTA: Site Inspection */}
          <button
            onClick={handleInspectClick}
            className="w-full h-[52px] bg-[#00271d] hover:bg-[#143d31] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all cursor-pointer"
          >
            {inspectStatus === 'loading' ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                <span>Dispatching Field Agent...</span>
              </>
            ) : inspectStatus === 'success' ? (
              <>
                <span className="material-symbols-outlined text-[20px] text-[#6bff8f]">check</span>
                <span>Officer Funke Assigned (WhatsApp Pinged)</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">directions_walk</span>
                <span>Request Site Inspection with Agent</span>
              </>
            )}
          </button>

          {/* Secondary CTA: Review Digital Agreement */}
          <button
            onClick={handleAgreementClick}
            className="w-full h-[48px] bg-white text-[#00271d] border border-[#dee9fc] hover:bg-[#e6eeff] rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
          >
            {agreementStatus === 'downloading' ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                <span>Generating Legal Pack...</span>
              </>
            ) : agreementStatus === 'viewed' ? (
              <>
                <span className="material-symbols-outlined text-[20px] text-[#00b853]">download_done</span>
                <span>Draft PDF Ready for Review</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">description</span>
                <span>Review Standard Digital Lease Agreement</span>
              </>
            )}
          </button>

          {/* Micro footnote */}
          <div className="flex items-center justify-center gap-1.5 text-center text-[#414845] pt-0.5">
            <span className="material-symbols-outlined text-[16px] text-[#4ae176]">lock</span>
            <span className="text-[11px] font-medium">₦0 booking deposit required prior to physical walk-through</span>
          </div>
        </div>
      </div>

      {/* Cadastral Polygon Inspection Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-[#27313f]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-[#dee9fc]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#904d00]">satellite_alt</span>
                <h3 className="font-extrabold text-[16px] text-[#00271d]">Cadastral Coordinates</h3>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="w-8 h-8 rounded-full bg-[#e6eeff] flex items-center justify-center text-[#414845]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <img
              src={activeParcel.mapImage}
              alt="Detailed Cadastral survey"
              className="w-full h-44 object-cover rounded-xl border border-[#dee9fc]"
            />
            <div className="bg-[#eff4ff] p-3 rounded-xl text-[12px] flex flex-col gap-1.5">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-[#414845]">Beacon B412:</span>
                <span className="font-bold text-[#00271d]">7°23'14.2"N 4°01'38.5"E</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-[#414845]">Beacon B413:</span>
                <span className="font-bold text-[#00271d]">7°23'19.1"N 4°01'44.2"E</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-[#414845]">Beacon B414:</span>
                <span className="font-bold text-[#00271d]">7°23'11.8"N 4°01'48.9"E</span>
              </div>
            </div>
            <p className="text-[12px] text-[#414845] text-center">
              Verified by Oyo State Ministry of Lands &amp; Survey Registered Surveyor.
            </p>
            <button
              onClick={() => setShowMapModal(false)}
              className="w-full h-11 bg-[#00271d] text-white font-bold rounded-xl text-[13px]"
            >
              Done Viewing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
