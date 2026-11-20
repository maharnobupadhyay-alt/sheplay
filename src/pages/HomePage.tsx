import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MarathonEvent, PageId } from '../types';
import { MarathonCard } from '../components/MarathonCard';
import { SafeImage } from '../components/SafeImage';

interface HomePageProps {
  marathons: MarathonEvent[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onViewDetails: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

const QUICK_START_STEPS = [
  {
    number: '01',
    title: 'Choose a welcoming 3K or 5K wave',
    description:
      'Filter events by city, entry fee, and Beginner-Friendly waves where walk-jog intervals are celebrated.',
  },
  {
    number: '02',
    title: 'Follow the 8-week starter checklist',
    description:
      'Build from 60-second jog intervals to a comfortable 5 km morning run at your own pace.',
  },
  {
    number: '03',
    title: 'Prepare documents and bib pickup',
    description:
      'Review ID requirements, medical forms, and Expo pickup hours ahead of race weekend.',
  },
  {
    number: '04',
    title: 'Cross your first finish line',
    description:
      'Line up with volunteer pacers, enjoy hydration stops every 2 km, and earn your finisher medal.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  marathons,
  savedIds,
  onToggleSave,
  onViewDetails,
  onNavigate,
}) => {
  const featuredEvents = marathons.filter((m) => m.isBeginnerRecommended).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero Section: 2-column stretch split + full-width KPI strip below */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center py-2">
            <p className="text-xs font-semibold tracking-wide text-[#0D9488] mb-3">
              Women&apos;s Running &amp; Marathon Discovery Platform · Prototype
            </p>
            <h1
              className="font-display font-bold tracking-tight text-[#24132B] leading-[1.08] mb-5"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.6rem)' }}
            >
              Discover Your First Finish Line
            </h1>
            <p className="text-base sm:text-lg text-[#5C5669] leading-relaxed max-w-xl mb-8">
              Explore women-focused 3K, 5K, 10K, and marathon opportunities across India. Built especially for first-time runners with clear entry requirements, beginner guides, and saved race planning.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
              >
                <span>Explore Marathons</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('beginners')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#24132B] bg-white border border-[#D8D1DF] hover:border-[#24132B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24132B]"
              >
                <span>Beginner&apos;s Guide</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-xl overflow-hidden border border-[#E6E2EA] bg-[#F4F1F6]">
              <SafeImage
                src="/src/assets/images/hero_women_marathon_1795197362517.jpg"
                alt="Indian women runners smiling and running along a coastal promenade at sunrise"
                title="HERPLAY Women's Running Community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column sample prototype metrics strip */}
        <div className="mt-10 pt-8 border-t border-[#E6E2EA]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-[#5C5669]">
              Sample Prototype Metrics (Demonstration Data)
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
              <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#24132B]">
                10
              </p>
              <p className="text-sm font-medium text-[#5C5669] mt-1">
                Sample City Events Listed
              </p>
            </div>
            <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
              <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#24132B]">
                3K – 42K
              </p>
              <p className="text-sm font-medium text-[#5C5669] mt-1">
                Distance Waves Covered
              </p>
            </div>
            <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
              <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#0D9488]">
                8 Weeks
              </p>
              <p className="text-sm font-medium text-[#5C5669] mt-1">
                Guided Couch-to-5K Plan
              </p>
            </div>
            <div className="bg-white border border-[#E6E2EA] rounded-xl p-5">
              <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#E11D48]">
                ₹0+
              </p>
              <p className="text-sm font-medium text-[#5C5669] mt-1">
                Free 3K Starter Waves Included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Marathons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#0D9488] mb-1.5">
              Featured Sample Events · Beginner Recommended
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#24132B]">
              Upcoming Women&apos;s Marathons
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E11D48] hover:text-[#BE123C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Browse all {marathons.length} events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <MarathonCard
              key={event.id}
              event={event}
              isSaved={savedIds.includes(event.id)}
              onToggleSave={onToggleSave}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* Quick-Start Pathway for First-Time Runners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E6E2EA] rounded-xl p-6 sm:p-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-semibold text-[#0D9488] mb-2">
                  First-Time Runner Pathway
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#24132B] mb-3">
                  From zero kilometres to your first race bib
                </h2>
                <p className="text-sm sm:text-base text-[#5C5669] leading-relaxed">
                  You do not need prior athletics experience or fast mile times. Follow four structured steps designed for women lacing up for their very first event.
                </p>
              </div>

              <div className="aspect-[16/9] rounded-lg overflow-hidden border border-[#E6E2EA] bg-[#F4F1F6]">
                <SafeImage
                  src="/src/assets/images/beginner_guide_running_1795197369574.jpg"
                  alt="Two women beginner runners lacing up running shoes and stretching in a park"
                  title="Beginner Running Prep"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('beginners')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#24132B] hover:bg-[#E11D48] transition-colors cursor-pointer"
                >
                  <span>Open Beginner&apos;s Corner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center divide-y divide-[#ECE8F0]">
              {QUICK_START_STEPS.map((step) => (
                <div key={step.number} className="py-5 first:pt-0 last:pb-0 flex gap-5 items-start">
                  <span className="font-mono-tabular text-lg font-bold text-[#E11D48] shrink-0 pt-0.5">
                    {step.number}.
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#24132B] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#5C5669] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
