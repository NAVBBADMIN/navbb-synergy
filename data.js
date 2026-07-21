/* ============================================================
   NAVBB SYNERGY — ROSTER DATA
   ============================================================
   Edit this file to add/remove people or fix a title/type.
   Everything else (cards, synergy logic, fingerprints) reads
   from this array — you never have to touch index.html or
   engine.js to update the roster.

   AXES — each trait pair is stored as ONE signed number from
   -100 to +100. Positive = the first letter's pole, negative =
   the second letter's pole. This lets the synergy engine do
   real math (averages, spreads, deltas) instead of comparing
   text strings.

     ei :  Extraverted (+)   vs  Introverted (-)
     ns :  Intuitive   (+)   vs  Observant   (-)   [N vs S]
     tf :  Thinking    (+)   vs  Feeling     (-)
     jp :  Judging     (+)   vs  Prospecting (-)
     at :  Assertive   (+)   vs  Turbulent   (-)

   TIER — inferred from the org chart / job title, since the
   chart intentionally left formal reporting lines vague.
   1 = Executive, 2 = Senior Management, 3 = Management/Specialist,
   4 = Staff. Adjust the `tier` number on any person if this
   guess is wrong — the engine only uses it to flag when a
   selected group spans multiple levels.
   ============================================================ */

const ROSTER = [
  {
    name: "Michael Donovan", displayName: "Michael Donovan",
    location: "CORP", title: "President", tier: 1,
    type: "ENTP-A", nickname: "Debater", roleGroup: "Analyst", strategy: "People Mastery",
    axes: { ei: 71, ns: 82, tf: 56, jp: -54, at: 86 },
    startDate: null, birthday: null
  },
  {
    name: "Melanie Galanis", displayName: "Dr. Galanis",
    location: "CORP", title: "Medical Director", tier: 1,
    type: "ENTJ-A", nickname: "Commander", roleGroup: "Analyst", strategy: "People Mastery",
    axes: { ei: 56, ns: 64, tf: 60, jp: 68, at: 69 },
    startDate: null, birthday: null
  },
  {
    name: "Casey Majewski", displayName: "Casey Majewski",
    location: "CORP", title: "Special Projects Manager", tier: 1,
    type: "ENTJ-A", nickname: "Commander", roleGroup: "Analyst", strategy: "People Mastery",
    axes: { ei: 52, ns: 66, tf: 68, jp: 76, at: 64 },
    startDate: null, birthday: null
  },
  {
    name: "Jacob Brennan", displayName: "Jacob Brennan",
    location: "CORP", title: "Operations Manager", tier: 2,
    type: "ISFJ-T", nickname: "Defender", roleGroup: "Sentinel", strategy: "Constant Improvement",
    axes: { ei: -73, ns: -69, tf: -53, jp: 89, at: -60 },
    startDate: "2026-05-18", birthday: null
  },
  {
    name: "Derek Brottlund", displayName: "Derek Brottlund",
    location: "CORP", title: "IT Developer", tier: 3,
    type: "INTP-T", nickname: "Logician", roleGroup: "Analyst", strategy: "Constant Improvement",
    axes: { ei: -82, ns: 95, tf: 77, jp: -81, at: -61 },
    startDate: null, birthday: null
  },
  {
    name: "Alex Williams", displayName: "Alex Williams",
    location: "CORP", title: "Accountant", tier: 3,
    type: "ENTJ-A", nickname: "Commander", roleGroup: "Analyst", strategy: "People Mastery",
    axes: { ei: 67, ns: 53, tf: 82, jp: 56, at: 82 },
    startDate: null, birthday: null
  },
  {
    name: "Clint Ferenal", displayName: "Clint Ferenal",
    location: "CORP", title: "Executive Assistant", tier: 3,
    type: "INFJ-A", nickname: "Advocate", roleGroup: "Diplomat", strategy: "Confident Individualism",
    axes: { ei: -53, ns: 75, tf: -51, jp: 76, at: 71 },
    startDate: null, birthday: null
  },
  {
    name: "Kim Roberts", displayName: "Kim Roberts",
    location: "DMV", title: "Team Lead", tier: 3,
    type: "ENTJ-A", nickname: "Commander", roleGroup: "Analyst", strategy: "People Mastery",
    axes: { ei: 63, ns: 57, tf: 54, jp: 76, at: 79 },
    startDate: null, birthday: "06-28"
  },
  {
    name: "Caitlyn Parody", displayName: "Caitlyn Parody",
    location: "DMV", title: "Phlebotomist", tier: 4,
    type: "INTP-T", nickname: "Logician", roleGroup: "Analyst", strategy: "Constant Improvement",
    axes: { ei: -83, ns: 85, tf: 78, jp: -51, at: -81 },
    startDate: null, birthday: null
  },
  {
    name: "Brenda Landaeta", displayName: "Brenda Landaeta",
    location: "DMV", title: "Phlebotomist", tier: 4,
    type: "ENTJ-A", nickname: "Commander", roleGroup: "Analyst", strategy: "People Mastery",
    axes: { ei: 63, ns: 73, tf: 53, jp: 74, at: 56 },
    startDate: null, birthday: null
  },
  {
    name: "Hector Vasquez Romero", displayName: "Hector Vasquez Romero",
    location: "DMV", title: "Canine Handler", tier: 4,
    type: "INFP-A", nickname: "Mediator", roleGroup: "Diplomat", strategy: "People Mastery",
    axes: { ei: -55, ns: 89, tf: -64, jp: -89, at: 75 },
    startDate: "2025-06-23", birthday: null
  },
  {
    name: "Ben Blake", displayName: "Dr. Blake",
    location: "PIT", title: "Veterinarian", tier: 3,
    type: "ESTJ-A", nickname: "Executive", roleGroup: "Sentinel", strategy: "People Mastery",
    axes: { ei: 53, ns: -69, tf: 78, jp: 94, at: 71 },
    startDate: null, birthday: null
  },
  {
    name: "Hannah Murray", displayName: "Hannah Murray",
    location: "PIT", title: "Recruiter", tier: 3,
    type: "ENFJ-T", nickname: "Protagonist", roleGroup: "Diplomat", strategy: "Social Engagement",
    axes: { ei: 81, ns: 78, tf: -66, jp: 71, at: -69 },
    startDate: null, birthday: null
  },
  {
    name: "Wynter Weaver", displayName: "Wynter (Wyn) Weaver",
    location: "PIT", title: "Team Lead", tier: 3,
    type: "ENTJ-A", nickname: "Commander", roleGroup: "Analyst", strategy: "Social Engagement",
    axes: { ei: 71, ns: 92, tf: 73, jp: 82, at: 57 },
    startDate: null, birthday: "06-12"
  },
  {
    name: "Kaitlyn Anderson", displayName: "Kaitlyn Anderson",
    location: "PIT", title: "Phlebotomist", tier: 4,
    type: "INFJ-A", nickname: "Advocate", roleGroup: "Diplomat", strategy: "Confident Individualism",
    axes: { ei: -53, ns: 56, tf: -53, jp: 78, at: 68 },
    startDate: null, birthday: "06-21"
  },
  {
    name: "Emilee McGee", displayName: "Emilee McGee",
    location: "PIT", title: "Phlebotomist", tier: 4,
    type: "INFJ-T", nickname: "Advocate", roleGroup: "Diplomat", strategy: "Constant Improvement",
    axes: { ei: -68, ns: 59, tf: -54, jp: 85, at: -79 },
    startDate: null, birthday: "06-24"
  },
  {
    name: "Jeffrey Tomko", displayName: "Jeffrey Tomko",
    location: "PIT", title: "Canine Handler", tier: 4,
    type: "ENFJ-T", nickname: "Protagonist", roleGroup: "Diplomat", strategy: "Social Engagement",
    axes: { ei: 56, ns: 56, tf: -61, jp: 58, at: -58 },
    startDate: null, birthday: null
  },
  {
    name: "Donna Strum", displayName: "Donna Strum",
    location: "RVA", title: "Recruiter", tier: 3,
    type: "ENFJ-A", nickname: "Protagonist", roleGroup: "Diplomat", strategy: "People Mastery",
    axes: { ei: 54, ns: 56, tf: -55, jp: 71, at: 68 },
    startDate: "2026-06-15", birthday: "06-24"
  },
  {
    name: "Kayla Blasko", displayName: "Kayla Blasko",
    location: "RVA", title: "Team Lead", tier: 3,
    type: "INFP-T", nickname: "Mediator", roleGroup: "Diplomat", strategy: "Constant Improvement",
    axes: { ei: -62, ns: 71, tf: -65, jp: -60, at: -72 },
    startDate: "2026-04-06", birthday: null
  },
  {
    name: "Leah Fralin", displayName: "Leah Fralin",
    location: "RVA", title: "Phlebotomist", tier: 4,
    type: "ISFJ-T", nickname: "Defender", roleGroup: "Sentinel", strategy: "Constant Improvement",
    axes: { ei: -54, ns: -55, tf: -55, jp: 79, at: -57 },
    startDate: "2026-04-06", birthday: null
  },
  {
    name: "McKenna Adams", displayName: "McKenna Adams",
    location: "RVA", title: "Phlebotomist", tier: 4,
    type: "ESTJ-A", nickname: "Executive", roleGroup: "Sentinel", strategy: "People Mastery",
    axes: { ei: 56, ns: -55, tf: 66, jp: 83, at: 51 },
    startDate: "2026-07-28", birthday: null
  }
];

/* Axis metadata used by the synergy engine and the fingerprint glyph */
const AXES = {
  ei: { pos: "Extraverted", neg: "Introverted", label: "Communication Energy",
        posShort: "E", negShort: "I" },
  ns: { pos: "Intuitive", neg: "Observant", label: "Information Processing",
        posShort: "N", negShort: "S" },
  tf: { pos: "Thinking", neg: "Feeling", label: "Decision Lens",
        posShort: "T", negShort: "F" },
  jp: { pos: "Judging", neg: "Prospecting", label: "Planning & Pace",
        posShort: "J", negShort: "P" },
  at: { pos: "Assertive", neg: "Turbulent", label: "Stress Response",
        posShort: "A", negShort: "T" }
};

const TIER_LABEL = {
  1: "Executive",
  2: "Senior Management",
  3: "Management / Specialist",
  4: "Staff"
};
