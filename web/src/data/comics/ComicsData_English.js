// frontend/src/data/comics/ComicsData.js

import ComicsImageData from './ComicsImageData';

export const ComicsData = [
  {
    id: 1,
    title: "Marvel Comics #1",
    publisher: "Timely Publications (Now Marvel Comics)",
    publicationDate: "October 1939",
    coverPrice: "10 cents",
    format: "68 pages, full color",
    charactersIntroduced: [
      "The Human Torch (Jim Hammond)",
      "Namor the Sub-Mariner",
      "Ka-Zar the Great",
      "The Masked Raider",
      "The Angel"
    ],
    creators: {
      editor: "Martin Goodman",
      writersArtists: [
        "Carl Burgos",
        "Bill Everett",
        "Ben Thompson",
        "Paul Gustavson",
        "Al Anders"
      ]
    },
    description: "Marvel Comics #1 (1939) marks the beginning of the Marvel Universe. Published by Timely Publications, it introduced iconic characters like the Human Torch and Namor the Sub-Mariner. The comic's anthology-style storytelling set the foundation for decades of superhero adventures and cemented Marvel's legacy in the comic world.",
    sales: {
      firstPrint: "80,000 copies",
      secondPrint: "800,000 copies (retitled Marvel Mystery Comics #1)"
    },
    valueToday: "$1.26 million (near-mint copy sold in 2019)",
    funFact: "Though called Marvel Comics, the company didn't officially take the Marvel name until the 1960s. This first issue's success led directly to the rise of the Marvel brand.",
    image: ComicsImageData.MarvelComics1,
    category: "Golden Age",
    rating: 9.8
  },
  {
    id: 2,
    title: "Amazing Fantasy #15",
    publisher: "Marvel Comics",
    publicationDate: "August 1962",
    coverPrice: "12 cents",
    format: "36 pages, full color",
    charactersIntroduced: [
      "Spider-Man (Peter Parker)",
      "Uncle Ben",
      "Aunt May"
    ],
    creators: {
      editor: "Stan Lee",
      writersArtists: [
        "Stan Lee",
        "Steve Ditko"
      ]
    },
    description: "The first appearance of Spider-Man in Amazing Fantasy #15 revolutionized superhero storytelling by introducing a teenage hero with real-world problems. This issue laid the groundwork for one of Marvel's most iconic and enduring characters.",
    sales: {
      firstPrint: "unknown",
      secondPrint: "None (series was cancelled)"
    },
    valueToday: "$1.1 million (near-mint copy sold in 2011)",
    funFact: "This was the final issue of Amazing Fantasy before the series was cancelled, making Spider-Man's debut a 'last chance' story that unexpectedly created a legend.",
    image: ComicsImageData.AmazingFantasy15,
    category: "Silver Age",
    rating: 9.9
  },
  {
    id: 3,
    title: "The Incredible Hulk #1",
    publisher: "Marvel Comics",
    publicationDate: "May 1962",
    coverPrice: "12 cents",
    format: "40 pages, full color",
    charactersIntroduced: [
      "Hulk (Bruce Banner)",
      "Rick Jones",
      "General Thunderbolt Ross"
    ],
    creators: {
      editor: "Stan Lee",
      writersArtists: [
        "Stan Lee",
        "Jack Kirby"
      ]
    },
    description: "The first appearance of the Incredible Hulk introduced Bruce Banner, a scientist transformed into a raging green giant by gamma radiation. This comic explored themes of science gone wrong and the monster within.",
    sales: {
      firstPrint: "unknown",
      secondPrint: "None"
    },
    valueToday: "$375,000 (near-mint copy)",
    funFact: "The Hulk was originally gray in this first issue, but coloring problems led to him becoming green in subsequent appearances.",
    image: ComicsImageData.IncredibleHulk1,
    category: "Silver Age",
    rating: 9.5
  },
  {
    id: 4,
    title: "The Avengers #1",
    publisher: "Marvel Comics",
    publicationDate: "September 1963",
    coverPrice: "12 cents",
    format: "36 pages, full color",
    charactersIntroduced: [
      "Avengers Team",
      "Loki (as main villain)"
    ],
    creators: {
      editor: "Stan Lee",
      writersArtists: [
        "Stan Lee",
        "Jack Kirby"
      ]
    },
    description: "The Avengers #1 brought together Earth's Mightiest Heroes - Iron Man, Thor, Hulk, Ant-Man, and the Wasp - to face Loki's schemes. This marked the beginning of Marvel's premier superhero team.",
    sales: {
      firstPrint: "unknown",
      secondPrint: "None"
    },
    valueToday: "$274,000 (near-mint copy)",
    funFact: "The Hulk left the team in issue #2, and Captain America joined in issue #4, establishing the classic Avengers lineup.",
    image: ComicsImageData.Avengers1,
    category: "Silver Age",
    rating: 9.6
  },
  {
    id: 5,
    title: "The X-Men #1",
    publisher: "Marvel Comics",
    publicationDate: "September 1963",
    coverPrice: "12 cents",
    format: "36 pages, full color",
    charactersIntroduced: [
      "Professor X",
      "Cyclops",
      "Marvel Girl (Jean Grey)",
      "Beast",
      "Iceman",
      "Angel",
      "Magneto"
    ],
    creators: {
      editor: "Stan Lee",
      writersArtists: [
        "Stan Lee",
        "Jack Kirby"
      ]
    },
    description: "X-Men #1 introduced the world to Marvel's mutants - teenagers with extraordinary powers led by Professor Xavier to protect a world that fears and hates them.",
    sales: {
      firstPrint: "unknown",
      secondPrint: "None"
    },
    valueToday: "$492,000 (near-mint copy)",
    funFact: "The X-Men were originally created as a way to have superheroes who were born with their powers, eliminating the need for radioactive accidents or high-tech armor.",
    image: ComicsImageData.XMen1,
    category: "Silver Age",
    rating: 9.7
  },
  {
    id: 6,
    title: "Fantastic Four #1",
    publisher: "Marvel Comics",
    publicationDate: "November 1961",
    coverPrice: "10 cents",
    format: "36 pages, full color",
    charactersIntroduced: [
      "Mr. Fantastic",
      "Invisible Girl",
      "Human Torch",
      "The Thing",
      "The Mole Man"
    ],
    creators: {
      editor: "Stan Lee",
      writersArtists: [
        "Stan Lee",
        "Jack Kirby"
      ]
    },
    description: "Fantastic Four #1 launched the Marvel Age of Comics, introducing a superhero family with realistic personalities and conflicts. This groundbreaking approach revolutionized the industry.",
    sales: {
      firstPrint: "unknown",
      secondPrint: "None"
    },
    valueToday: "$300,000 (near-mint copy)",
    funFact: "The Fantastic Four didn't have costumes in the first issue - they were introduced in issue #3, making this one of the few superhero debuts without traditional uniforms.",
    image: ComicsImageData.FantasticFour1,
    category: "Silver Age",
    rating: 9.8
  },
  {
    id: 7,
    title: "Iron Man #1",
    publisher: "Marvel Comics",
    publicationDate: "May 1968",
    coverPrice: "12 cents",
    format: "36 pages, full color",
    charactersIntroduced: [
      "Iron Man (Tony Stark)",
      "Pepper Potts",
      "Happy Hogan"
    ],
    creators: {
      editor: "Stan Lee",
      writersArtists: [
        "Stan Lee",
        "Don Heck"
      ]
    },
    description: "Iron Man's first solo series expanded on his character after his debut in Tales of Suspense, establishing Tony Stark as a complex hero dealing with business pressures and personal demons.",
    sales: {
      firstPrint: "unknown",
      secondPrint: "None"
    },
    valueToday: "$40,000 (near-mint copy)",
    funFact: "Iron Man was originally created as a challenge to make a capitalist weapons manufacturer into a likable superhero during the Cold War era.",
    image: ComicsImageData.IronMan1,
    category: "Silver Age",
    rating: 9.3
  },
  {
    id: 8,
    title: "Captain America Comics #1",
    publisher: "Timely Comics",
    publicationDate: "March 1941",
    coverPrice: "10 cents",
    format: "68 pages, full color",
    charactersIntroduced: [
      "Captain America (Steve Rogers)",
      "Bucky Barnes"
    ],
    creators: {
      editor: "Joe Simon",
      writersArtists: [
        "Joe Simon",
        "Jack Kirby"
      ]
    },
    description: "Captain America Comics #1 introduced the star-spangled superhero who would become Marvel's moral compass. The iconic cover showing Cap punching Hitler was controversial but hugely popular.",
    sales: {
      firstPrint: "nearly 1 million copies",
      secondPrint: "unknown"
    },
    valueToday: "$343,000 (near-mint copy)",
    funFact: "The first issue sold out in just days, and the character became so popular that the series was published bimonthly for a time to meet demand.",
    image: ComicsImageData.CaptainAmerica1,
    category: "Golden Age",
    rating: 9.7
  },


  {
    id: 9,
    title: "Nagraj Aur Miss Killer",
    publisher: "Raj Comics",
    publicationDate: "1989",
    coverPrice: "₹12",
    format: "32 pages, color",
    charactersIntroduced: ["Miss Killer"],
    creators: {
      editor: "Manoj Gupta",
      writersArtists: ["Sanjay Gupta", "Anupam Sinha"]
    },
    description: "In this action-packed issue, Nagraj faces Miss Killer, a deadly assassin who tests his powers and moral limits. The story delves deep into Nagraj’s struggle between vengeance and justice.",
    sales: { firstPrint: "highly circulated in North India" },
    valueToday: "₹2,000 (collector’s copy)",
    funFact: "Miss Killer became one of Raj Comics’ most iconic female villains after this debut.",
    image: ComicsImageData.NagrajMissKiller,
    category: "Indian Superhero Comics",
    rating: 9.2
  },

  {
    id: 10,
    title: "Super Commando Dhruva: Pratishodh Ki Jwala",
    publisher: "Raj Comics",
    publicationDate: "1990",
    coverPrice: "₹15",
    format: "40 pages, color",
    charactersIntroduced: [],
    creators: {
      editor: "Manoj Gupta",
      writersArtists: ["Anupam Sinha"]
    },
    description: "Dhruva seeks revenge for his parents’ murder in this emotionally charged issue. The story highlights Dhruva’s intelligence, courage, and detective instincts.",
    sales: { firstPrint: "best-seller of 1990" },
    valueToday: "₹3,500 (mint copy)",
    funFact: "This comic cemented Dhruva as Raj Comics' top non-superpowered hero.",
    image: ComicsImageData.DhruvaPratishodhKiJwala,
    category: "Indian Superhero Comics",
    rating: 9.5
  },

  {
    id: 11,
    title: "Doga: Khooni Paheli",
    publisher: "Raj Comics",
    publicationDate: "1993",
    coverPrice: "₹20",
    format: "36 pages, color",
    charactersIntroduced: [],
    creators: {
      editor: "Manoj Gupta",
      writersArtists: ["Tarun Kumar Wahi", "Manik"]
    },
    description: "Doga, the dark vigilante of Mumbai, hunts down a serial killer in this gritty crime thriller. It shows Doga’s no-mercy approach to justice.",
    sales: { firstPrint: "record-breaking in Mumbai" },
    valueToday: "₹3,000 (rare issue)",
    funFact: "‘Khooni Paheli’ is one of the first Raj Comics to explore psychological darkness.",
    image: ComicsImageData.DogaKhooniPaheli,
    category: "Indian Superhero Comics",
    rating: 9.4
  },

  {
    id: 12,
    title: "Bhokal: Tilism Ka Rakhwala",
    publisher: "Raj Comics",
    publicationDate: "1987",
    coverPrice: "₹10",
    format: "30 pages, color",
    charactersIntroduced: ["Bhokal"],
    creators: {
      editor: "Manoj Gupta",
      writersArtists: ["Dheeraj Verma"]
    },
    description: "The first appearance of Bhokal, the warrior prince from Parilok, who wields divine weapons and fights demonic forces to protect humanity.",
    sales: { firstPrint: "sold out within weeks" },
    valueToday: "₹4,000 (collector’s item)",
    funFact: "Bhokal’s debut issue is considered a cornerstone of Raj Comics’ fantasy universe.",
    image: ComicsImageData.BhokalTilismKaRakhwala,
    category: "Fantasy Superhero Comics",
    rating: 9.6
  },

  {
    id: 13,
    title: "Parmanu: Atomic Hero",
    publisher: "Raj Comics",
    publicationDate: "1991",
    coverPrice: "₹15",
    format: "35 pages, color",
    charactersIntroduced: ["Parmanu"],
    creators: {
      editor: "Manoj Gupta",
      writersArtists: ["Ved Prakash Sharma", "Bedi"]
    },
    description: "Inspector Vinay dons a high-tech suit to become Parmanu, India’s first atomic-powered superhero, using science and technology to fight crime.",
    sales: { firstPrint: "top 5 Raj Comics issue of 1991" },
    valueToday: "₹2,500 (mint copy)",
    funFact: "Parmanu’s character was inspired by Western heroes like Iron Man and The Atom.",
    image: ComicsImageData.ParmanuAtomicHero,
    category: "Science Fiction Comics",
    rating: 9.3
  },


  {
    id: 14,
    title: "Emperor Samar Chakrawarti",
    publisher: "Apex Comics",
    publicationDate: "2026",
    coverPrice: "₹15",
    format: "35 pages, color",
    charactersIntroduced: ["Samar Chakrawarti"],
    creators: {
      editor: "Sachin Chakrawarti",
      writersArtists: ["Sachin Chakrawarti"]
    },
    description: "The Cyber Mystic, The Architect of the Future, His enigmatic nature, coupled with his mysterious connection to figures like Samridhi Kapoor and Priyanka Shrivastav, makes him one of the most influential beings of his era...",
    sales: { firstPrint: "" },
    valueToday: "₹2,500 (mint copy)",
    funFact: "Emperor Samar Chakrawarti marks the birth of Apex Comics' Metaphysical Cyberverse — a fusion of mysticism, transhumanism, and artificial consciousness.",
    image: ComicsImageData.EmperorSamarChakrawarti,
    category: "Science Fiction Comics",
    rating: 9.3
  },


];