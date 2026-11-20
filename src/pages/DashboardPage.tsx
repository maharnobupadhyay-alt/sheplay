import React from 'react';
import { ArrowRight, Bookmark, Calendar } from 'lucide-react';
import { MarathonEvent, PageId } from '../types';
import { ANNOUNCEMENTS } from '../data/mockMarathons';
import { EIGHT_WEEK_PLAN } from '../data/beginnerContent';
import { MarathonCard } from '../components/MarathonCard';

interface DashboardPageProps {
  marathons: MarathonEvent[];
  savedIds: string[];
  completedChecklistIds: string[];
  onToggleSave: (id: string) => void;
  onViewDetails: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  marathons,
  savedIds,
  completedChecklistIds,
  onToggleSave,
  onViewDetails,
  onNavigate,
}) => {
  const savedEvents = marathons.filter((m) => savedIds.includes(m.id));
  const beginnerRecommended = marathons
    .filter((m) => m.isBeginnerRecommended && (m.distances.includes('3K') || m.distances.includes('5K')))
    .slice(0, 3);

  const totalChecklistTasks = EIGHT_WEEK_PLAN.reduce((sum, w) => sum + w.tasks.length, 0);
  const completedPct =
    totalChecklistTasks > 0
      ? Math.round((completedChecklistIds.length / totalChecklistTasks) * 100)
      : 0;

  const freeEntryCount = marathons.filter((m) => m.feeBracket === 'Free').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E6E2EA]">
        <div>
          <p className="text-xs font-semibold text-[#0D9488] mb-1.5">
            Personalised Runner Overview · Session Saved Locally
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#24132B]">
            Your Runner Dashboard
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('beginners')}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#24132B] bg-white border border-[#D8D1DF] hover:border-[#24132B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            8-Week Prep Plan
          </button>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Find Races</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Upcoming Events Summary KPI Cards */}
      <section aria-label="Runner Summary Metrics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
            <p className="text-xs font-medium text-[#5C5669] mb-2">
              Saved Events
            </p>
            <p className="font-mono-tabular text-3xl font-bold text-[#E11D48]">
              {savedEvents.length}
            </p>
            <p className="text-xs text-[#5C5669] mt-1">
              Synced across all pages
            </p>
          </div>

          <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
            <p className="text-xs font-medium text-[#5C5669] mb-2">
              Beginner 3K/5K Picks
            </p>
            <p className="font-mono-tabular text-3xl font-bold text-[#24132B]">
              {marathons.filter((m) => m.isBeginnerRecommended).length}
            </p>
            <p className="text-xs text-[#5C5669] mt-1">
              Sample events open now
            </p>
          </div>

          <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
            <p className="text-xs font-medium text-[#5C5669] mb-2">
              Free 3K Starter Waves
            </p>
            <p className="font-mono-tabular text-3xl font-bold text-[#0D9488]">
              {freeEntryCount}
            </p>
            <p className="text-xs text-[#5C5669] mt-1">
              Kolkata &amp; Chennai events
            </p>
          </div>

          <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
            <p className="text-xs font-medium text-[#5C5669] mb-2">
              8-Week Prep Progress
            </p>
            <p className="font-mono-tabular text-3xl font-bold text-[#24132B]">
              {completedPct}%
            </p>
            <p className="text-xs text-[#5C5669] mt-1">
              {completedChecklistIds.length} of {totalChecklistTasks} tasks done
            </p>
          </div>
        </div>
      </section>

      {/* Saved / Favourite Events */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#24132B]">
              Saved &amp; Favourite Marathons
            </h2>
            <p className="text-sm text-[#5C5669]">
              Bookmark any marathon card across HERPLAY to track dates and registration deadlines here.
            </p>
          </div>
          {savedEvents.length > 0 && (
            <span className="font-mono-tabular text-xs font-semibold text-[#0D9488]">
              {savedEvents.length} {savedEvents.length === 1 ? 'event' : 'events'} bookmarked
            </span>
          )}
        </div>

        {savedEvents.length === 0 ? (
          <div className="bg-white border border-[#E6E2EA] rounded-xl p-8 sm:p-10 text-center space-y-4">
            <div className="mx-auto w-11 h-11 rounded-lg bg-[#FFF1F4] text-[#E11D48] flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <div className="max-w-md mx-auto space-y-1.5">
              <h3 className="font-display text-lg font-semibold text-[#24132B]">
                No saved marathons yet
              </h3>
              <p className="text-sm text-[#5C5669]">
                Tap the heart icon on any event in Explore Marathons or Recommended Picks to build your personal race shortlist.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#24132B] hover:bg-[#E11D48] transition-colors cursor-pointer"
            >
              <span>Browse Marathons</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEvents.map((event) => (
              <MarathonCard
                key={event.id}
                event={event}
                isSaved={true}
                onToggleSave={onToggleSave}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recommended Marathons + Announcements Split */}
      <section className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#0D9488] mb-1">
                Tailored for First-Time Runners
              </p>
              <h2 className="font-display text-2xl font-bold text-[#24132B]">
                Recommended 3K &amp; 5K Events
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="text-sm font-semibold text-[#E11D48] hover:text-[#BE123C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              View all filters
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {beginnerRecommended.slice(0, 2).map((event) => (
              <MarathonCard
                key={event.id}
                event={event}
                isSaved={savedIds.includes(event.id)}
                onToggleSave={onToggleSave}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>

        {/* Announcements & Reminders Panel */}
        <aside className="lg:col-span-4 bg-white border border-[#E6E2EA] rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#ECE8F0]">
            <h2 className="font-display text-lg font-bold text-[#24132B]">
              Announcements &amp; Reminders
            </h2>
            <Calendar className="w-4 h-4 text-[#5C5669]" aria-hidden="true" />
          </div>

          <div className="divide-y divide-[#ECE8F0]">
            {ANNOUNCEMENTS.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[#5C5669]">
                  <span className="font-semibold text-[#E11D48]">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{item.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#24132B]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5C5669] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
};
