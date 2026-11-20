import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Heart, Square } from 'lucide-react';
import { MarathonEvent } from '../types';
import { SafeImage } from '../components/SafeImage';
import { RegisterInterestModal } from '../components/RegisterInterestModal';

interface MarathonDetailsPageProps {
  event: MarathonEvent;
  isSaved: boolean;
  backLabel: string;
  onBack: () => void;
  onToggleSave: (id: string) => void;
  onBookmarkIfNeeded: (id: string) => void;
}

export const MarathonDetailsPage: React.FC<MarathonDetailsPageProps> = ({
  event,
  isSaved,
  backLabel,
  onBack,
  onToggleSave,
  onBookmarkIfNeeded,
}) => {
  const [checkedDocs, setCheckedDocs] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) =>
      prev.includes(doc) ? prev.filter((item) => item !== doc) : [...prev, doc]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-10">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E6E2EA]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-[#24132B] hover:bg-[#F4F1F6] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleSave(event.id)}
            aria-pressed={isSaved}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#FFF1F4] border-[#E11D48] text-[#E11D48]'
                : 'bg-white border-[#D8D1DF] text-[#24132B] hover:border-[#24132B]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save Event'}</span>
          </button>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Register Interest (Demo)
          </button>
        </div>
      </div>

      {/* Event Hero Overview */}
      <section className="grid lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-6">
          <div className="h-full min-h-[260px] sm:min-h-[340px] rounded-xl overflow-hidden border border-[#E6E2EA] bg-[#F4F1F6]">
            <SafeImage
              src={event.imageUrl}
              alt={`${event.name} course preview`}
              title={event.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[#0D9488]">
              {event.city}, {event.state} · {event.dateDisplay} · Sample Event Data
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#24132B] leading-tight">
              {event.name}
            </h1>
            <p className="text-base text-[#5C5669] leading-relaxed">
              {event.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E6E2EA] text-sm">
            <div>
              <p className="text-xs font-medium text-[#5C5669]">Start &amp; Finish Venue</p>
              <p className="font-semibold text-[#24132B] mt-0.5">{event.venue}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#5C5669]">Registration Deadline</p>
              <p className="font-mono-tabular font-semibold text-[#E11D48] mt-0.5">
                {event.registrationDeadline}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#5C5669]">Course Profile</p>
              <p className="font-semibold text-[#24132B] mt-0.5">{event.courseTerrain}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#5C5669]">Expected Field Size</p>
              <p className="font-mono-tabular font-semibold text-[#24132B] mt-0.5">
                ~{event.expectedParticipants.toLocaleString('en-IN')} runners
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E6E2EA]">
            <p className="text-xs font-semibold text-[#24132B] mb-2">
              Runner Support Highlights
            </p>
            <ul className="space-y-1.5 text-sm text-[#5C5669]">
              {event.supportHighlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="text-[#0D9488] font-bold" aria-hidden="true">·</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Race Categories & Entry Fees Table */}
      <section className="bg-white border border-[#E6E2EA] rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="font-display text-2xl font-bold text-[#24132B]">
            Race Categories &amp; Entry Fees
          </h2>
          <span className="text-xs text-[#5C5669]">
            Sample fees shown in Indian Rupees (INR)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#E6E2EA] text-xs font-semibold text-[#5C5669]">
                <th className="py-3 pr-4">Distance</th>
                <th className="py-3 pr-4">Wave Name</th>
                <th className="py-3 pr-4">Flag-Off</th>
                <th className="py-3 pr-4">Cut-Off</th>
                <th className="py-3 pr-4">Timing Chip</th>
                <th className="py-3 pr-4 text-right">Min Age</th>
                <th className="py-3 pl-4 text-right">Entry Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8F0]">
              {event.categories.map((cat) => (
                <tr key={cat.distance} className="hover:bg-[#FAF9FB] transition-colors">
                  <td className="py-3.5 pr-4 font-mono-tabular font-bold text-[#E11D48]">
                    {cat.distance}
                  </td>
                  <td className="py-3.5 pr-4 font-semibold text-[#24132B]">{cat.label}</td>
                  <td className="py-3.5 pr-4 font-mono-tabular text-[#52495E]">{cat.startTime}</td>
                  <td className="py-3.5 pr-4 font-mono-tabular text-[#52495E]">{cat.cutoff}</td>
                  <td className="py-3.5 pr-4 text-[#52495E]">
                    {cat.timingChip ? 'Included' : 'Non-timed wave'}
                  </td>
                  <td className="py-3.5 pr-4 font-mono-tabular text-right text-[#52495E]">
                    {cat.minimumAge}+
                  </td>
                  <td className="py-3.5 pl-4 font-mono-tabular text-right font-semibold text-[#24132B]">
                    {cat.feeInr === 0 ? 'Free' : `₹${cat.feeInr.toLocaleString('en-IN')}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Prize Money + Eligibility / Documents Grid */}
      <section className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white border border-[#E6E2EA] rounded-xl p-6 space-y-6">
          <div>
            <h2 className="font-display text-xl font-bold text-[#24132B] mb-1">
              Sample Prize Money Breakdown
            </h2>
            <p className="text-xs text-[#5C5669]">
              Placeholder podium awards for demonstration purposes.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#E6E2EA] text-xs font-semibold text-[#5C5669]">
                  <th className="py-2.5 pr-3">Category</th>
                  <th className="py-2.5 pr-3 text-right">1st Place</th>
                  <th className="py-2.5 pr-3 text-right">2nd Place</th>
                  <th className="py-2.5 pl-3 text-right">3rd Place</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE8F0]">
                {event.prizeMoney.map((tier) => (
                  <tr key={tier.category}>
                    <td className="py-3 pr-3 font-semibold text-[#24132B]">{tier.category}</td>
                    <td className="py-3 pr-3 text-right font-mono-tabular text-[#0D9488] font-semibold">
                      {tier.first}
                    </td>
                    <td className="py-3 pr-3 text-right font-mono-tabular text-[#52495E]">
                      {tier.second}
                    </td>
                    <td className="py-3 pl-3 text-right font-mono-tabular text-[#52495E]">
                      {tier.third}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-[#ECE8F0] space-y-2.5">
            <h3 className="font-display text-lg font-bold text-[#24132B]">
              Eligibility Requirements
            </h3>
            <ul className="space-y-2 text-sm text-[#5C5669] leading-relaxed">
              {event.eligibility.map((rule) => (
                <li key={rule} className="flex items-start gap-2">
                  <span className="text-[#E11D48] font-bold" aria-hidden="true">·</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Required Documents Checklist + Step-by-Step Guide */}
        <div className="lg:col-span-6 bg-white border border-[#E6E2EA] rounded-xl p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <h2 className="font-display text-xl font-bold text-[#24132B]">
                Required Documents Checklist
              </h2>
              <span className="font-mono-tabular text-xs font-semibold text-[#0D9488]">
                {checkedDocs.length}/{event.requiredDocuments.length} ready
              </span>
            </div>
            <p className="text-xs text-[#5C5669] mb-4">
              Click items below to verify you have them ready before bib pickup.
            </p>

            <div className="space-y-2">
              {event.requiredDocuments.map((doc) => {
                const isChecked = checkedDocs.includes(doc);
                return (
                  <button
                    key={doc}
                    type="button"
                    onClick={() => toggleDoc(doc)}
                    aria-pressed={isChecked}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left text-sm transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-[#F0FDFA] border-[#0D9488] text-[#24132B]'
                        : 'bg-[#FAF9FB] border-[#E6E2EA] text-[#52495E] hover:border-[#C9C1D1]'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-[#8E869B] shrink-0 mt-0.5" />
                    )}
                    <span className={isChecked ? 'line-through opacity-80' : ''}>{doc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#ECE8F0] space-y-4">
            <h3 className="font-display text-lg font-bold text-[#24132B]">
              Step-by-Step Registration Guide
            </h3>
            <div className="space-y-3">
              {event.registrationSteps.map((step) => (
                <div key={step.step} className="flex gap-3 items-start">
                  <span className="font-mono-tabular text-sm font-bold text-[#E11D48] shrink-0">
                    0{step.step}.
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#24132B]">{step.title}</p>
                    <p className="text-xs text-[#5C5669] leading-relaxed mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-[#ECE8F0] text-xs text-[#5C5669]">
              <span className="font-semibold text-[#24132B]">Bib Pickup Window: </span>
              {event.bibPickupInfo}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Bar */}
      <section className="bg-white border border-[#E6E2EA] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-[#24132B]">
            Ready to try registering your interest?
          </h2>
          <p className="text-sm text-[#5C5669]">
            Submit a demo interest entry to see the registration flow and save this marathon to your Dashboard.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Register Interest (Demo)
        </button>
      </section>

      <RegisterInterestModal
        event={event}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onBookmarkIfNeeded={onBookmarkIfNeeded}
      />
    </div>
  );
};
