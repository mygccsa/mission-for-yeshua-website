/**
 * EXAMPLE CHAPTER — Reference Implementation
 * ============================================
 *
 * This file documents every content block type available for chapter authors.
 * Copy the structure below into your assigned chapter file and fill in your content.
 *
 * KEY FORMAT: "bookletNumber-chapterNumber" (1-indexed)
 * Example: Booklet 1, Chapter 4 = "1-4"
 *
 * CONTENT BLOCK TYPES:
 *
 * 1. PARAGRAPH — A plain string
 *    "Your teaching paragraph text here..."
 *
 * 2. PULL QUOTE — Editorial-style with accent border and large opening quote mark
 *    { type: "quote", text: "The quoted words here", source: "Attribution" }
 *
 * 3. IMAGE — With rounded corners, shadow, and optional caption
 *    { type: "image", src: "../images/booklets/photo.jpg", caption: "Description text" }
 *
 * 4. CALLOUT BOX — Highlighted insight with emoji icon
 *    { type: "callout", text: "Key point or reflection prompt", icon: "🔑" }
 *
 * 5. SUB-HEADING — Section divider within the chapter
 *    { type: "heading", text: "Next Section Title" }
 *
 * SUPPORTING VERSES — Rendered centered in italic after main content
 *    supportingVerses: [
 *      { text: "Verse text here", ref: "Book Chapter:Verse" }
 *    ]
 *
 * CLOSING — Prayer or reflection, centered and italic with borders
 *    closing: "Prayer or reflection text here"
 *
 * IMPORTANT RULES:
 * - Only edit YOUR assigned chapter file
 * - Never modify booklets.html or other authors' files
 * - Place images in images/booklets/ with descriptive filenames
 * - Keep images under 200KB
 * - Test locally by opening pages/booklets.html in a browser
 */

// This is a demonstration — do NOT include this file in production.
// See content/booklet-1/chapter-04.js for a real, working example.

BOOKLET_CONTENT["example"] = {
  content: [
    // 1. Paragraph — just a plain string
    "This is a teaching paragraph. Write your content naturally, explaining the biblical truth for the chapter topic. You can write as many paragraphs as you need.",

    // 2. Pull quote — for scripture or impactful statements
    { type: "quote", text: "This is a pull quote. Use it for key scripture passages or powerful statements that deserve visual emphasis.", source: "Attribution or Scripture Reference" },

    // 3. Another paragraph
    "Continue your teaching here. Each paragraph appears as its own block with proper spacing.",

    // 4. Sub-heading — to divide your chapter into sections
    { type: "heading", text: "A New Section Begins Here" },

    // 5. More teaching content
    "After a sub-heading, continue with your teaching content for this section.",

    // 6. Image — for visual illustrations
    { type: "image", src: "../images/booklets/example-photo.jpg", caption: "A descriptive caption for the image" },

    // 7. Callout box — for key insights, reflection prompts, or important notes
    { type: "callout", text: "Key truth: This is a callout box. Use it to highlight an important insight, a reflection question, or a practical application point.", icon: "🔑" },

    // 8. Closing paragraph
    "End your chapter with a strong conclusion that ties everything together and points the reader back to the central truth."
  ],

  // Supporting verses — displayed after the main content
  supportingVerses: [
    { text: "The verse text goes here, quoted from Scripture.", ref: "Book Chapter:Verse" },
    { text: "You can include multiple supporting verses.", ref: "Another Reference" }
  ],

  // Closing prayer or reflection
  closing: "Father, we thank You for this truth. Help us to walk in it daily. In the name of Yehoshoua, Amen."
};
