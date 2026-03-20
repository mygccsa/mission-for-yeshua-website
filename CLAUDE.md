# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mission for Yeshua is a static website for a Christian ministry organization. The site has no build process, bundler, or package manager - it uses vanilla HTML, CSS, and JavaScript served directly.

## Development

**Local Development:** Open any HTML file directly in a browser, or use a local server:
```bash
npx serve .
# or
python -m http.server 8000
```

No build, lint, or test commands exist for this project.

## Architecture

### File Structure
- `index.html` - Homepage (root level)
- `pages/` - Subpages (about, books, booklets, community-center, contact, teachings)
- `content/` - Booklet chapter data (JS files that register into `BOOKLET_CONTENT`)
  - `booklet-N/chapter-NN.js` - Individual chapter content files
  - `bymen-names.js` - Hebrew/Greek name mappings (`BYMEN_BOOKS`, `BYMEN_PERSONS`, `BYMEN_PLACES`)
  - `EXAMPLE-CHAPTER.js` - Reference template for chapter authors
- `docs/` - Source Word documents (.docx) that chapters are converted from
- `script/css/` - Stylesheets
  - `styles.css` - Shared base styles and CSS variables
  - `*-style.css` - Page-specific styles (e.g., `books-style.css`, `booklets-style.css`)
- `script/js/script.js` - All JavaScript functionality
- `images/` - Static assets (logo, favicon, book covers, hero backgrounds)

### CSS Variables
The design system uses CSS custom properties defined in `styles.css`:

**Colors (Professional Church Palette):**
- `--primary: #1e5a8a` (deep blue - main brand color)
- `--primary-light: #2d7ab8`
- `--primary-dark: #0d3a5c`
- `--secondary: #b8860b` (gold - accent)
- `--secondary-light: #d4a524`
- `--accent: #c9a227` (gold variant)

**Gradients:**
- `--gradient-primary`: Deep blue gradient (main brand)
- `--gradient-secondary`: Gold gradient (accents, highlights)
- `--gradient-hero`: Deep blue overlay for hero sections

**Effects:**
- Glassmorphism: `rgba(255,255,255,0.8)` background + `backdrop-filter: blur(10px)`
- Shadows with blue glows: `rgba(30, 90, 138, 0.x)` values
- Rounded corners: `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (20px)
- Hover animations with cubic-bezier easing for smooth card lifts

### JavaScript Features
`script.js` initializes on DOMContentLoaded with these modules:
- `initializeNavigation()` - Mobile menu toggle
- `initializeSearch()` - Generic search with debounce
- `initializeScrollEffects()` - IntersectionObserver animations
- `initializeFormValidation()` - Real-time form validation
- `initializeBookFeatures()` - Book filtering by category/search on books page
- `initializeBookCovers()` - Fallback handling for missing book images

### Booklet Reader Architecture
`pages/booklets.html` is a self-contained flipbook reader. Key architecture:

1. **Content registry:** A global `BOOKLET_CONTENT` object is declared, then chapter scripts (`content/booklet-1/chapter-NN.js`) each register into it with key `"bookletNum-chapterNum"` (e.g. `BOOKLET_CONTENT["1-4"]`)
2. **Booklet metadata:** The `B` array (in booklets.html inline script) defines all 4 booklets with their chapter titles, opening verses, and PDF filenames
3. **Page structure:** Each booklet has fixed pages: Cover (0), Publisher (1), Notes to Readers (2), Table of Contents (3), then chapters (4+), then Back Cover (last)
4. **Rendering:** `rn()` renders the current page, `rB()` renders content blocks, `wN()` wraps BYMEN names with tooltip spans using the chapter's `footnotes` object
5. **Navigation:** Swipe gestures, keyboard arrows, and button clicks — all call `nx()`/`pv()` for next/previous
6. **Chapter data shape:**
```javascript
BOOKLET_CONTENT["1-X"] = {
  content: [],           // Array of content blocks (strings, quotes, headings, etc.)
  footnotes: {},         // BYMEN name → etymological explanation mapping
  supportingVerses: [],  // Optional: [{ text, ref }]
  closing: ""            // Optional: closing prayer/reflection
};
```

### Path Conventions
- Root pages use `script/css/` and `images/` paths
- Pages in `pages/` use `../script/css/` and `../images/` relative paths
- Each page includes both `styles.css` (base) and its page-specific CSS file

### External Dependencies (CDN)
- Font Awesome 5.15.3 for icons
- Google Fonts (Inter family)

### Bible Translation (MANDATORY)
All scripture quotations in booklet chapters MUST be taken from the **BYMEN** (Bible of Yehoshua ha Mashiah — English) translation. This is the authoritative Bible version for this project.

- **Online reader:** https://dev.bibledeyehoshouahamashiah.org/bym-trad/lire.html (select BYMEN version)
- **Direct text access:** `https://dev.bibledeyehoshouahamashiah.org/bym-trad/content/texts/BYMEN/{SECTION}.html` where `{SECTION}` is the book code + chapter number (e.g. `EP4` for Ephesians 4, `JN1` for John 1, `GN1` for Genesis 1)
- **Book codes:** GN (Genesis), EX (Exodus), LV (Leviticus), NU (Numbers), DT (Deuteronomy), JS (Joshua), JG (Judges), RT (Ruth), S1/S2 (1/2 Samuel), K1/K2 (1/2 Kings), R1/R2 (1/2 Chronicles), ER (Ezra), NH (Nehemiah), ET (Esther), JB (Job), PS (Psalms), PR (Proverbs), EC (Ecclesiastes), SS (Song of Solomon), IS (Isaiah), JR (Jeremiah), LM (Lamentations), EK (Ezekiel), DN (Daniel), HS (Hosea), JL (Joel), AM (Amos), OB (Obadiah), JH (Jonah), MC (Micah), NM (Nahum), HK (Habakkuk), ZP (Zephaniah), HG (Haggai), ZC (Zechariah), ML (Malachi), MT (Matthew), MK (Mark), LK (Luke), JN (John), AC (Acts), RM (Romans), C1/C2 (1/2 Corinthians), GL (Galatians), EP (Ephesians), PP (Philippians), CL (Colossians), H1/H2 (1/2 Thessalonians), T1/T2 (1/2 Timothy), TT (Titus), PM (Philemon), HB (Hebrews), JM (James), P1/P2 (1/2 Peter), J1/J2/J3 (1/2/3 John), JD (Jude), RV (Revelation)
- The BYMEN HTML contains Strong's markup (`<l>` tags) — extract only the plain text words when quoting
- **BYMEN book names** — use Hebrew/Greek names in `source` fields and references: Bereshit (Genesis), Shemot (Exodus), Vayikra (Leviticus), Devarim (Deuteronomy), Tehilim (Psalms), Mishlei (Proverbs), Yesha'yah (Isaiah), Yirmeyah (Jeremiah), Daniyel (Daniel), Hoshea (Hosea), Mattithyah (Matthew), Markos (Mark), Loukas (Luke), Yohanan (John), 1/2 Petros (1/2 Peter), 1/2/3 Yohanan (1/2/3 John), Yaacov (James), Yehudah (Jude). NT epistles (Romans, Corinthians, Galatians, Ephesians, etc.) and Revelation keep English names.
- **Footnotes** — each chapter has a `footnotes` object mapping unfamiliar BYMEN names to **explanatory etymological breakdowns** that teach the reader. The value should break down the name's Hebrew/Greek roots so the reader understands *why* the name means what it means. Format: `"Daniyel": "Daniel, from Dani (my judge) and El (God): 'Elohim is my judge'"` or `"Bereshit": "Genesis, meaning 'in the beginning' — the first word of the book in Hebrew"`. Include: BYMEN book names (Devarim, Mattithyah, etc.), uncommon person names (Paulos, Moshe, Kephas, etc.), location names (Yerushalaim, Yarden, Galil, Nazaret, etc.), and divine titles that appear in BYMEN quotes (El Elyon, Tsevaot, Adonai, El Gadowl, Gibbor, etc.). Do NOT include Elohim/Elohîm, Yehoshua/Yehoshoua, or Mashiah — these are already explained in the Notes to Readers page and introduced with their English equivalent on first mention in every chapter. Reference mappings live in `content/bymen-names.js` (`BYMEN_BOOKS`, `BYMEN_PERSONS`, `BYMEN_PLACES`). **Web:** footnoted names become clickable tooltip spans (`.bn` class) showing the explanation on hover/tap. **PDF (normal + print):** per-page academic footnotes — superscript letters (a, b, c…) appear after the first occurrence of each footnoted name on a page, with lettered entries at the page bottom. Skip etymologies only for names with no known Hebrew/Greek roots or where the meaning is redundant (e.g. Shoftim = Judges).
- **Footnote completeness (MANDATORY)** — every Hebrew/Greek name that appears anywhere in the chapter content (teaching text, quotes, headings, list items) MUST have a matching footnote entry. This includes: BYMEN book names used in source fields and inline references, person names, location names, tribal names, and divine titles from BYMEN quotes. The only exceptions are Elohim/Elohîm, Yehoshua/Yehoshoua, Mashiah, YHWH, and El (standalone). When a name appears in a `source` field (e.g. `"1 Petros"`) AND as a person name in the text (e.g. `"Shim'on Petros"`), both forms need footnote entries if they differ.
- **Footnote key accuracy (MANDATORY)** — each footnote key must exactly match the spelling used in the chapter text. The `wN()` tooltip function does regex substring matching, so a mismatched key either won't match or will break words visually. If the BYMEN uses different spellings across books for the same name (e.g. "Zebulun" in Yesha'yah vs "Zebouloun" in Mattithyah), add a footnote entry for **each spelling variant**. Always verify footnote keys against the actual text they need to match.
- **Vocabulary footnotes (MANDATORY)** — the booklets are written for new believers and readers for whom English may not be their first language. Every complex, archaic, theological, or uncommon word in the chapter MUST have a footnote entry with a simple, clear definition. This applies to four categories: (1) **rare/obscure words** (e.g. sacerdotal, ablutions, presages, shewbread), (2) **archaic English in BYMEN quotes** (e.g. verily, thine, hidest, wrought, whelp, couched, taketh, plenteous), (3) **theological terms** (e.g. incarnation, theophany, typology, tabernacle, Levitical priesthood, dispensation, omnipresent, idolatry, redemption, Godhead, Passover, manna), and (4) **formal/literary vocabulary** (e.g. celestial, firmament, enigmatic, eunuch, archetype, terrestrial, servitude, apparition). If a word has both singular and plural forms in the text (e.g. "allegory" and "allegories"), add a footnote entry for each form. The same `footnotes` object and tooltip system used for BYMEN names handles these — no separate mechanism needed.

### Booklet Content Formatting Rules
Chapter content files live in `content/booklet-N/chapter-NN.js`. When converting source documents (Word files in `docs/`) to chapter content:

- **Only include what the author wrote** — never add prayers, extra verses, or content not in the source document
- **`quote` blocks** — ONLY for direct scripture citations with a verse reference (e.g. `{ type: "quote", text: "For God so loved the world...", source: "John 3:16" }`). Blue left border + light blue background.
- **`statement` blocks** — for standalone emphasized author declarations set apart from the teaching text (e.g. `{ type: "statement", text: "You cannot have the Holy Spirit and still live in sin." }`). Centered italic with gold divider lines. These are NOT scripture — they are short, impactful sentences the author highlights.
- **`heading` blocks** — for section titles and sub-section titles
- **`list` blocks** — for bullet points and enumerations from the source document (`{ type: "list", items: [...] }`). Do NOT flatten lists into a single paragraph.
- **Plain strings** — for ALL teaching/explanatory paragraphs and definitions — even if they are italic or bold in the source document for emphasis. When in doubt, use a plain string.
- **`callout` blocks** — avoid unless the author explicitly marks something as a key insight box or reflection prompt. Do not use callouts for regular teaching text.
- **PDF notes page** — each chapter gets a full "Notes & Questions" page at the end of the PDF download

### Hebrew/Greek Name Convention (MANDATORY for all chapters)
Use Hebrew/Greek names for the divine names throughout all chapter content — in teaching text, headings, list items, and even within scripture quote blocks:

- **Elohim** = God (first mention in a chapter: `Elohim (God)`, all subsequent mentions: `Elohim`)
- **Yehoshua** = Jesus (first mention: `Yehoshua (Jesus)`, subsequent: `Yehoshua`)
- **Mashiah** = Christ (first mention: `Mashiah (Christ)`, subsequent: `Mashiah`)
- **Yehoshua Mashiah** = Jesus Christ (first mention: `Yehoshua Mashiah (Jesus Christ)`, subsequent: `Yehoshua Mashiah`)
- **YHWH** or **the LORD** — leave as-is in scripture quotations where it appears

The "first mention" rule applies **per chapter file** — each chapter independently introduces the name with its translation on the very first occurrence, then drops the translation for all subsequent uses.

Note: Some authors use variant spellings (`Elohîm`, `Yehoshoua`) — do not change an author's chosen spelling, but apply the same first-mention rule.

### Git Branch Structure
```
main                              ← Live site (GitHub Pages)
  └── feature/booklets            ← All booklet work
        └── booklet-1/develop     ← Integration branch for Booklet 1
              ├── booklet-1/franck
              ├── booklet-1/jonathan
              ├── booklet-1/jules
              └── booklet-1/anita
```
Commit message format: `content(booklet-1): add chapter X - Chapter Title`
