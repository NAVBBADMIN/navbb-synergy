/* ============================================================
   NAVBB SYNERGY — APP
   Renders the roster (grouped by org tier), handles multi-select,
   draws each person's trait "fingerprint" glyph, and renders the
   dynamic synergy readout from engine.js.
   ============================================================ */

const state = { selected: new Set() };

// ---------- trait fingerprint glyph (signature visual element) ----------
// A 5-axis radar polygon built from the person's actual signed
// trait values — every glyph is genuinely unique to that person's
// data, not a decorative icon.
function fingerprintSVG(person, size = 44) {
  const keys = ["ei", "ns", "tf", "jp", "at"];
  const cx = size / 2, cy = size / 2, r = size / 2 - 4;
  const pts = keys.map((k, i) => {
    const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
    const mag = (Math.abs(person.axes[k]) / 100) * r;
    const x = cx + Math.cos(angle) * mag;
    const y = cy + Math.sin(angle) * mag;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const color = person.roleGroup === "Analyst" ? "#3d5a8f"
              : person.roleGroup === "Diplomat" ? "#a8462d"
              : person.roleGroup === "Sentinel" ? "#3f7a5c"
              : "#c9a227";
  return `<svg class="fingerprint" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(22,35,61,0.12)" stroke-width="1"/>
    <polygon points="${pts}" fill="${color}" fill-opacity="0.28" stroke="${color}" stroke-width="1.5"/>
  </svg>`;
}

// ---------- roster rendering, grouped by tier ----------
function renderRoster() {
  const root = document.getElementById("roster");
  root.innerHTML = "";
  [1, 2, 3, 4].forEach(tier => {
    const people = ROSTER.filter(p => p.tier === tier);
    if (!people.length) return;
    const block = document.createElement("div");
    block.className = "tier-block";
    block.innerHTML = `<p class="tier-label">${TIER_LABEL[tier]}</p>`;
    const grid = document.createElement("div");
    grid.className = "roster-grid";
    people.forEach(p => grid.appendChild(renderCard(p)));
    block.appendChild(grid);
    root.appendChild(block);
  });
}

function renderCard(person) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "card" + (state.selected.has(person.name) ? " selected" : "");
  card.setAttribute("aria-pressed", state.selected.has(person.name));
  card.innerHTML = `
    <div class="card-top">
      <div>
        <div class="card-name">${person.displayName}</div>
        <div class="card-title">${person.title} &middot; ${person.location}</div>
      </div>
      ${fingerprintSVG(person)}
    </div>
    <div class="card-type">${person.type} &middot; ${person.nickname}</div>
  `;
  card.addEventListener("click", () => toggleSelect(person.name));
  return card;
}

function toggleSelect(name) {
  if (state.selected.has(name)) state.selected.delete(name);
  else state.selected.add(name);
  renderRoster();
  renderSynergy();
}

// ---------- synergy panel ----------
function renderSynergy() {
  const wrap = document.getElementById("synergy-body");
  const chipsRow = document.getElementById("selected-chips");
  chipsRow.innerHTML = "";

  [...state.selected].forEach(name => {
    const p = ROSTER.find(x => x.name === name);
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `${p.displayName} <button aria-label="Remove ${p.displayName}">&times;</button>`;
    chip.querySelector("button").addEventListener("click", () => toggleSelect(name));
    chipsRow.appendChild(chip);
  });

  if (state.selected.size < 2) {
    wrap.innerHTML = `
      <div class="synergy-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5b6b8c" stroke-width="1.5"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/><path d="M10.5 10.5l3 3"/></svg>
        <p>${state.selected.size === 0 ? "Select two or more team members to generate a synergy readout." : "Select at least one more person to see how they work together."}</p>
      </div>`;
    return;
  }

  const result = generateSynergy([...state.selected]);
  const toneClass = t => `insight tone-${t.tone.replace(/\s+/g, "-")}`;

  wrap.innerHTML = `
    <div class="insight-list">
      ${result.insights.map(i => `
        <div class="${toneClass(i)}">
          <p class="insight-theme">${i.theme}</p>
          <p class="insight-text">${i.text}</p>
        </div>
      `).join("")}
    </div>
    <details class="note-drawer">
      <summary>+ Add a working-style note (saved to this browser only)</summary>
      <div class="note-field">
        <select id="note-person">
          ${[...state.selected].map(n => {
            const p = ROSTER.find(x => x.name === n);
            return `<option value="${n}">${p.displayName}</option>`;
          }).join("")}
        </select>
        <textarea id="note-text" rows="3" placeholder="e.g. Prefers written updates over stand-ups; works best with a clear deadline stated up front."></textarea>
        <button id="note-save">Save note</button>
        <span class="note-saved-flag" id="note-saved-flag">Saved.</span>
      </div>
    </details>
  `;

  const personSelect = document.getElementById("note-person");
  const textArea = document.getElementById("note-text");
  const loadNoteFor = (name) => { textArea.value = getNote(name); };
  loadNoteFor(personSelect.value);
  personSelect.addEventListener("change", () => loadNoteFor(personSelect.value));

  document.getElementById("note-save").addEventListener("click", () => {
    setNote(personSelect.value, textArea.value);
    const flag = document.getElementById("note-saved-flag");
    flag.style.display = "inline";
    setTimeout(() => { flag.style.display = "none"; }, 2000);
    renderSynergy();
  });
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderRoster();
  renderSynergy();
});
