import { BeginnerWeekPlan, FAQItem } from '../types';

export const COUCH_TO_5K_PHASES = [
  {
    phase: '01. Walk-to-Jog Foundation',
    weeks: 'Weeks 1–2',
    ratio: '60s easy jog / 90s brisk walk',
    summary:
      'Focus purely on building the habit three mornings a week. Your pace should stay conversational—if you cannot speak a short sentence comfortably, slow down.',
  },
  {
    phase: '02. Aerobic Confidence',
    weeks: 'Weeks 3–4',
    ratio: '3 min jog / 1 min walk',
    summary:
      'Extend your continuous jogging intervals while keeping walk breaks intentional. Add 5 minutes of calf raises and glute bridges after each session.',
  },
  {
    phase: '03. Continuous Mileage',
    weeks: 'Weeks 5–6',
    ratio: '15–22 min continuous easy run',
    summary:
      'Transition past walk breaks for your mid-week runs. Practise sipping water before morning runs and wearing the exact socks and shoes you plan to race in.',
  },
  {
    phase: '04. Race-Ready Tapering',
    weeks: 'Weeks 7–8',
    ratio: '30 min continuous + 5K race pace rehearsal',
    summary:
      'Hit 4.5 km comfortably in Week 7, then dial back volume in Week 8 so your legs feel fresh and springy at the start line.',
  },
];

export const EIGHT_WEEK_PLAN: BeginnerWeekPlan[] = [
  {
    week: 1,
    title: 'Week 1: Showing Up & Baseline Comfort',
    focus: 'Three 20-minute sessions of 60s jog + 90s walk',
    sessionsPerWeek: 3,
    weeklyGoalKm: '5.5 km total',
    tasks: [
      { id: 'w1-t1', label: 'Complete 3 easy walk-jog sessions (20 mins each)' },
      { id: 'w1-t2', label: 'Wear dedicated cushioned running shoes (no flat canvas sneakers)' },
      { id: 'w1-t3', label: 'Do 5 mins of ankle circles & calf stretches after each session' },
    ],
  },
  {
    week: 2,
    title: 'Week 2: Steady Rhythm',
    focus: '90s jog + 90s walk intervals',
    sessionsPerWeek: 3,
    weeklyGoalKm: '6.5 km total',
    tasks: [
      { id: 'w2-t1', label: 'Complete 2 mid-week 22-minute interval sessions' },
      { id: 'w2-t2', label: 'Complete 1 weekend 25-minute morning session at race start hour' },
      { id: 'w2-t3', label: 'Test supportive sports bra & moisture-wicking top comfort' },
    ],
  },
  {
    week: 3,
    title: 'Week 3: Building Time on Feet',
    focus: '3 min jog + 1 min walk × 6 rounds',
    sessionsPerWeek: 3,
    weeklyGoalKm: '8.0 km total',
    tasks: [
      { id: 'w3-t1', label: 'Finish 3 sessions of 3-min jog / 1-min walk intervals' },
      { id: 'w3-t2', label: 'Practise pre-run light snack (banana or 4 soaked almonds 30 mins prior)' },
    ],
  },
  {
    week: 4,
    title: 'Week 4: First 10-Minute Continuous Blocks',
    focus: 'Two 10-min jogs separated by 2-min walk',
    sessionsPerWeek: 3,
    weeklyGoalKm: '9.5 km total',
    tasks: [
      { id: 'w4-t1', label: 'Run two 10-minute continuous jog blocks in one session' },
      { id: 'w4-t2', label: 'Register or bookmark your target 3K/5K community race' },
    ],
  },
  {
    week: 5,
    title: 'Week 5: Crossing 3 Kilometres',
    focus: '18–20 min continuous easy pace',
    sessionsPerWeek: 3,
    weeklyGoalKm: '11.0 km total',
    tasks: [
      { id: 'w5-t1', label: 'Complete one continuous 3 km effort without checking pace watch' },
      { id: 'w5-t2', label: 'Add 10 minutes of hip & core stability exercises on rest day' },
    ],
  },
  {
    week: 6,
    title: 'Week 6: Stretching to 4 Kilometres',
    focus: '25–28 min steady morning run',
    sessionsPerWeek: 4,
    weeklyGoalKm: '13.5 km total',
    tasks: [
      { id: 'w6-t1', label: 'Complete 3 easy 20-min runs + 1 weekend 4 km run' },
      { id: 'w6-t2', label: 'Practise drinking water from a paper cup while walking briskly' },
    ],
  },
  {
    week: 7,
    title: 'Week 7: Peak Confidence Rehearsal',
    focus: '4.5 km dress rehearsal in full race-day outfit',
    sessionsPerWeek: 4,
    weeklyGoalKm: '14.5 km total',
    tasks: [
      { id: 'w7-t1', label: 'Run 4.5 km wearing exact race shoes, socks, and anti-chafe protection' },
      { id: 'w7-t2', label: 'Check bib collection dates & venue commute route' },
    ],
  },
  {
    week: 8,
    title: 'Week 8: Taper & Race Day',
    focus: 'Light 15-min shakeouts + Race Day 5K Finish',
    sessionsPerWeek: 3,
    weeklyGoalKm: '10.0 km incl. race',
    tasks: [
      { id: 'w8-t1', label: 'Two light 15-minute shakeout jogs early in the week (no hard pushing)' },
      { id: 'w8-t2', label: 'Lay out bib, safety pins, Photo ID, and shoes the night before' },
      { id: 'w8-t3', label: 'Cross your first finish line & celebrate!' },
    ],
  },
];

export const RACE_DAY_SECTIONS = [
  {
    title: '01. Bib Pickup & Night-Before Prep',
    points: [
      'Collect your bib 1–2 days before race morning at the Expo—race-morning pickup is rarely available.',
      'Pin your bib horizontally across your front torso using all four safety pins so photographers and timing mats read it cleanly.',
      'Never fold or crease the foam timing strip on the back of your bib.',
      'Lay out shoes, socks, sports watch, hair ties, and safety pins the night before so 4:45 AM feels calm.',
    ],
  },
  {
    title: '02. Start Line & Pacing',
    points: [
      'Arrive 40 minutes before your wave start time for baggage drop, restroom use, and dynamic warm-up.',
      'Do not sprint the first 500 metres in excitement—let faster waves clear and settle into your conversational rhythm.',
      'Look for pacer flags (e.g., 35-min or 40-min 5K pacers) if you want steady company.',
    ],
  },
  {
    title: '03. Hydration Stations & Fuel',
    points: [
      'Water stations appear every 1.5–2 km. Slow to a brisk walk for 10 seconds to sip safely rather than choking while jogging.',
      'For 3K and 5K distances, plain water and a light pre-race banana/toast are plenty—skip heavy sugary gels unless you tested them in training.',
      'Drop empty cups inside the marked bin zone right after the water table.',
    ],
  },
  {
    title: '04. Safety, Etiquette & Recovery',
    points: [
      'Keep left or single-file if wearing open-ear headphones so you hear volunteer instructions and passing runners.',
      'Carry your emergency contact details written on the back of your bib.',
      'Keep walking slowly for 5 minutes past the finish arch before sitting down—your heart rate and legs will recover faster.',
    ],
  },
];

export const BEGINNER_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do I have to run the entire 3K or 5K without stopping?',
    answer:
      'Not at all. Most beginner waves welcome walk-run intervals (for example, jogging 2 minutes and walking 1 minute). As long as you finish within the generous event cut-off—typically 50 minutes for 3K and 70–75 minutes for 5K—you earn the exact same finisher medal and official celebration.',
  },
  {
    id: 'faq-2',
    question: 'Is it safe to sign up alone if none of my friends run?',
    answer:
      'Yes. Women’s marathon events featured on HERPLAY use well-lit, traffic-closed routes with marshals every 200–300 metres, women-only medical volunteers, and baggage tents. Many events also pair solo first-timers with volunteer run-buddies during bib pickup.',
  },
  {
    id: 'faq-3',
    question: 'What kind of shoes and clothes do I actually need to start?',
    answer:
      'Start with one pair of supportive running shoes (with a slightly cushioned heel and half-thumb space in front of your longest toe), synthetic/moisture-wicking socks and T-shirt instead of heavy cotton, and a well-fitted high-support sports bra. You do not need expensive GPS watches to run your first 5K.',
  },
  {
    id: 'faq-4',
    question: 'How early should I eat before a 6:00 AM race flag-off?',
    answer:
      'Aim for a small, easily digestible carb snack 45–60 minutes before starting—such as one ripe banana, two dates, or a slice of toast with peanut butter—plus 200 ml of water. Avoid heavy dairy or spicy food right before running.',
  },
  {
    id: 'faq-5',
    question: 'What happens during menstrual days if race day falls on my cycle?',
    answer:
      'You can absolutely run safely during your period. Most HERPLAY-listed events provide hygiene stations at the start/finish village and along major 10K/21K loops. Wear tested seamless activewear or period-proof briefs you have already worn on a training jog so nothing chafes.',
  },
];
