// Feed_Data.js - 50+ Sample Posts for Drift Social Media

export const generateSamplePosts = () => {
  const authors = [
    {
      id: "author1",
      name: "Sarah J. Maas",
      username: "@sarahjmaas",
      avatar: "https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=Sarah+Maas",
      verified: true,
      role: "Bestselling Author",
      followers: "2.5M"
    },
    {
      id: "author2",
      name: "Brandon Sanderson",
      username: "@BrandSanderson",
      avatar: "https://ui-avatars.com/api/?background=3B82F6&color=fff&name=Brandon+Sanderson",
      verified: true,
      role: "Fantasy Author",
      followers: "1.8M"
    },
    {
      id: "author3",
      name: "Stephen King",
      username: "@StephenKing",
      avatar: "https://ui-avatars.com/api/?background=EF4444&color=fff&name=Stephen+King",
      verified: true,
      role: "Horror Master",
      followers: "3.2M"
    },
    {
      id: "reader1",
      name: "BookLover Emma",
      username: "@emmareads",
      avatar: "https://ui-avatars.com/api/?background=EC4899&color=fff&name=Emma+Reads",
      verified: false,
      role: "Book Reviewer",
      followers: "45.2K"
    },
    {
      id: "reader2",
      name: "Fantasy Book Club",
      username: "@fantasyclub",
      avatar: "https://ui-avatars.com/api/?background=10B981&color=fff&name=Fantasy+Club",
      verified: true,
      role: "Book Community",
      followers: "128K"
    },
    {
      id: "reader3",
      name: "Thriller Addict",
      username: "@thrilleraddict",
      avatar: "https://ui-avatars.com/api/?background=F59E0B&color=fff&name=Thriller+Addict",
      verified: false,
      role: "Book Influencer",
      followers: "67.8K"
    },
    {
      id: "author4",
      name: "Colleen Hoover",
      username: "@colleenhoover",
      avatar: "https://ui-avatars.com/api/?background=06B6D4&color=fff&name=Colleen+Hoover",
      verified: true,
      role: "Romance Author",
      followers: "1.2M"
    },
    {
      id: "publisher1",
      name: "Penguin Books",
      username: "@penguinbooks",
      avatar: "https://ui-avatars.com/api/?background=000000&color=fff&name=Penguin+Books",
      verified: true,
      role: "Publisher",
      followers: "892K"
    },
    {
      id: "reader4",
      name: "Sci-Fi Reader",
      username: "@scifireader",
      avatar: "https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=Sci-Fi+Reader",
      verified: false,
      role: "Sci-Fi Enthusiast",
      followers: "23.4K"
    },
    {
      id: "author5",
      name: "R.F. Kuang",
      username: "@rfkuang",
      avatar: "https://ui-avatars.com/api/?background=DB2777&color=fff&name=R.F.+Kuang",
      verified: true,
      role: "Award-Winning Author",
      followers: "156K"
    }
  ];

  const topics = [
    "#AmWriting", "#BookTwitter", "#FantasyBooks", "#SciFi", "#RomanceNovels",
    "#ThrillerThursday", "#BookRecommendations", "#ReadingChallenge", "#BookCommunity",
    "#IndieAuthors", "#BookLaunch", "#WritingCommunity", "#BookReview", "#Bookstagram",
    "#CurrentlyReading", "#JustFinished", "#BookHaul", "#LibraryLove", "#BookishLife"
  ];

  const posts = [];

  // Generate 50+ posts
  for (let i = 0; i < 60; i++) {
    const author = authors[i % authors.length];
    const date = new Date();
    date.setHours(date.getHours() - i * 3); // Spread posts over time
    
    const hasMedia = i % 5 === 0 || i % 7 === 0;
    const isRetweet = i % 12 === 0 && i > 0;
    const isReply = i % 15 === 0 && i > 0;
    const hasPoll = i % 20 === 0;
    
    let content = "";
    
    if (isRetweet) {
      content = `RT @${authors[(i+3) % authors.length].username}: ${getRandomContent(topics)}`;
    } else {
      content = getRandomContent(topics);
    }
    
    const post = {
      id: Date.now() - i * 1000000,
      author: {
        ...author,
        id: author.id
      },
      content: content,
      timestamp: date.toISOString(),
      likes: Math.floor(Math.random() * 5000),
      comments: Math.floor(Math.random() * 500),
      retweets: Math.floor(Math.random() * 200),
      liked: false,
      bookmarked: false,
      likeCount: Math.floor(Math.random() * 5000),
      commentCount: Math.floor(Math.random() * 500),
      retweetCount: Math.floor(Math.random() * 200),
    };
    
    // Add media to some posts
    if (hasMedia) {
      const mediaTypes = ['image', 'image', 'image', 'video'];
      post.media = {
        type: mediaTypes[Math.floor(Math.random() * mediaTypes.length)],
        url: getRandomMediaUrl()
      };
    }
    
    // Add poll to some posts
    if (hasPoll) {
      post.poll = {
        question: "Which book should I read next?",
        options: [
          { text: "Fantasy Novel", votes: Math.floor(Math.random() * 100), percentage: Math.floor(Math.random() * 100) },
          { text: "Sci-Fi Epic", votes: Math.floor(Math.random() * 100), percentage: Math.floor(Math.random() * 100) },
          { text: "Romance", votes: Math.floor(Math.random() * 100), percentage: Math.floor(Math.random() * 100) }
        ]
      };
    }
    
    // Add retweet info
    if (isRetweet && i > 0) {
      post.isRetweet = true;
      post.originalAuthor = authors[(i+3) % authors.length];
      post.retweetedBy = author;
    }
    
    // Add reply info
    if (isReply && i > 0) {
      post.isReply = true;
      post.parentId = posts[i-1]?.id || Date.now() - (i-1) * 1000000;
    }
    
    posts.push(post);
  }
  
  return posts;
};

// Helper function to generate random content
function getRandomContent(topics) {
  const contents = [
    `Just finished reading an amazing book! ${topics[Math.floor(Math.random() * topics.length)]} ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Any recommendations for books similar to The Name of the Wind? ${topics[Math.floor(Math.random() * topics.length)]}`,
    `My TBR pile is getting out of control! Send help! 📚 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Currently reading: ${getRandomBook()} - absolutely loving it so far! ⭐⭐⭐⭐⭐ ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Book mail today! So excited to dive into these new releases! 📦 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `What's everyone reading this weekend? I need some recommendations! ${topics[Math.floor(Math.random() * topics.length)]}`,
    `The plot twist in ${getRandomBook()} just blew my mind! 🤯 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Just hit my Goodreads reading challenge goal for the year! 🎉 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Does anyone else judge books by their covers? Because I definitely do! 😅 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Writing update: Chapter 15 is done! The words are flowing today! ✍️ ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Just got my hands on an ARC of ${getRandomBook()}! Can't wait to dive in! ${topics[Math.floor(Math.random() * topics.length)]}`,
    `This book boyfriend/girlfriend is ruining all real-life relationships for me! 😂 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Why do all my favorite characters have to die?! 😭 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Coffee ☕ + Books 📚 = Perfect morning! ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Just discovered ${getRandomBook()} and I can't put it down! ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Join our virtual book club discussion this Thursday at 7PM EST! ${topics[Math.floor(Math.random() * topics.length)]}`,
    `The audiobook narration for ${getRandomBook()} is incredible! Highly recommend! 🎧 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Bookstore haul today! My wallet is crying but my soul is happy! 📖 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Just finished a 5-star read! Full review coming soon! ⭐⭐⭐⭐⭐ ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Does anyone else re-read their favorite books just because? No? Just me? 🙈 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Writing a book is 10% inspiration and 90% staring at a blank page. ${topics[Math.floor(Math.random() * topics.length)]}`,
    `The movie adaptation of ${getRandomBook()} is coming out next year! So excited! 🎬 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Just finished ${getRandomBook()} and I'm having a major book hangover! 😩 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Library day is the best day! What did you check out this week? 📚 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Any indie author recommendations? I want to discover some hidden gems! ${topics[Math.floor(Math.random() * topics.length)]}`,
    `The character development in ${getRandomBook()} is chef's kiss! 👨‍🍳💋 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Just pre-ordered the special edition of ${getRandomBook()}! Can't wait for release day! ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Bookish merch is my weakness! Send help (and more shelves)! 🛍️ ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Currently beta reading for a fellow author - so honored! ${topics[Math.floor(Math.random() * topics.length)]}`,
    `The enemies to lovers trope will never get old! Change my mind! 🔥 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Just organized my bookshelf by color and it's SO satisfying! 🌈 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Reading ${getRandomBook()} at 2 AM was a mistake. Now I can't sleep! 💀 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Support your local indie bookstores! They're treasures! 📚 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `The slow burn romance in ${getRandomBook()} is killing me! 🔥 ${topics[Math.floor(Math.random() * topics.length)]}`,
    `Just hit 10K followers! Thank you all for the bookish love! 🎉 ${topics[Math.floor(Math.random() * topics.length)]}`
  ];
  
  return contents[Math.floor(Math.random() * contents.length)];
}

// Helper function to get random book title
function getRandomBook() {
  const books = [
    "The Name of the Wind",
    "Mistborn",
    "The Final Empire",
    "Project Hail Mary",
    "Dune",
    "The Hobbit",
    "The Fellowship of the Ring",
    "Harry Potter and the Sorcerer's Stone",
    "The Midnight Library",
    "Where the Crawdads Sing",
    "It Ends With Us",
    "The Silent Patient",
    "The Seven Husbands of Evelyn Hugo",
    "Circe",
    "The Song of Achilles",
    "Fourth Wing",
    "Iron Flame",
    "A Court of Thorns and Roses",
    "Throne of Glass",
    "The Poppy War",
    "Babel",
    "Yellowface",
    "Tomorrow, and Tomorrow, and Tomorrow",
    "Lessons in Chemistry",
    "Demon Copperhead"
  ];
  
  return books[Math.floor(Math.random() * books.length)];
}

// Helper function to get random media URL
function getRandomMediaUrl() {
  const mediaUrls = [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600",
    "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600",
    "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600"
  ];
  
  return mediaUrls[Math.floor(Math.random() * mediaUrls.length)];
}

// Export default posts array
export const initialPosts = generateSamplePosts();

// Export individual post generators for dynamic updates
export const generateNewPost = (author, content, media = null) => ({
  id: Date.now(),
  author,
  content,
  timestamp: new Date().toISOString(),
  likes: 0,
  comments: 0,
  retweets: 0,
  liked: false,
  bookmarked: false,
  likeCount: 0,
  commentCount: 0,
  retweetCount: 0,
  media: media
});

// Export trending topics
export const trendingTopics = [
  { topic: "#BookRecommendations", posts: "12.5K", trend: "+2.1K" },
  { topic: "#AmWriting", posts: "8.2K", trend: "+1.2K" },
  { topic: "#FantasyBooks", posts: "6.7K", trend: "+890" },
  { topic: "#BookTwitter", posts: "5.4K", trend: "+567" },
  { topic: "#ReadingChallenge", posts: "4.1K", trend: "+432" },
  { topic: "#SciFiNovember", posts: "3.8K", trend: "+2.1K" },
  { topic: "#BookHaul", posts: "3.2K", trend: "+456" },
  { topic: "#IndieAuthors", posts: "2.9K", trend: "+234" }
];

// Export who to follow suggestions
export const whoToFollow = [
  { name: "Neil Gaiman", username: "@neilhimself", role: "Author", avatar: "https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=Neil+Gaiman", followers: "2.5M" },
  { name: "Margaret Atwood", username: "@MargaretAtwood", role: "Author", avatar: "https://ui-avatars.com/api/?background=EC4899&color=fff&name=Margaret+Atwood", followers: "1.8M" },
  { name: "BookTok Official", username: "@booktok", role: "Community", avatar: "https://ui-avatars.com/api/?background=F59E0B&color=fff&name=Book+Tok", followers: "5.2M" },
  { name: "Fantasy Book Club", username: "@fantasyclub", role: "Book Club", avatar: "https://ui-avatars.com/api/?background=10B981&color=fff&name=Fantasy+Club", followers: "128K" },
  { name: "Sci-Fi Reader", username: "@scifireader", role: "Influencer", avatar: "https://ui-avatars.com/api/?background=06B6D4&color=fff&name=Sci-Fi+Reader", followers: "89K" }
];

// Export sample user for current user
export const currentUserData = {
  id: "current_user",
  name: "Alex Reader",
  username: "@alexreads",
  avatar: "https://ui-avatars.com/api/?background=6366F1&color=fff&name=Alex+Reader",
  verified: false,
  role: "Avid Reader",
  followers: "1.2K",
  following: "345",
  bio: "📚 Book enthusiast | 🎧 Audiobook lover | ☕ Coffee addict | Sharing my reading journey one page at a time",
  location: "New York, NY",
  website: "https://alexreads.com",
  joinDate: "January 2024"
};