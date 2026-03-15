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
- `pages/` - Subpages (about, books, community-center, contact, teachings)
- `script/css/` - Stylesheets
  - `styles.css` - Shared base styles and CSS variables
  - `*-style.css` - Page-specific styles (e.g., `books-style.css`)
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
- **Footnotes** — each chapter has a `footnotes` object mapping BYMEN book/person names to English equivalents. Only include genuinely unfamiliar names (BYMEN book names, uncommon person names). Do NOT include Elohim/Elohîm, Yehoshua/Yehoshoua, or Mashiah — these are already explained in the Notes to Readers page and introduced with their English equivalent on first mention in every chapter. **Web:** footnoted names become clickable tooltip spans (`.bn` class) showing the English translation on hover/tap. **PDF (normal + print):** per-page academic footnotes — superscript letters (a, b, c…) appear after the first occurrence of each footnoted name on a page, with lettered entries at the page bottom (e.g., "a. Devarim — Deuteronomy").

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
