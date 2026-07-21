# NAVBB Synergy

Interactive team-synergy tool. Select any combination of team members and get
a dynamically generated readout of their working strengths and friction
points, built from their actual 16Personalities trait data — not
pre-written pairwise text.

## What's in this folder

```
navbb-synergy/
├── index.html      the page itself
├── styles.css       visual design
├── data.js          the roster — EDIT THIS to add/remove people or fix a title
├── engine.js         the synergy logic — generates the readout from data.js
├── app.js           rendering + selection behavior
├── assets/
│   └── hero-dog.jpg  the mascot image
└── README.md         this file
```

## How to put this on GitHub Pages

1. Create a new repository on GitHub (or use an existing one).
2. Drag every file and folder **inside** `navbb-synergy/` (not the folder
   itself) into the repo's file upload page — `index.html` needs to sit at
   the root of the repo, or at the root of whichever folder you point
   GitHub Pages at.
3. Commit the upload.
4. Go to the repo's **Settings → Pages**.
5. Under "Build and deployment," set Source to **Deploy from a branch**,
   pick the branch (usually `main`) and folder (`/root` unless you put
   these files in a subfolder), then Save.
6. GitHub will give you a live URL after a minute or two
   (`https://<your-username>.github.io/<repo-name>/`).

No build step, no server, no dependencies to install — these are plain
HTML/CSS/JS files.

## Updating the roster

Open `data.js`. Each person is one entry in the `ROSTER` array. To add
someone, copy an existing entry and change the values. The five `axes`
numbers come straight from a 16Personalities.com results page:

- Take the percentage next to each trait.
- If the trait matches the **first** letter of the axis name below, keep it
  positive. If it matches the **second** letter, make it negative.

| axis | positive pole | negative pole |
|------|----------------|----------------|
| `ei` | Extraverted    | Introverted    |
| `ns` | Intuitive      | Observant      |
| `tf` | Thinking       | Feeling        |
| `jp` | Judging        | Prospecting    |
| `at` | Assertive      | Turbulent      |

Example: someone who tested "Introverted – 62%" and "Judging – 80%" would
have `ei: -62` and `jp: 80`.

The `tier` number controls which group a person's card appears under
(1 = Executive, 2 = Senior Management, 3 = Management/Specialist,
4 = Staff), and feeds the "Org Hierarchy" insight. The org chart didn't
define formal reporting lines, so these were inferred from job titles —
double check they're right and adjust freely.

## Working-style notes

Anyone using the page can click "Add a working-style note" under the
synergy results and jot something down about a selected person. This is
saved to **that browser only** (via localStorage) — it's a private,
no-setup way to enrich the readout locally, not a shared database.

## Corporate feedback form

The "Add Working-Style Feedback" section at the bottom embeds your
Microsoft Form so staff can submit notes officially. Those submissions land
in the Excel export tied to the form (via Forms → Open in Excel), not on
this page automatically — this is a manual sync by design, since a static
GitHub Pages site has no backend to receive live form data.

**Note:** Microsoft Forms embeds sometimes get blocked by an
organization's security/tenant policy. The page includes a fallback "Open
in a new tab" link right below the embed in case the iframe doesn't load
for some viewers — if that keeps happening, drop the iframe and just keep
the button/link.

To fold new feedback into the actual site (so it shows up for everyone,
not just locally), export the form's Excel responses and send them back
for merging into `data.js`, the same way the original roster was
delivered.
