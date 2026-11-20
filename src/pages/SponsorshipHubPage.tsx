import React, { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SAMPLE_SPONSORS, SPONSORSHIP_PACKAGES } from '../data/mockSponsors';

type SponsorTierFilter = 'All' | 'Title Sponsor' | 'Hydration Partner' | 'Apparel Partner';

export const SponsorshipHubPage: React.FC = () => {
  const [tierFilter, setTierFilter] = useState<SponsorTierFilter>('All');

  // Demo Partnership Inquiry Form state
  const [inquiryRole, setInquiryRole] = useState<'Brand Sponsor' | 'Event Organiser'>('Brand Sponsor');
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredTier, setPreferredTier] = useState('Title Partner');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<{
    orgName: string;
    inquiryRole: string;
    preferredTier: string;
  } | null>(null);

  const filteredSponsors = useMemo(() => {
    if (tierFilter === 'All') return SAMPLE_SPONSORS;
    return SAMPLE_SPONSORS.filter((s) => s.tier === tierFilter);
  }, [tierFilter]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) {
      setFormError('Please enter your brand or race organisation name.');
      return;
    }
    if (!contactName.trim()) {
      setFormError('Please enter a contact person name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid work email address.');
      return;
    }
    setFormError('');
    setSubmittedRecord({
      orgName: orgName.trim(),
      inquiryRole,
      preferredTier,
    });
  };

  const resetInquiry = () => {
    setSubmittedRecord(null);
    setOrgName('');
    setContactName('');
    setEmail('');
    setNotes('');
    setFormError('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-14">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-[#E6E2EA]">
        <p className="text-xs font-semibold text-[#0D9488]">
          Partnerships &amp; Grassroots Visibility · Sample Showcase
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#24132B]">
          Sponsorship Hub
        </h1>
        <p className="text-sm sm:text-base text-[#5C5669] max-w-2xl">
          Connect mission-aligned brands with women&apos;s running communities, subsidize first-time 3K/5K runner entries, and help event organisers deliver safer race mornings.
        </p>
      </div>

      {/* Current Sample Event Sponsors */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#24132B]">
              Sample Event Sponsors
            </h2>
            <p className="text-sm text-[#5C5669]">
              Illustrative tiered partners supporting women&apos;s race series across India.
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F4F1F6] rounded-lg">
            {(['All', 'Title Sponsor', 'Hydration Partner', 'Apparel Partner'] as SponsorTierFilter[]).map(
              (tier) => {
                const active = tierFilter === tier;
                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setTierFilter(tier)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white text-[#E11D48] shadow-xs'
                        : 'text-[#52495E] hover:text-[#24132B]'
                    }`}
                  >
                    {tier === 'All' ? 'All Tiers' : tier}
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSponsors.map((sponsor) => (
            <article
              key={sponsor.id}
              className="bg-white border border-[#E6E2EA] rounded-xl p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#5C5669]">
                  <span className="font-semibold text-[#E11D48]">{sponsor.tier}</span>
                  <span aria-hidden="true">·</span>
                  <span>{sponsor.sector}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#24132B]">
                  {sponsor.name}
                </h3>
                <p className="text-sm text-[#5C5669] leading-relaxed">
                  {sponsor.contributionSummary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#ECE8F0] space-y-1 text-xs">
                <p className="text-[#5C5669]">
                  <span className="font-semibold text-[#24132B]">Events Supported: </span>
                  {sponsor.supportedEvents}
                </p>
                <p className="font-mono-tabular text-[#0D9488]">{sponsor.websiteLabel}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Become a Sponsor Tiers */}
      <section className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[#0D9488]">
            Brand Visibility &amp; Community Impact
          </p>
          <h2 className="font-display text-2xl font-bold text-[#24132B]">
            Become a Sponsor — Sample Partnership Tiers
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {SPONSORSHIP_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className="bg-white border border-[#E6E2EA] rounded-xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-[#5C5669]">{pkg.targetAudience}</p>
                  <h3 className="font-display text-xl font-bold text-[#24132B] mt-0.5">
                    {pkg.tierName}
                  </h3>
                </div>

                <div className="py-3 border-y border-[#ECE8F0]">
                  <p className="font-mono-tabular text-base font-bold text-[#E11D48]">
                    {pkg.sampleContribution}
                  </p>
                  <p className="text-xs text-[#5C5669] mt-0.5">{pkg.runnerReach}</p>
                </div>

                <ul className="space-y-2 text-sm text-[#52495E]">
                  {pkg.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#0D9488] font-bold" aria-hidden="true">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInquiryRole('Brand Sponsor');
                  setPreferredTier(pkg.tierName);
                  document.getElementById('partnership-inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-[#24132B] bg-[#FAF9FB] border border-[#D8D1DF] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors cursor-pointer"
              >
                Inquire About {pkg.tierName}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* For Event Organisers + Interactive Inquiry Form Split */}
      <section
        id="partnership-inquiry-form"
        className="grid lg:grid-cols-12 gap-8 items-start"
      >
        {/* For Event Organisers Info */}
        <div className="lg:col-span-5 bg-white border border-[#E6E2EA] rounded-xl p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs font-semibold text-[#0D9488] mb-1">
              For Race Directors &amp; Run Clubs
            </p>
            <h2 className="font-display text-2xl font-bold text-[#24132B]">
              For Event Organisers
            </h2>
          </div>

          <p className="text-sm text-[#5C5669] leading-relaxed">
            Organising a women-only marathon, 5K community run, or beginner clinic? HERPLAY helps race directors surface transparent runner info and attract hydration, apparel, and scholarship sponsors.
          </p>

          <div className="divide-y divide-[#ECE8F0] text-sm">
            <div className="py-3.5 first:pt-0">
              <p className="font-semibold text-[#24132B]">01. Beginner-Readiness Badges</p>
              <p className="text-xs text-[#5C5669] mt-1 leading-relaxed">
                Highlight cut-off buffers, pacer availability, women-only changing tents, and free 3K entry allocations.
              </p>
            </div>
            <div className="py-3.5">
              <p className="font-semibold text-[#24132B]">02. Sponsor Matchmaking</p>
              <p className="text-xs text-[#5C5669] mt-1 leading-relaxed">
                Pair regional runs with hydration, recovery, and apparel brands seeking authentic grassroots visibility.
              </p>
            </div>
            <div className="py-3.5 last:pb-0">
              <p className="font-semibold text-[#24132B]">03. Past Edition Archiving</p>
              <p className="text-xs text-[#5C5669] mt-1 leading-relaxed">
                Publish verified participation metrics and past finisher stories to build runner trust year over year.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Partnership Inquiry (Demo) Form */}
        <div className="lg:col-span-7 bg-white border border-[#E6E2EA] rounded-xl p-6 sm:p-7">
          {submittedRecord ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#0D9488] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <p className="text-xs font-semibold text-[#0D9488]">
                  Demo Inquiry Received · Prototype Mode
                </p>
                <h3 className="font-display text-2xl font-bold text-[#24132B]">
                  Thank you, {submittedRecord.orgName}
                </h3>
                <p className="text-sm text-[#5C5669] leading-relaxed">
                  Your <span className="font-semibold text-[#24132B]">{submittedRecord.inquiryRole}</span> inquiry for{' '}
                  <span className="font-semibold text-[#24132B]">{submittedRecord.preferredTier}</span> has been recorded in this frontend demo. No real email or server submission occurred.
                </p>
              </div>
              <button
                type="button"
                onClick={resetInquiry}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#24132B] hover:bg-[#E11D48] transition-colors cursor-pointer"
              >
                Submit Another Demo Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-5" noValidate>
              <div>
                <h2 className="font-display text-2xl font-bold text-[#24132B]">
                  Submit Sponsorship / Partnership Inquiry (Demo)
                </h2>
                <p className="text-sm text-[#5C5669] mt-1">
                  Test the partner onboarding flow—instant confirmation feedback with no backend required.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-[#5C5669]">I am inquiring as</span>
                <div className="inline-flex p-1 bg-[#F4F1F6] rounded-lg">
                  {(['Brand Sponsor', 'Event Organiser'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setInquiryRole(role)}
                      className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        inquiryRole === role
                          ? 'bg-white text-[#E11D48] shadow-xs'
                          : 'text-[#52495E] hover:text-[#24132B]'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="spon-org" className="block text-sm font-medium text-[#24132B] mb-1">
                    {inquiryRole === 'Brand Sponsor' ? 'Brand / Company Name' : 'Event / Run Club Name'}
                  </label>
                  <input
                    id="spon-org"
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder={
                      inquiryRole === 'Brand Sponsor' ? 'e.g. AuraStride India' : 'e.g. Kolkata Women Striders'
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D1DF] text-sm text-[#24132B] placeholder:text-[#8E869B] focus:outline-none focus:border-[#E11D48]"
                  />
                </div>

                <div>
                  <label htmlFor="spon-contact" className="block text-sm font-medium text-[#24132B] mb-1">
                    Contact Name
                  </label>
                  <input
                    id="spon-contact"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Priya Menon"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D1DF] text-sm text-[#24132B] placeholder:text-[#8E869B] focus:outline-none focus:border-[#E11D48]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="spon-email" className="block text-sm font-medium text-[#24132B] mb-1">
                    Work Email
                  </label>
                  <input
                    id="spon-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@organisation.example"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D1DF] text-sm text-[#24132B] placeholder:text-[#8E869B] focus:outline-none focus:border-[#E11D48]"
                  />
                </div>

                <div>
                  <label htmlFor="spon-tier" className="block text-sm font-medium text-[#24132B] mb-1">
                    {inquiryRole === 'Brand Sponsor' ? 'Target Sponsorship Tier' : 'Listing Support Needed'}
                  </label>
                  <select
                    id="spon-tier"
                    value={preferredTier}
                    onChange={(e) => setPreferredTier(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D1DF] bg-white text-sm text-[#24132B] focus:outline-none focus:border-[#E11D48]"
                  >
                    {inquiryRole === 'Brand Sponsor' ? (
                      <>
                        <option value="Title Partner">Title Partner</option>
                        <option value="Hydration & Recovery Partner">Hydration &amp; Recovery Partner</option>
                        <option value="Apparel & Gear Partner">Apparel &amp; Gear Partner</option>
                        <option value="Scholarship Bib Sponsor">3K Beginner Scholarship Sponsor</option>
                      </>
                    ) : (
                      <>
                        <option value="List New Women's Run">List New Women&apos;s Run</option>
                        <option value="Seek Hydration / Apparel Partner">Seek Hydration / Apparel Partner</option>
                        <option value="Publish Historical Results">Publish Historical Results</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="spon-notes" className="block text-sm font-medium text-[#24132B] mb-1">
                  Target Cities or Goals (Optional)
                </label>
                <textarea
                  id="spon-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share preferred cities (e.g. Bengaluru, Mumbai, Kolkata) or runner outreach goals..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D1DF] text-sm text-[#24132B] placeholder:text-[#8E869B] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              {formError && (
                <p role="alert" className="text-xs font-medium text-[#BE123C]">
                  {formError}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#BE123C] transition-colors cursor-pointer"
                >
                  Submit Inquiry (Demo)
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
