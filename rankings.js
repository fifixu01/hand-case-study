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
    fifi: ["Furtoe", "David", ["Jason", "Claytron", "Gab"], "Allan"],
    emu: ["Furtoe", "David", "Gab", "Jason", "Allan", "Claytron"],
  },
  {
    title: "Palm Reading: Longest Life Line",
    emoji: "🔮",
    note: "Professionally read from the back of their hands.",
    fifi: ["Claytron", "Allan", "Jason", "Gab", "David", "Furtoe"],
    emu: ["Furtoe", "Claytron", "Allan", "Jason", "Gab", "David"],
  },
  {
    title: "Grip Strength",
    emoji: "✊",
    note: "Estimated by looking at a photo. Very scientific.",
    fifi: ["Jason", "Furtoe", "David", "Allan", ["Claytron", "Gab"]],
    emu: ["David", "Jason", "Furtoe", "Gab", ["Allan", "Claytron"]],
  },
  {
    title: "Aesthetic Ranking",
    emoji: "✨",
    fifi: ["Jason", "David", ["Claytron", "Gab", "Allan", "Furtoe"]],
    emu: ["David", "Jason", ["Claytron", "Gab", "Allan", "Furtoe"]],
  },
];
