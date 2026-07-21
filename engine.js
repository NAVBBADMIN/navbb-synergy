/* ============================================================
   NAVBB SYNERGY ENGINE
   ============================================================
   No pre-written pairwise blurbs. Every sentence below is
   assembled from the actual numbers on the selected people:
   trait spreads, averages, role-group counts, strategy pairs,
   org tier, and (if present) corporate's own notes.

   Change the roster and the output changes with it — that's
   the whole point.
   ============================================================ */

// ---- deterministic phrasing variety (no Math.random, so the
// same group always reads the same way, but different groups
// don't all sound like a mail-merge) ----
function pick(arr, seedStr) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
  return arr[h % arr.length];
}

function fmtNames(people) {
  const names = people.map(p => p.displayName);
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return names.slice(0, -1).join(", ") + ", and " + names[names.length - 1];
}

function extreme(people, axisKey, wantHigh) {
  return people.reduce((best, p) => {
    const v = p.axes[axisKey];
    if (best === null) return p;
    return wantHigh ? (v > best.axes[axisKey] ? p : best)
                     : (v < best.axes[axisKey] ? p : best);
  }, null);
}

// ---- per-axis dynamic insight ----
function axisInsight(axisKey, people) {
  const meta = AXES[axisKey];
  const values = people.map(p => p.axes[axisKey]);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const max = Math.max(...values), min = Math.min(...values);
  const spread = max - min;
  const seed = axisKey + people.map(p => p.name).join("");

  const hi = extreme(people, axisKey, true);
  const lo = extreme(people, axisKey, false);

  if (spread < 25) {
    const pole = avg >= 0 ? meta.pos : meta.neg;
    const strength = Math.round(Math.abs(avg));
    const templates = {
      ei: [
        `Everyone here lands close together on ${pole.toLowerCase()} energy (~${strength}%), so meeting pace and communication rhythm won't need much negotiating.`,
        `This group shares a similar ${pole.toLowerCase()} default — nobody has to code-switch their communication style to keep up with the room.`
      ],
      ns: [
        `${fmtNames(people)} process information the same way (${pole.toLowerCase()}, ~${strength}%) — briefings and updates can stay at one altitude without losing anyone.`,
        `A shared ${pole.toLowerCase()} lens means this group will naturally agree on what level of detail a conversation needs.`
      ],
      tf: [
        `Decisions in this group will consistently run through a ${pole.toLowerCase()}-first filter — fast alignment, but watch for the group's shared blind spot (${pole === "Thinking" ? "the people-impact of a decision" : "the hard data behind a decision"}).`,
        `${fmtNames(people)} tend to weigh calls the same way (${pole.toLowerCase()}), which speeds up consensus but narrows the range of angles considered.`
      ],
      jp: [
        `Planning style is consistent here (${pole.toLowerCase()}, ~${strength}%) — deadlines and structure won't be a point of friction.`,
        `This group naturally agrees on how much structure a plan needs, which removes a common source of team tension.`
      ],
      at: [
        `Stress response is aligned (${pole.toLowerCase()}) — under pressure, this group will react in a similar register, for better or worse.`,
        `${fmtNames(people)} share a similar relationship to self-doubt and pressure, so morale tends to move together as a group, not split.`
      ]
    };
    return { theme: meta.label, tone: "aligned", text: pick(templates[axisKey], seed) };
  }

  if (spread < 60) {
    const templates = {
      ei: [
        `${hi.displayName} brings more outward energy while ${lo.displayName} processes more internally first — a workable mix if meetings leave room for both live discussion and think-time.`
      ],
      ns: [
        `${hi.displayName} tends to think in patterns and possibilities while ${lo.displayName} anchors to concrete facts — pairing them well means big ideas get a reality check before launch.`
      ],
      tf: [
        `${hi.displayName} leans logic-first and ${lo.displayName} leans values-first — together they cover more angles on a decision than either would alone, as long as neither dismisses the other's default.`
      ],
      jp: [
        `${hi.displayName} wants structure locked in early; ${lo.displayName} prefers to keep options open longer — set checkpoints, not rigid plans, so both stay comfortable.`
      ],
      at: [
        `${hi.displayName} carries steadier outward confidence while ${lo.displayName} is more likely to double-check and second-guess under pressure — that combination can actually catch more errors, if the group treats the questioning as useful rather than as doubt.`
      ]
    };
    return { theme: meta.label, tone: "complementary", text: pick(templates[axisKey], seed) };
  }

  // spread >= 60: real divide
  const templates = {
    ei: [
      `${hi.displayName} and ${lo.displayName} sit at opposite ends of communication energy — ${hi.displayName} will want to talk it out loud, ${lo.displayName} will want space to think first. Without an explicit norm, one of them ends up feeling steamrolled or stonewalled.`
    ],
    ns: [
      `${hi.displayName} thinks in big-picture possibility, ${lo.displayName} thinks in verified specifics — left unmanaged, this becomes "you're not being realistic" vs. "you're missing the point" in the same conversation.`
    ],
    tf: [
      `${hi.displayName} will push a decision on logic and ${lo.displayName} will push back on its human impact — this is the group's single biggest friction point and also its biggest safeguard, if both sides are asked to weigh in before a call is finalized rather than after.`
    ],
    jp: [
      `${hi.displayName} needs a locked plan to feel steady; ${lo.displayName} needs room to adapt to feel effective — assign one of them ownership of the "structure" and the other ownership of "adjustments," instead of letting it become a tug-of-war.`
    ],
    at: [
      `${hi.displayName}'s steady confidence next to ${lo.displayName}'s instinct to stress-test everything can read as ${hi.displayName} not taking concerns seriously, or ${lo.displayName} constantly raising alarms — name this dynamic openly so it doesn't quietly erode trust.`
    ]
  };
  return { theme: meta.label, tone: "friction", text: pick(templates[axisKey], seed) };
}

// ---- role group (Analyst / Diplomat / Sentinel / Explorer) composition ----
function roleGroupInsight(people) {
  const counts = {};
  people.forEach(p => counts[p.roleGroup] = (counts[p.roleGroup] || 0) + 1);
  const groups = Object.keys(counts);

  if (groups.length === 1) {
    const g = groups[0];
    const text = {
      Analyst: `This is an all-Analyst group — strong on strategy, systems, and pushing for the more rigorous plan. The risk is competition for whose logic wins, and nobody in the room naturally slows down to ask "how will people feel about this?"`,
      Diplomat: `This is an all-Diplomat group — strong on morale, buy-in, and reading the room. The risk is that hard, unpopular calls get softened or delayed because nobody wants to be the one to disrupt group harmony.`,
      Sentinel: `This is an all-Sentinel group — highly reliable on process and follow-through. The risk is slower adaptation when plans need to change quickly, since nobody's default instinct is to improvise.`,
      Explorer: `This is an all-Explorer group — fast, adaptive, and comfortable improvising. The risk is follow-through: nobody's natural instinct is to lock down the process or document what worked.`
    }[g];
    return { theme: "Cognitive Style Mix", tone: "watch", text };
  }

  const pairText = {
    "Analyst-Diplomat": `mixes people who push the logical case (Analyst) with people who push the human case (Diplomat) — this is one of the healthiest pairings for decision quality, as long as neither side's input gets treated as the "soft" one.`,
    "Analyst-Sentinel": `pairs big-picture strategy (Analyst) with steady execution (Sentinel) — strong for actually shipping plans, but the Analyst can get impatient with process and the Sentinel can feel rushed past.`,
    "Analyst-Explorer": `pairs strategic thinking (Analyst) with fast improvisation (Explorer) — good for problems that need both a plan and the flexibility to abandon it, if the Analyst doesn't try to over-plan the Explorer's instincts.`,
    "Diplomat-Sentinel": `pairs relationship focus (Diplomat) with reliable process (Sentinel) — a stable, trust-building combination, though both can be slow to rock the boat when something actually needs to change.`,
    "Diplomat-Explorer": `pairs people-focus (Diplomat) with adaptability (Explorer) — energetic and well-liked as a pairing, but neither naturally anchors the group in hard data or firm deadlines.`,
    "Sentinel-Explorer": `pairs steady process (Sentinel) with fast adaptation (Explorer) — the classic "plan vs. pivot" tension; useful if the group agrees in advance who has final say when they disagree.`
  };

  const found = [];
  for (let i = 0; i < groups.length; i++) {
    for (let j = i + 1; j < groups.length; j++) {
      const key1 = `${groups[i]}-${groups[j]}`, key2 = `${groups[j]}-${groups[i]}`;
      if (pairText[key1]) found.push(pairText[key1]);
      else if (pairText[key2]) found.push(pairText[key2]);
    }
  }
  const summary = groups.map(g => `${counts[g]} ${g}${counts[g] > 1 ? "s" : ""}`).join(", ");
  return {
    theme: "Cognitive Style Mix",
    tone: "mixed",
    text: `This group is a blend of ${summary}. ${found.join(" ")}`
  };
}

// ---- 16Personalities Strategy pairing ----
function strategyInsight(people) {
  const combos = {
    "People Mastery+People Mastery": `A room full of People Mastery Strategists moves fast and confidently together — the failure mode is nobody pressure-testing the plan before committing to it. Assign someone the explicit job of playing devil's advocate.`,
    "People Mastery+Constant Improvement": `People Mastery brings the confident push forward; Constant Improvement brings the refinement instinct. Strong combination — let the Constant Improvement person critique the plan without either side reading it as personal.`,
    "People Mastery+Social Engagement": `Both bring visible, outward energy, but toward different ends — People Mastery toward results, Social Engagement toward relationships. Clarify who's "leading the room" on a given task so their energy adds up instead of competing.`,
    "People Mastery+Confident Individualism": `People Mastery wants to rally the group; Confident Individualism prefers to work independently and check in on their own terms. Give the Confident Individualism person clear, separate ownership rather than expecting constant group buy-in.`,
    "Constant Improvement+Constant Improvement": `Two relentless refiners together can produce excellent work — or never ship, endlessly iterating. Put a hard deadline on the table early.`,
    "Constant Improvement+Social Engagement": `One is heads-down on process quality, the other is heads-up on relationships and momentum — genuinely complementary, but only if they're explicitly paired rather than left to divide the work themselves.`,
    "Constant Improvement+Confident Individualism": `Both are naturally comfortable working solo and deep-focused — efficient in parallel, but easy for progress to go unspoken until a deadline. Build in a check-in neither of them would create on their own.`,
    "Social Engagement+Social Engagement": `High energy, high visibility, strong at building momentum together — the gap is usually documentation and follow-through once the initial excitement settles.`,
    "Social Engagement+Confident Individualism": `One recharges around people, the other recharges alone — don't mistake the Confident Individualism person's need for solo time as disengagement; schedule updates instead of expecting them spontaneously.`,
    "Confident Individualism+Confident Individualism": `Two independent operators who won't get in each other's way — the tradeoff is that coordination has to be built in on purpose, because neither will default to checking in.`
  };

  const strategies = [...new Set(people.map(p => p.strategy))];
  if (strategies.length === 1) {
    const key = `${strategies[0]}+${strategies[0]}`;
    return { theme: "16Personalities Strategy", tone: "watch", text: combos[key] };
  }
  const out = [];
  for (let i = 0; i < strategies.length; i++) {
    for (let j = i + 1; j < strategies.length; j++) {
      const key1 = `${strategies[i]}+${strategies[j]}`, key2 = `${strategies[j]}+${strategies[i]}`;
      out.push(combos[key1] || combos[key2]);
    }
  }
  return { theme: "16Personalities Strategy", tone: "mixed", text: out.join(" ") };
}

// ---- org tier / hierarchy awareness ----
function tierInsight(people) {
  const tiers = [...new Set(people.map(p => p.tier))];
  if (tiers.length === 1) {
    return { theme: "Org Hierarchy", tone: "peer",
      text: `Everyone selected sits at the same organizational level (${TIER_LABEL[tiers[0]]}) — this is a peer dynamic, feedback and disagreement can stay direct without a power gap to manage.` };
  }
  const min = Math.min(...tiers), max = Math.max(...tiers);
  const senior = people.filter(p => p.tier === min).map(p => p.displayName);
  const junior = people.filter(p => p.tier === max).map(p => p.displayName);
  return { theme: "Org Hierarchy", tone: "hierarchy",
    text: `This group spans organizational levels — ${senior.join(", ")} at ${TIER_LABEL[min]}, down to ${junior.join(", ")} at ${TIER_LABEL[max]}. Trait-based friction (above) reads differently across a reporting gap than it does between peers — the more senior person usually has to be the one who opens the door for direct feedback, or it won't happen on its own.` };
}

// ---- corporate custom notes (from localStorage) ----
function notesInsight(people) {
  const withNotes = people
    .map(p => ({ p, note: getNote(p.name) }))
    .filter(x => x.note && x.note.trim().length > 0);
  if (withNotes.length === 0) return null;
  return {
    theme: "Corporate Notes",
    tone: "notes",
    text: withNotes.map(x => `${x.p.displayName}: "${x.note.trim()}"`).join("  •  ")
  };
}

// ---- main entry point ----
function generateSynergy(selectedNames) {
  const people = ROSTER.filter(p => selectedNames.includes(p.name));
  if (people.length < 2) return null;

  const insights = [];
  Object.keys(AXES).forEach(axisKey => insights.push(axisInsight(axisKey, people)));
  insights.push(roleGroupInsight(people));
  insights.push(strategyInsight(people));
  insights.push(tierInsight(people));
  const notes = notesInsight(people);
  if (notes) insights.push(notes);

  return { people, insights };
}

// ---- localStorage notes ----
function getNote(name) {
  try { return localStorage.getItem("navbb-note::" + name) || ""; }
  catch (e) { return ""; }
}
function setNote(name, text) {
  try { localStorage.setItem("navbb-note::" + name, text); }
  catch (e) { /* storage unavailable */ }
}
