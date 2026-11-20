import React, { useState } from 'react';
import { ArrowRight, CheckSquare, ChevronDown, RotateCcw, Square } from 'lucide-react';
import {
  BEGINNER_FAQS,
  COUCH_TO_5K_PHASES,
  EIGHT_WEEK_PLAN,
  RACE_DAY_SECTIONS,
} from '../data/beginnerContent';
import { PageId } from '../types';
import { SafeImage } from '../components/SafeImage';

interface BeginnersCornerPageProps {
  completedChecklistIds: string[];
  onToggleChecklistTask: (taskId: string) => void;
  onResetChecklist: () => void;
  onNavigate: (page: PageId) => void;
}

export const BeginnersCornerPage: React.FC<BeginnersCornerPageProps> = ({
  completedChecklistIds,
  onToggleChecklistTask,
  onResetChecklist,
  onNavigate,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string>(BEGINNER_FAQS[0].id);

  const totalTasks = EIGHT_WEEK_PLAN.reduce((sum, week) => sum + week.tasks.length, 0);
  const completedCount = completedChecklistIds.length;
  const progressPct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-16">
      {/* Hero Banner */}
      <section className="grid lg:grid-cols-12 gap-8 items-stretch pb-8 border-b border-[#E6E2EA]">
        <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
          <p className="text-xs font-semibold text-[#0D9488]">
            First-Time Runner Resource Hub
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#24132B] leading-tight">
            Beginner&apos;s Corner: Start Safely, Finish Proud
          </h1>
          <p className="text-base text-[#5C5669] leading-relaxed">
            Every marathoner started with her very first kilometre. Use our structured Couch-to-5K phases, interactive 8-week prep checklist, and race-morning guide to reach your first start line calmly.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] transition-colors cursor-pointer"
            >
              <span>Find a Beginner 3K / 5K</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById('eight-week-plan')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#24132B] bg-white border border-[#D8D1DF] hover:border-[#24132B] transition-colors cursor-pointer"
            >
              Jump to 8-Week Checklist
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="h-full min-h-[240px] sm:min-h-[300px] rounded-xl overflow-hidden border border-[#E6E2EA] bg-[#F4F1F6]">
            <SafeImage
              src="/src/assets/images/beginner_guide_running_1795197369574.jpg"
              alt="Two women beginner runners smiling and preparing for a morning park jog"
              title="HERPLAY Beginner's Corner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 1: How to Start Running (Couch to 5K Breakdown) */}
      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-[#0D9488] mb-1">
            Couch to 5K Methodology
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#24132B]">
            How to Start Running
          </h2>
          <p className="text-sm text-[#5C5669] mt-1 max-w-2xl">
            Forget speed for your first two months. Consistency and gentle walk-run intervals protect your joints and build lasting endurance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COUCH_TO_5K_PHASES.map((phase) => (
            <article
              key={phase.phase}
              className="bg-white border border-[#E6E2EA] rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-xs text-[#5C5669]">
                <span className="font-mono-tabular font-semibold text-[#E11D48]">
                  {phase.weeks}
                </span>
                <span className="font-mono-tabular text-[#0D9488] font-medium">
                  {phase.ratio}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#24132B]">
                {phase.phase}
              </h3>
              <p className="text-sm text-[#5C5669] leading-relaxed">
                {phase.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Section 2: Interactive 8-Week Beginner Marathon Prep Checklist */}
      <section id="eight-week-plan" className="space-y-6">
        <div className="bg-white border border-[#E6E2EA] rounded-xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#0D9488] mb-1">
                Saved Automatically to Your Browser
              </p>
              <h2 className="font-display text-2xl font-bold text-[#24132B]">
                8-Week Beginner Marathon Prep Checklist
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-mono-tabular text-xl font-bold text-[#E11D48]">
                  {progressPct}%
                </p>
                <p className="font-mono-tabular text-xs text-[#5C5669]">
                  {completedCount}/{totalTasks} tasks complete
                </p>
              </div>
              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={onResetChecklist}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#52495E] hover:text-[#E11D48] hover:bg-[#FFF1F4] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="8-week beginner marathon prep completion"
            className="h-2.5 w-full rounded-md bg-[#F4F1F6] overflow-hidden"
          >
            <div
              className="h-full bg-[#0D9488] transition-all duration-200"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {EIGHT_WEEK_PLAN.map((weekPlan) => {
            const weekDoneCount = weekPlan.tasks.filter((t) =>
              completedChecklistIds.includes(t.id)
            ).length;
            const weekAllDone = weekDoneCount === weekPlan.tasks.length;

            return (
              <article
                key={weekPlan.week}
                className="bg-white border border-[#E6E2EA] rounded-xl p-5 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#5C5669] mb-1">
                      <span>{weekPlan.sessionsPerWeek} sessions/wk</span>
                      <span aria-hidden="true">·</span>
                      <span>{weekPlan.weeklyGoalKm}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#24132B]">
                      {weekPlan.title}
                    </h3>
                    <p className="text-xs text-[#5C5669] mt-0.5">{weekPlan.focus}</p>
                  </div>

                  <span
                    className={`font-mono-tabular text-xs font-semibold shrink-0 ${
                      weekAllDone ? 'text-[#0D9488]' : 'text-[#5C5669]'
                    }`}
                  >
                    {weekDoneCount}/{weekPlan.tasks.length}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#ECE8F0]">
                  {weekPlan.tasks.map((task) => {
                    const checked = completedChecklistIds.includes(task.id);
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => onToggleChecklistTask(task.id)}
                        aria-pressed={checked}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left text-sm transition-colors cursor-pointer ${
                          checked
                            ? 'bg-[#F0FDFA] border-[#0D9488] text-[#24132B]'
                            : 'bg-[#FAF9FB] border-[#E6E2EA] text-[#52495E] hover:border-[#C9C1D1]'
                        }`}
                      >
                        {checked ? (
                          <CheckSquare className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-[#8E869B] shrink-0 mt-0.5" />
                        )}
                        <span className={checked ? 'line-through opacity-80' : ''}>
                          {task.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: What to Expect on Race Day */}
      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-[#0D9488] mb-1">
            Zero-Surprise Race Morning
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#24132B]">
            What to Expect on Race Day
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {RACE_DAY_SECTIONS.map((sec) => (
            <article
              key={sec.title}
              className="bg-white border border-[#E6E2EA] rounded-xl p-6 space-y-3"
            >
              <h3 className="font-display text-lg font-bold text-[#24132B]">
                {sec.title}
              </h3>
              <ul className="space-y-2 text-sm text-[#5C5669] leading-relaxed">
                {sec.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold" aria-hidden="true">·</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Section 4: FAQ Accordion */}
      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-[#0D9488] mb-1">
            First-Timer Questions Answered
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#24132B]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="bg-white border border-[#E6E2EA] rounded-xl divide-y divide-[#ECE8F0]">
          {BEGINNER_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-[#FAF9FB] transition-colors cursor-pointer"
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-[#24132B]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#5C5669] shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-[#E11D48]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-[#5C5669] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
