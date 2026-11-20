import React, { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { SAMPLE_HISTORY } from '../data/mockHistory';

export const HistoryPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState('All');
  const [selectedYear, setSelectedYear] = useState<'All' | number>('All');

  const eventNames = useMemo(
    () => ['All', ...Array.from(new Set(SAMPLE_HISTORY.map((h) => h.eventName)))],
    []
  );

  const years = useMemo(
    () =>
      ['All', ...Array.from(new Set(SAMPLE_HISTORY.map((h) => h.year))).sort((a, b) => b - a)] as (
        | 'All'
        | number
      )[],
    []
  );

  const filteredEditions = useMemo(() => {
    return SAMPLE_HISTORY.filter((item) => {
      if (selectedEvent !== 'All' && item.eventName !== selectedEvent) return false;
      if (selectedYear !== 'All' && item.year !== selectedYear) return false;
      return true;
    });
  }, [selectedEvent, selectedYear]);

  const totalWomenFinishers = useMemo(
    () => filteredEditions.reduce((sum, item) => sum + item.totalWomenParticipants, 0),
    [filteredEditions]
  );

  const avgFirstTimers = useMemo(() => {
    if (filteredEditions.length === 0) return 0;
    const sum = filteredEditions.reduce((acc, item) => acc + item.firstTimeFinishersPct, 0);
    return Math.round(sum / filteredEditions.length);
  }, [filteredEditions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-10">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-[#E6E2EA]">
        <p className="text-xs font-semibold text-[#0D9488]">
          Sample Historical Archive · Demonstration Data (2023–2025)
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#24132B]">
          Marathon History &amp; Past Editions
        </h1>
        <p className="text-sm sm:text-base text-[#5C5669] max-w-2xl">
          Explore past women&apos;s marathon editions, winning finishing times, participation numbers, and first-timer milestones. All records shown are sample archive data.
        </p>
      </div>

      {/* Filters */}
      <section className="bg-white border border-[#E6E2EA] rounded-xl p-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="grid sm:grid-cols-2 gap-4 flex-1">
          <div>
            <label htmlFor="history-event" className="block text-xs font-semibold text-[#5C5669] mb-1.5">
              Filter by Event Series
            </label>
            <select
              id="history-event"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D1DF] bg-white text-sm text-[#24132B] focus:outline-none focus:border-[#E11D48]"
            >
              {eventNames.map((name) => (
                <option key={name} value={name}>
                  {name === 'All' ? 'All Event Series' : name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5C5669] mb-1.5">
              Filter by Edition Year
            </label>
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F4F1F6] rounded-lg">
              {years.map((yr) => {
                const active = selectedYear === yr;
                return (
                  <button
                    key={String(yr)}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold font-mono-tabular transition-colors cursor-pointer ${
                      active
                        ? 'bg-white text-[#E11D48] shadow-xs'
                        : 'text-[#52495E] hover:text-[#24132B]'
                    }`}
                  >
                    {yr === 'All' ? 'All Years' : yr}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {(selectedEvent !== 'All' || selectedYear !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setSelectedEvent('All');
              setSelectedYear('All');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#52495E] hover:text-[#E11D48] hover:bg-[#FFF1F4] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        )}
      </section>

      {/* Summary Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
          <p className="text-xs font-medium text-[#5C5669] mb-1.5">
            Editions Shown (Sample)
          </p>
          <p className="font-mono-tabular text-3xl font-bold text-[#24132B]">
            {filteredEditions.length}
          </p>
        </div>
        <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
          <p className="text-xs font-medium text-[#5C5669] mb-1.5">
            Total Women Participants (Sample)
          </p>
          <p className="font-mono-tabular text-3xl font-bold text-[#E11D48]">
            {totalWomenFinishers.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
          <p className="text-xs font-medium text-[#5C5669] mb-1.5">
            Avg. First-Time Runners
          </p>
          <p className="font-mono-tabular text-3xl font-bold text-[#0D9488]">
            {avgFirstTimers}%
          </p>
        </div>
      </section>

      {/* Empty State or Archive Table + Highlights */}
      {filteredEditions.length === 0 ? (
        <div className="bg-white border border-[#E6E2EA] rounded-xl p-10 text-center space-y-3">
          <h2 className="font-display text-xl font-bold text-[#24132B]">
            No sample editions recorded for that combination
          </h2>
          <p className="text-sm text-[#5C5669]">
            Select All Years or another event series to inspect past podium times.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedEvent('All');
              setSelectedYear('All');
            }}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#24132B] hover:bg-[#E11D48] transition-colors cursor-pointer"
          >
            Show All Editions
          </button>
        </div>
      ) : (
        <>
          {/* Detailed Results Table */}
          <section className="bg-white border border-[#E6E2EA] rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-[#24132B]">
                Past Winners &amp; Participation Ledger
              </h2>
              <span className="text-xs text-[#5C5669]">
                All names and finishing times are sample data
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#E6E2EA] text-xs font-semibold text-[#5C5669]">
                    <th className="py-3 pr-4">Year</th>
                    <th className="py-3 pr-4">Event &amp; City</th>
                    <th className="py-3 pr-4">Headline Distance</th>
                    <th className="py-3 pr-4">Winner</th>
                    <th className="py-3 pr-4 text-right">Winning Time</th>
                    <th className="py-3 pr-4 text-right">Women Finishers</th>
                    <th className="py-3 pl-4 text-right">First-Timers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE8F0]">
                  {filteredEditions.map((ed) => (
                    <tr key={ed.id} className="hover:bg-[#FAF9FB] transition-colors">
                      <td className="py-3.5 pr-4 font-mono-tabular font-semibold text-[#24132B]">
                        {ed.year}
                      </td>
                      <td className="py-3.5 pr-4">
                        <p className="font-semibold text-[#24132B]">{ed.eventName}</p>
                        <p className="text-xs text-[#5C5669]">
                          {ed.city} · {ed.date}
                        </p>
                      </td>
                      <td className="py-3.5 pr-4 text-[#52495E]">{ed.featuredDistance}</td>
                      <td className="py-3.5 pr-4">
                        <p className="font-semibold text-[#24132B]">{ed.winnerName}</p>
                        <p className="text-xs text-[#5C5669]">{ed.winnerClubOrCity}</p>
                      </td>
                      <td className="py-3.5 pr-4 text-right font-mono-tabular font-semibold text-[#E11D48]">
                        {ed.winningTime}
                      </td>
                      <td className="py-3.5 pr-4 text-right font-mono-tabular text-[#24132B]">
                        {ed.totalWomenParticipants.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 pl-4 text-right font-mono-tabular text-[#0D9488] font-semibold">
                        {ed.firstTimeFinishersPct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Edition Highlights & Podium Cards */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#24132B]">
              Podium Breakdown &amp; Edition Highlights
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredEditions.map((ed) => (
                <article
                  key={ed.id}
                  className="bg-white border border-[#E6E2EA] rounded-xl p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-[#5C5669]">
                    <span className="font-mono-tabular font-semibold text-[#E11D48]">{ed.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ed.city}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ed.featuredDistance}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#0D9488]">Sample Archive</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#24132B]">
                    {ed.eventName}
                  </h3>

                  <p className="text-sm text-[#5C5669] leading-relaxed">
                    {ed.highlightNote}
                  </p>

                  <div className="pt-3 border-t border-[#ECE8F0] space-y-1.5 text-xs">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#5C5669]">1st · {ed.winnerName}</span>
                      <span className="font-mono-tabular font-semibold text-[#24132B]">
                        {ed.winningTime}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#5C5669]">2nd · {ed.runnerUpName}</span>
                      <span className="font-mono-tabular text-[#52495E]">
                        {ed.runnerUpTime}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#5C5669]">3rd · {ed.thirdPlaceName}</span>
                      <span className="font-mono-tabular text-[#52495E]">
                        {ed.thirdPlaceTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
