/**
 * BYMEN Bible — Book Name & Person Name Mappings
 *
 * Maps Hebrew/Greek names used in the BYMEN translation to their
 * common English equivalents with etymological breakdowns where known.
 * Used to build per-chapter footnotes.
 */

var BYMEN_BOOKS = {
  // Torah / Pentateuch
  "Bereshit": "Genesis, meaning 'in the beginning' — the first word of the book in Hebrew",
  "Shemot": "Exodus, meaning 'names' — from the opening phrase 'these are the names'",
  "Vayikra": "Leviticus, meaning 'and He called' — the first word of the book in Hebrew",
  "Bamidbar": "Numbers, meaning 'in the wilderness' — where the events of the book take place",
  "Devarim": "Deuteronomy, meaning 'words' — from the opening phrase 'these are the words'",

  // Historical Books
  "Yehoshua": "Joshua, from Yah (YHWH) and Shua (salvation): 'YHWH is salvation'",
  "Shoftim": "Judges",
  "Rut": "Ruth",
  "1 Shemuel": "1 Samuel, from Shama (heard) and El (God): 'heard by Elohim'",
  "2 Shemuel": "2 Samuel, from Shama (heard) and El (God): 'heard by Elohim'",
  "1 Melakhim": "1 Kings",
  "2 Melakhim": "2 Kings",
  "1 Divrei HaYamim": "1 Chronicles, meaning 'words of the days'",
  "2 Divrei HaYamim": "2 Chronicles, meaning 'words of the days'",
  "Ezra": "Ezra, meaning 'help'",
  "Nechemyah": "Nehemiah, from Nacham (comfort) and Yah (YHWH): 'YHWH comforts'",
  "Ester": "Esther",

  // Wisdom / Poetry
  "Iyov": "Job",
  "Tehilim": "Psalms, meaning 'praises' — from the Hebrew Tehillah (praise)",
  "Mishlei": "Proverbs, meaning 'parables' or 'wise sayings'",
  "Qohelet": "Ecclesiastes, meaning 'the preacher' or 'the assembler'",
  "Shir HaShirim": "Song of Solomon, meaning 'song of songs'",

  // Major Prophets
  "Yesha'yah": "Isaiah, from Yasha (salvation) and Yah (YHWH): 'YHWH is salvation'",
  "Yirmeyah": "Jeremiah, from Rum (exalt) and Yah (YHWH): 'YHWH will exalt'",
  "Eikhah": "Lamentations, meaning 'how!' — the cry of grief that opens the book",
  "Yehezqel": "Ezekiel, from Chazaq (strengthen) and El (God): 'Elohim strengthens'",
  "Daniyel": "Daniel, from Dani (my judge) and El (God): 'Elohim is my judge'",

  // Minor Prophets
  "Hoshea": "Hosea, from Yasha (to save): 'salvation'",
  "Yoel": "Joel, from Yo (YHWH) and El (God): 'YHWH is Elohim'",
  "Amos": "Amos",
  "Ovadyah": "Obadiah, from Oved (servant) and Yah (YHWH): 'servant of YHWH'",
  "Yonah": "Jonah, meaning 'dove' in Hebrew",
  "Mikhah": "Micah, from Mi (who) and Kah (like YHWH): 'who is like YHWH?'",
  "Nahum": "Nahum, from Nacham: 'comfort'",
  "Habakkuk": "Habakkuk",
  "Tsephanyah": "Zephaniah, from Tsaphan (hide) and Yah (YHWH): 'YHWH has hidden'",
  "Haggai": "Haggai",
  "Zekharyah": "Zechariah, from Zakhar (remember) and Yah (YHWH): 'YHWH remembers'",
  "Malakhi": "Malachi, from Malakh (messenger): 'my messenger'",

  // New Testament — Gospels
  "Mattithyah": "Matthew, from Mattan (gift) and Yah (YHWH): 'gift of YHWH'",
  "Markos": "Mark",
  "Loukas": "Luke",
  "Yohanan": "John, from Yo (YHWH) and Chanan (gracious): 'YHWH is gracious'",

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
  "Yaacov": "James, from Yaaqov (supplanter): 'he grasps the heel'",
  "1 Petros": "1 Peter, from Petros (Greek) meaning 'rock'",
  "2 Petros": "2 Peter, from Petros (Greek) meaning 'rock'",
  "1 Yohanan": "1 John, from Yo (YHWH) and Chanan (gracious): 'YHWH is gracious'",
  "2 Yohanan": "2 John, from Yo (YHWH) and Chanan (gracious): 'YHWH is gracious'",
  "3 Yohanan": "3 John, from Yo (YHWH) and Chanan (gracious): 'YHWH is gracious'",
  "Yehudah": "Jude, from Yadah (praise): 'praise'",

  // Apocalypse
  "Revelation": "Revelation"
};

/**
 * Common person name translations used across chapters.
 * Each chapter's footnotes object should include only the names
 * that actually appear in that chapter.
 */
var BYMEN_PERSONS = {
  "Paulos": "Paul, from the Latin Paulus meaning 'small' or 'humble'",
  "Kephas": "Peter, from the Aramaic Kepha meaning 'rock'",
  "Petros": "Peter, from the Greek Petros meaning 'rock'",
  "Yaacov": "James, from Yaaqov (supplanter): 'he grasps the heel'",
  "Yohanan": "John, from Yo (YHWH) and Chanan (gracious): 'YHWH is gracious'",
  "Moshe": "Moses, from the Hebrew Mashah meaning 'drawn out' — because he was drawn out of water",
  "Avraham": "Abraham, from Av (father) and Hamon (multitude): 'father of many nations'",
  "Yitshaq": "Isaac, from Tsachaq (to laugh): 'he laughs' — because Sarah laughed at the promise",
  "Yaaqov": "Jacob, from Aqev (heel): 'he grasps the heel' or 'supplanter'",
  "Dawid": "David, from the Hebrew Dod meaning 'beloved'",
  "Shlomoh": "Solomon, from Shalom (peace): 'peaceful'",
  "Eliyah": "Elijah, from Eli (my God) and Yah (YHWH): 'my Elohim is YHWH'",
  "Elisha": "Elisha, from El (God) and Yasha (salvation): 'Elohim is salvation'",
  "Yeshayah": "Isaiah, from Yasha (salvation) and Yah (YHWH): 'YHWH is salvation'",
  "Yirmeyah": "Jeremiah, from Rum (exalt) and Yah (YHWH): 'YHWH will exalt'",
  "Daniyel": "Daniel, from Dani (my judge) and El (God): 'Elohim is my judge'",
  "Shim'on": "Simon, from Shama (to hear): 'he has heard'",
  "Mattithyah": "Matthew, from Mattan (gift) and Yah (YHWH): 'gift of YHWH'",
  "Markos": "Mark",
  "Loukas": "Luke",
  "Bar-Nabba": "Barnabas, from Bar (son) and Nabba (encouragement): 'son of encouragement'",
  "Timotheos": "Timothy, from the Greek Timao (honor) and Theos (God): 'honoring Elohim'",
  "Apollos": "Apollos",
  "Stephanos": "Stephen, from the Greek Stephanos meaning 'crown' or 'wreath'"
};

/**
 * Common place/location name translations used across chapters.
 * Each chapter's footnotes object should include only the names
 * that actually appear in that chapter.
 */
var BYMEN_PLACES = {
  "Yerushalaim": "Jerusalem, from Yeru (foundation/city) and Shalom (peace): 'city of peace'",
  "Yarden": "Jordan, from Yarad (to descend): 'the descender' — the river flows downward into the Dead Sea",
  "Galil": "Galilee, from Galil meaning 'district' or 'circle'",
  "Nazaret": "Nazareth, possibly from Netser (branch): 'branch' — echoing the messianic prophecy",
  "Beit-Lehem": "Bethlehem, from Beit (house) and Lehem (bread): 'house of bread'",
  "Shomron": "Samaria, from Shamar (to watch): 'watch mountain'",
  "Mitsrayim": "Egypt, from Metsar (narrow place): 'narrow straits' — referring to distress or confinement",
  "Bavel": "Babylon, from Balal (to confuse): 'confusion' — where Elohim confused the languages",
  "Tsiyon": "Zion, meaning 'fortress' or 'stronghold'",
  "Yisrael": "Israel, from Yisra (wrestles) and El (God): 'he wrestles with Elohim'",
  "Yehudah": "Judea, from Yadah (to praise): 'praise'"
};
