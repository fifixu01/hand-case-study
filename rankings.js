// ✏️ Edit this file to change the rankings.
// Each category has Fifi's list and Emu's list, from #1 (top) to last.
// Every list should include everyone in PEOPLE exactly once.
// To make people tie, put them in their own brackets: ["Jason", ["Claytron", "Gab"]]

const PEOPLE = ["Claytron", "Gab", "Allan", "Jason", "Furtoe", "David"];

const CATEGORIES = [
  {
    title: "The Most Important Category",
    emoji: "❓",
    mystery: true, // shh 🤫
    fifi: ["Furtoe", "David", "Claytron", "Gab", "Jason", "Allan"],
    emu: [], // empty = Emu hasn't ranked yet
  },
  {
    title: "Most Muscular",
    emoji: "💪",
    note: "Not the hands. Like, overall. Whole-body vibes. 💅",
    fifi: ["Jason", "Furtoe", "Claytron", "David", "Gab", "Allan"],
    emu: [],
  },
  {
    title: "Palm Reading: Longest Life Line",
    emoji: "🔮",
    note: "Professionally read from the back of their hands.",
    fifi: ["David", "Claytron", "Jason", "Gab", "Allan", "Furtoe"],
    emu: [],
  },
  {
    title: "Grip Strength",
    emoji: "✊",
    note: "Estimated by looking at a photo. Very scientific.",
    fifi: ["Jason", "Furtoe", "David", "Allan", ["Claytron", "Gab"]],
    emu: [],
  },
  {
    title: "Funniest",
    emoji: "😂",
    fifi: ["Claytron", "Gab", "Allan", "Jason", "Furtoe", "David"],
    emu: ["Claytron", "Gab", "Allan", "Jason", "Furtoe", "David"],
  },
  {
    title: "Best Dressed",
    emoji: "👗",
    fifi: ["Claytron", "Gab", "Allan", "Jason", "Furtoe", "David"],
    emu: ["Claytron", "Gab", "Allan", "Jason", "Furtoe", "David"],
  },
  {
    title: "Most Likely to Be Late",
    emoji: "⏰",
    fifi: ["Claytron", "Gab", "Allan", "Jason", "Furtoe", "David"],
    emu: ["Claytron", "Gab", "Allan", "Jason", "Furtoe", "David"],
  },
  {
    title: "Best Cook",
    emoji: "🍳",
    fifi: ["Claytron", "Gab", "Allan", "Jason", "Furtoe", "David"],
    emu: ["Claytron", "Gab", "Allan", "Jason", "Furtoe", "David"],
  },
];
