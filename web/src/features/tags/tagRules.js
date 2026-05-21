// src/public_app/features/tags/tagRules.js

export const TAG_RULES = {
  origin: [
    { label: "Pakistan", path: "/tags/pakistan" },
    { label: "India", path: "/tags/india" },
    { label: "USA", path: "/tags/usa" },
    { label: "Israel", path: "/tags/israel" },
  ],
  genre: [
    { label: "Romance", path: "/tags/romance" },
    { label: "Sci-Fi", path: "/tags/scifi" },
    { label: "Fantasy", path: "/tags/fantasy" },
    { label: "Thriller", path: "/tags/thriller" },
    { label: "Philosophy", path: "/tags/philosophy" },
    { label: "Futurism", path: "/tags/futurism" },
  ],
  type: [
    { label: "Comic", path: "/tags/comics" },
    { label: "Novel", path: "/tags/novel" },
    { label: "Non-fiction", path: "/tags/non-fiction" },
  ],
  author: [
    {
      name: "Yuval Noah Harari",
      tags: [
        { label: "Israeli Books", path: "/tags/israeli-books" },
        { label: "History", path: "/tags/history" },
        { label: "Philosophy", path: "/tags/philosophy" },
      ],
    },
    {
      name: "Bhagat Singh",
      tags: [
        { label: "Pakistani Books", path: "/tags/pakistani-books" },
        { label: "Indian History", path: "/tags/indian-history" },
        { label: "Revolution", path: "/tags/revolution" },
      ],
    },
  ],
};
