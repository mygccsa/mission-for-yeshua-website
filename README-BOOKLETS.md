# Teaching Booklets — Contribution Guide

## What Are the Booklets?

The Teaching Booklets are a series of four study guides published through the Mission for Yeshua website. Each booklet contains 9–12 chapters covering foundational biblical teachings. The booklets are read in a mobile-first flipbook reader and can be downloaded as PDF for offline study or printing.

**Live page:** [mission4yeshua.org/pages/booklets.html](https://mission4yeshua.org/pages/booklets.html)

---

## How the Reader Works

- The booklet reader is a single HTML file (`pages/booklets.html`) that loads chapter content from separate JavaScript files in `content/booklet-1/`
- Each chapter file registers its content into a global `BOOKLET_CONTENT` object
- The reader renders the content as a page-flipper with swipe navigation, keyboard controls, and PDF download
- Chapters without content display a "Coming Soon" placeholder automatically

---

## How to Write a Chapter

### Step 1: Find your assigned chapter file

Your chapter file is in `content/booklet-1/`. Each file is named `chapter-XX.js` where XX is the chapter number:

| Chapter | File | Author |
|---------|------|--------|
| 1 — One God | `chapter-01.js` | Franck |
| 2 — One Lord | `chapter-02.js` | Jonathan |
| 3 — One Spirit | `chapter-03.js` | Jules |
| 4 — One Faith | `chapter-04.js` | Jules (example) |
| 5 — One Baptism | `chapter-05.js` | Anita |
| 6 — One Body | `chapter-06.js` | Franck |
| 7 — One Hope | `chapter-07.js` | Franck |
| 8 — The Work of the Cross | `chapter-08.js` | Franck |
| 9 — Repentance from Dead Works | `chapter-09.js` | Jules |
| 10 — The Laying on of Hands | `chapter-10.js` | Jonathan |
| 11 — The Resurrection of the Dead | `chapter-11.js` | Franck |
| 12 — Eternal Judgment | `chapter-12.js` | Franck |

### Step 2: Open your chapter file

Each file starts with this template:

```javascript
BOOKLET_CONTENT["1-X"] = {
  content: [],
  supportingVerses: [],
  closing: ""
};
```

### Step 3: Add your content inside the `content` array

See the **Content Block Types** section below for all available formats.

### Step 4: Test locally

Open `pages/booklets.html` in your browser. Click on "The Foundations of Faith" and navigate to your chapter. Your content should appear.

---

## Content Block Types

You can mix these 5 block types freely inside the `content` array. See `content/EXAMPLE-CHAPTER.js` for a fully documented reference and `content/booklet-1/chapter-04.js` for a real working example.

### 1. Paragraph

A plain string. The simplest block type.

```javascript
"Your teaching paragraph text here. You can write as long as you need."
```

### 2. Pull Quote

For scripture passages or impactful statements. Renders with a left accent border and large opening quotation mark.

```javascript
{ type: "quote", text: "The quoted words here", source: "Attribution or Reference" }
```

### 3. Image

Displays with rounded corners, shadow, and an optional caption.

```javascript
{ type: "image", src: "../images/booklets/photo.jpg", caption: "Description text" }
```

> **Note:** Place your images in the `images/booklets/` folder. Use descriptive filenames like `chapter-05-baptism-river.jpg`. Keep images under 200KB.

### 4. Callout Box

A highlighted box for key insights, reflection prompts, or important notes. Include an emoji icon.

```javascript
{ type: "callout", text: "Key point or reflection prompt", icon: "🔑" }
```

Common icons: 🔑 (key truth), ✍ (reflection), 💡 (insight), ⚠ (warning), 📖 (scripture focus)

### 5. Sub-heading

A section divider within your chapter. Use to break long content into logical sections.

```javascript
{ type: "heading", text: "Next Section Title" }
```

### Supporting Verses

After the main `content` array, add supporting scriptures:

```javascript
supportingVerses: [
  { text: "Verse text here", ref: "Book Chapter:Verse" },
  { text: "Another verse", ref: "Another Reference" }
]
```

### Closing Prayer

A prayer or reflection to end the chapter:

```javascript
closing: "Father, we thank You for this truth. Help us to walk in it daily. In the name of Yehoshoua, Amen."
```

---

## Complete Example

Here's a minimal chapter with all block types:

```javascript
BOOKLET_CONTENT["1-5"] = {
  content: [
    "Opening paragraph introducing the topic of baptism...",

    { type: "quote", text: "For we were all baptized by one Spirit so as to form one body.", source: "1 Corinthians 12:13" },

    "More teaching content here...",

    { type: "heading", text: "The Meaning of Baptism" },

    "Content for this section...",

    { type: "callout", text: "Reflection: Have you been baptized? What did it mean to you?", icon: "✍" },

    "Closing paragraph..."
  ],
  supportingVerses: [
    { text: "Go therefore and make disciples of all nations, baptizing them...", ref: "Matthew 28:19" }
  ],
  closing: "Lord, may we understand the depth of what baptism represents. In Yehoshoua's name, Amen."
};
```

---

## Git Workflow

### Branch structure

```
main                              ← Live site (do not push here directly)
  └── feature/booklets            ← All booklet work lives here
        └── booklet-1/develop     ← Integration branch for Booklet 1
              ├── booklet-1/franck    ← Chapters 1, 6, 7, 8, 11, 12
              ├── booklet-1/jonathan  ← Chapters 2, 10
              ├── booklet-1/jules     ← Chapters 3, 4, 9
              └── booklet-1/anita     ← Chapter 5
```

### How to commit your work

1. Switch to your branch:
   ```bash
   git checkout booklet-1/yourname
   ```

2. Edit ONLY your assigned chapter file(s)

3. Commit with this message format:
   ```bash
   git add content/booklet-1/chapter-XX.js
   git commit -m "content(booklet-1): add chapter X - Chapter Title"
   ```

4. Push your branch:
   ```bash
   git push origin booklet-1/yourname
   ```

5. Open a Pull Request: `booklet-1/yourname` → `booklet-1/develop`

### Commit message examples

```
content(booklet-1): add chapter 1 - One God
content(booklet-1): add chapter 6 - One Body
content(booklet-1): update chapter 1 - add supporting verses
content(booklet-1): add chapter 5 image - baptism-river.jpg
```

---

## File Rules

- **Only edit YOUR assigned chapter file** — never touch other authors' files
- **Never modify `pages/booklets.html`** — Jules manages the reader
- **Never modify `content/EXAMPLE-CHAPTER.js`** — it's a reference only
- If you need to add images, place them in `images/booklets/`

---

## For Non-Git Users (GitHub Web Editor)

If you're not comfortable with Git on the command line, you can edit directly on GitHub:

1. Go to the repository on GitHub
2. Navigate to `content/booklet-1/`
3. Click on your chapter file (e.g., `chapter-05.js`)
4. Click the pencil icon (Edit this file)
5. Make sure you're on your branch (e.g., `booklet-1/anita`) — use the branch dropdown
6. Edit your content
7. Scroll down, write a commit message like `content(booklet-1): add chapter 5 - One Baptism`
8. Click "Commit changes"
9. Then create a Pull Request from your branch to `booklet-1/develop`

---

## Image Guidelines

- **Location:** Place all images in `images/booklets/`
- **Naming:** Use descriptive filenames: `chapter-01-creation.jpg`, `chapter-05-baptism-river.jpg`
- **Size:** Keep images under 200KB (compress with [tinypng.com](https://tinypng.com) if needed)
- **Format:** JPG for photos, PNG for graphics
- **Dimensions:** At least 600px wide for good quality in the reader
- **In your chapter file:** Reference as `../images/booklets/your-image.jpg`

---

## Timeline

| Phase | Duration | Description |
|-------|----------|-------------|
| Writing | 2–3 weeks | Authors write their chapters on their branches |
| Review | 1 week | Jules reviews PRs and merges to `booklet-1/develop` |
| Final | — | Merge `booklet-1/develop` → `feature/booklets` → `main` |

---

## Questions?

Contact Jules if you have any questions about the content format, Git workflow, or the reader.
