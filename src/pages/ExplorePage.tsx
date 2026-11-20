import React, { useMemo, useState } from 'react';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { DistanceCategory, ExperienceLevel, FeeBracket, MarathonEvent } from '../types';
import { MarathonCard } from '../components/MarathonCard';

interface ExplorePageProps {
  marathons: MarathonEvent[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const DISTANCES: ('All' | DistanceCategory)[] = ['All', '3K', '5K', '10K', '21K', '42K'];
const EXPERIENCE_LEVELS: ('All' | ExperienceLevel)[] = [
  'All',
  'Beginner-Friendly',
  'Intermediate',
  'Competitive',
];
const FEE_BRACKETS: ('All' | FeeBracket)[] = [
  'All',
  'Free',
  'Under ₹500',
  '₹500–₹1500',
  'Above ₹1500',
];

export const ExplorePage: React.FC<ExplorePageProps> = ({
  marathons,
  savedIds,
  onToggleSave,
  onViewDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedDistance, setSelectedDistance] = useState<'All' | DistanceCategory>('All');
  const [selectedLevel, setSelectedLevel] = useState<'All' | ExperienceLevel>('All');
  const [selectedFee, setSelectedFee] = useState<'All' | FeeBracket>('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [beginnerOnly, setBeginnerOnly] = useState(false);

  const cities = useMemo(
    () => ['All', ...Array.from(new Set(marathons.map((m) => m.city)))],
    [marathons]
  );

  const months = useMemo(
    () => ['All', ...Array.from(new Set(marathons.map((m) => m.month)))],
    [marathons]
  );

  const filteredMarathons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return marathons.filter((event) => {
      if (query) {
        const matchesQuery =
          event.name.toLowerCase().includes(query) ||
          event.city.toLowerCase().includes(query) ||
          event.venue.toLowerCase().includes(query) ||
          event.state.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }
      if (selectedCity !== 'All' && event.city !== selectedCity) return false;
      if (selectedDistance !== 'All' && !event.distances.includes(selectedDistance)) return false;
      if (selectedLevel !== 'All' && !event.experienceLevels.includes(selectedLevel)) return false;
      if (selectedFee !== 'All' && event.feeBracket !== selectedFee) return false;
      if (selectedMonth !== 'All' && event.month !== selectedMonth) return false;
      if (beginnerOnly && !event.isBeginnerRecommended) return false;
      return true;
    });
  }, [
    marathons,
    searchQuery,
    selectedCity,
    selectedDistance,
    selectedLevel,
    selectedFee,
    selectedMonth,
    beginnerOnly,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCity !== 'All' ||
    selectedDistance !== 'All' ||
    selectedLevel !== 'All' ||
    selectedFee !== 'All' ||
    selectedMonth !== 'All' ||
    beginnerOnly;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedDistance('All');
    setSelectedLevel('All');
    setSelectedFee('All');
    setSelectedMonth('All');
    setBeginnerOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-[#E6E2EA]">
        <p className="text-xs font-semibold text-[#0D9488]">
          Sample Marathon Directory · India
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#24132B]">
          Explore Women&apos;s Marathons
        </h1>
        <p className="text-sm sm:text-base text-[#5C5669] max-w-2xl">
          Filter sample upcoming races by city, distance, experience level, entry fee, or month. Bookmark your favourites to save them to your Dashboard.
        </p>
      </div>

      {/* Filter Toolbar */}
      <section
        aria-label="Event Search and Filters"
        className="bg-white border border-[#E6E2EA] rounded-xl p-5 space-y-5"
      >
        {/* Top Row: Search + Quick Beginner Toggle */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-[#5C5669] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="marathon-search" className="sr-only">
              Search marathons by event name, city, or venue
            </label>
            <input
              id="marathon-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event name, city (e.g. Kolkata, Mumbai), or venue..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D8D1DF] text-sm text-[#24132B] placeholder:text-[#8E869B] focus:outline-none focus:border-[#E11D48]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setBeginnerOnly((prev) => !prev)}
              aria-pressed={beginnerOnly}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                beginnerOnly
                  ? 'bg-[#0D9488] text-white border-[#0D9488]'
                  : 'bg-white text-[#24132B] border-[#D8D1DF] hover:border-[#0D9488]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Beginner-Friendly Only</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#52495E] hover:text-[#E11D48] hover:bg-[#FFF1F4] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Distance Segmented Control */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#5C5669] mr-2">Distance:</span>
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F4F1F6] rounded-lg">
            {DISTANCES.map((dist) => {
              const active = selectedDistance === dist;
              return (
                <button
                  key={dist}
                  type="button"
                  onClick={() => setSelectedDistance(dist)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono-tabular transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#E11D48] shadow-xs'
                      : 'text-[#52495E] hover:text-[#24132B]'
                  }`}
                >
                  {dist}
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-criteria Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[#ECE8F0]">
          <div>
            <label htmlFor="filter-city" className="block text-xs font-semibold text-[#5C5669] mb-1.5">
              City / Location
            </label>
            <select
              id="filter-city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#D8D1DF] bg-white text-sm text-[#24132B] focus:outline-none focus:border-[#E11D48]"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'All' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-level" className="block text-xs font-semibold text-[#5C5669] mb-1.5">
              Experience Level
            </label>
            <select
              id="filter-level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as 'All' | ExperienceLevel)}
              className="w-full px-3 py-2 rounded-lg border border-[#D8D1DF] bg-white text-sm text-[#24132B] focus:outline-none focus:border-[#E11D48]"
            >
              {EXPERIENCE_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl === 'All' ? 'All Experience Levels' : lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-fee" className="block text-xs font-semibold text-[#5C5669] mb-1.5">
              Entry Fee
            </label>
            <select
              id="filter-fee"
              value={selectedFee}
              onChange={(e) => setSelectedFee(e.target.value as 'All' | FeeBracket)}
              className="w-full px-3 py-2 rounded-lg border border-[#D8D1DF] bg-white text-sm text-[#24132B] focus:outline-none focus:border-[#E11D48]"
            >
              {FEE_BRACKETS.map((fee) => (
                <option key={fee} value={fee}>
                  {fee === 'All' ? 'All Fee Ranges' : fee}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-month" className="block text-xs font-semibold text-[#5C5669] mb-1.5">
              Event Month
            </label>
            <select
              id="filter-month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#D8D1DF] bg-white text-sm text-[#24132B] focus:outline-none focus:border-[#E11D48]"
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m === 'All' ? 'All Months (2026)' : `${m} 2026`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-[#5C5669]">
        <p>
          Showing{' '}
          <span className="font-mono-tabular font-semibold text-[#24132B]">
            {filteredMarathons.length}
          </span>{' '}
          of{' '}
          <span className="font-mono-tabular font-semibold text-[#24132B]">
            {marathons.length}
          </span>{' '}
          sample marathons
        </p>
      </div>

      {/* Results Grid or Empty State */}
      {filteredMarathons.length === 0 ? (
        <div className="bg-white border border-[#E6E2EA] rounded-xl p-10 text-center space-y-4">
          <h2 className="font-display text-xl font-bold text-[#24132B]">
            No marathons match those exact filters
          </h2>
          <p className="text-sm text-[#5C5669] max-w-md mx-auto">
            Try clearing one or more filters—such as month or fee bracket—to view more women&apos;s running events.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarathons.map((event) => (
            <MarathonCard
              key={event.id}
              event={event}
              isSaved={savedIds.includes(event.id)}
              onToggleSave={onToggleSave}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
