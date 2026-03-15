/**
 * BYMEN Bible — Book Name & Person Name Mappings
 *
 * Maps Hebrew/Greek names used in the BYMEN translation to their
 * common English equivalents. Used to build per-chapter footnotes.
 */

var BYMEN_BOOKS = {
  // Torah / Pentateuch
  "Bereshit": "Genesis",
  "Shemot": "Exodus",
  "Vayikra": "Leviticus",
  "Bamidbar": "Numbers",
  "Devarim": "Deuteronomy",

  // Historical Books
  "Yehoshua": "Joshua",
  "Shoftim": "Judges",
  "Rut": "Ruth",
  "1 Shemuel": "1 Samuel",
  "2 Shemuel": "2 Samuel",
  "1 Melakhim": "1 Kings",
  "2 Melakhim": "2 Kings",
  "1 Divrei HaYamim": "1 Chronicles",
  "2 Divrei HaYamim": "2 Chronicles",
  "Ezra": "Ezra",
  "Nechemyah": "Nehemiah",
  "Ester": "Esther",

  // Wisdom / Poetry
  "Iyov": "Job",
  "Tehilim": "Psalms",
  "Mishlei": "Proverbs",
  "Qohelet": "Ecclesiastes",
  "Shir HaShirim": "Song of Solomon",

  // Major Prophets
  "Yesha'yah": "Isaiah",
  "Yirmeyah": "Jeremiah",
  "Eikhah": "Lamentations",
  "Yehezqel": "Ezekiel",
  "Daniyel": "Daniel",

  // Minor Prophets
  "Hoshea": "Hosea",
  "Yoel": "Joel",
  "Amos": "Amos",
  "Ovadyah": "Obadiah",
  "Yonah": "Jonah",
  "Mikhah": "Micah",
  "Nahum": "Nahum",
  "Habakkuk": "Habakkuk",
  "Tsephanyah": "Zephaniah",
  "Haggai": "Haggai",
  "Zekharyah": "Zechariah",
  "Malakhi": "Malachi",

  // New Testament — Gospels
  "Mattithyah": "Matthew",
  "Markos": "Mark",
  "Loukas": "Luke",
  "Yohanan": "John",

  // Acts
  "Acts": "Acts",

  // Pauline Epistles
  "Romans": "Romans",
  "1 Corinthians": "1 Corinthians",
  "2 Corinthians": "2 Corinthians",
  "Galatians": "Galatians",
  "Ephesians": "Ephesians",
  "Philippians": "Philippians",
  "Colossians": "Colossians",
  "1 Thessalonians": "1 Thessalonians",
  "2 Thessalonians": "2 Thessalonians",
  "1 Timothy": "1 Timothy",
  "2 Timothy": "2 Timothy",
  "Titus": "Titus",
  "Philemon": "Philemon",

  // General Epistles
  "Hebrews": "Hebrews",
  "Yaacov": "James",
  "1 Petros": "1 Peter",
  "2 Petros": "2 Peter",
  "1 Yohanan": "1 John",
  "2 Yohanan": "2 John",
  "3 Yohanan": "3 John",
  "Yehudah": "Jude",

  // Apocalypse
  "Revelation": "Revelation"
};

/**
 * Common person name translations used across chapters.
 * Each chapter's footnotes object should include only the names
 * that actually appear in that chapter.
 */
var BYMEN_PERSONS = {
  "Paulos": "Paul",
  "Kephas": "Peter",
  "Petros": "Peter",
  "Yaacov": "James",
  "Yohanan": "John",
  "Moshe": "Moses",
  "Avraham": "Abraham",
  "Yitshaq": "Isaac",
  "Yaaqov": "Jacob",
  "Dawid": "David",
  "Shlomoh": "Solomon",
  "Eliyah": "Elijah",
  "Elisha": "Elisha",
  "Yeshayah": "Isaiah",
  "Yirmeyah": "Jeremiah",
  "Daniyel": "Daniel",
  "Shim'on": "Simon",
  "Mattithyah": "Matthew",
  "Markos": "Mark",
  "Loukas": "Luke",
  "Bar-Nabba": "Barnabas",
  "Timotheos": "Timothy",
  "Apollos": "Apollos",
  "Stephanos": "Stephen"
};
