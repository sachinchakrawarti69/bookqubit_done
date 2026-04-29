"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { 
  FaStar, 
  FaFire, 
  FaTrophy, 
  FaClock, 
  FaBookOpen, 
  FaGem,
  FaArrowRight,
  FaSearch,
  FaFilter,
  FaTimes
} from "react-icons/fa";

export default function CollectionsPage() {
  const { theme, themeName } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Collections data
  const collections = [
    {
      id: 1,
      name: "Best Sellers",
      icon: <FaTrophy />,
      description: "The most popular and highly-rated books loved by readers worldwide.",
      longDescription: "Discover the books that have captured the hearts of millions. These bestsellers represent the finest in contemporary literature, from gripping thrillers to heartwarming romances.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      path: "/collections/bestsellers",
      bookCount: 156,
      featuredBooks: ["The Midnight Library", "Project Hail Mary", "It Ends With Us"],
      tags: ["Popular", "Trending", "Top Rated"]
    },
    {
      id: 2,
      name: "New Releases",
      icon: <FaFire />,
      description: "Fresh off the press - the latest additions to our collection.",
      longDescription: "Be the first to read the newest releases from your favorite authors. Updated weekly with the latest books hitting the shelves.",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      path: "/collections/new",
      bookCount: 89,
      featuredBooks: ["Iron Flame", "The Exchange", "Fourth Wing"],
      tags: ["New", "Latest", "Just Added"]
    },
    {
      id: 3,
      name: "Top Rated",
      icon: <FaStar />,
      description: "Cream of the crop - books with the highest reader ratings.",
      longDescription: "Our community's absolute favorites. These books have earned their place through exceptional storytelling and unforgettable characters.",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      path: "/collections/top-rated",
      bookCount: 203,
      featuredBooks: ["Atomic Habits", "The Silent Patient", "Where the Crawdads Sing"],
      tags: ["Highly Rated", "Reader Favorites", "Award Winning"]
    },
    {
      id: 4,
      name: "Summer Reads",
      icon: <FaBookOpen />,
      description: "Perfect books for your summer vacation reading list.",
      longDescription: "Light, engaging, and entertaining reads that will keep you company on the beach, by the pool, or during your summer travels.",
      color: "text-sky-500",
      bgColor: "bg-sky-50 dark:bg-sky-900/20",
      path: "/collections/summer",
      bookCount: 67,
      featuredBooks: ["Malibu Rising", "Book Lovers", "The Summer I Turned Pretty"],
      tags: ["Seasonal", "Beach Reads", "Light Reading"]
    },
    {
      id: 5,
      name: "Award Winners",
      icon: <FaGem />,
      description: "Pulitzer, Booker, and other prestigious award recipients.",
      longDescription: "Celebrating literary excellence. These award-winning books represent the pinnacle of writing achievement across all genres.",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      path: "/collections/awards",
      bookCount: 94,
      featuredBooks: ["Demon Copperhead", "Lessons in Chemistry", "Trust"],
      tags: ["Award Winning", "Literary", "Prestigious"]
    },
    {
      id: 6,
      name: "Classic Literature",
      icon: <FaClock />,
      description: "Timeless masterpieces that have stood the test of time.",
      longDescription: "Journey through the greatest works of literature from Shakespeare to Dickens, Austen to Tolstoy. These classics continue to inspire generations.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      path: "/collections/classics",
      bookCount: 178,
      featuredBooks: ["Pride and Prejudice", "1984", "To Kill a Mockingbird"],
      tags: ["Timeless", "Literary Classics", "Must Read"]
    },
    {
      id: 7,
      name: "Staff Picks",
      icon: <FaStar />,
      description: "Our team's personal recommendations for you.",
      longDescription: "Hand-picked by our expert staff who are passionate readers themselves. These are the books they can't stop talking about.",
      color: "text-pink-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      path: "/collections/staff-picks",
      bookCount: 112,
      featuredBooks: ["Tomorrow Tomorrow Tomorrow", "Yellowface", "The Heaven & Earth Grocery Store"],
      tags: ["Recommended", "Staff Favorites", "Curated"]
    },
    {
      id: 8,
      name: "Hidden Gems",
      icon: <FaGem />,
      description: "Underrated books that deserve more attention.",
      longDescription: "Discover hidden treasures that have flown under the radar. These brilliant books are waiting to be discovered by more readers.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      path: "/collections/hidden-gems",
      bookCount: 45,
      featuredBooks: ["Piranesi", "The Starless Sea", "The Invisible Life of Addie LaRue"],
      tags: ["Underrated", "Hidden Treasures", "Unique"]
    }
  ];

  // Filter collections based on search
  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCollection = selectedCollection === "All" || collection.name === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  // Get unique tags for filter
  const allTags = [...new Set(collections.flatMap(c => c.tags))];
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Apply tag filter
  const tagFilteredCollections = selectedTags.length > 0 
    ? filteredCollections.filter(collection => 
        collection.tags.some(tag => selectedTags.includes(tag))
      )
    : filteredCollections;

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCollection("All");
    setSearchTerm("");
  };

  return (
    <main className={`min-h-screen ${theme.background?.section || ''}`}>
      {/* Hero Section */}
      <section className={`${theme.layout?.sectionPadding || 'py-16 px-4 sm:px-6 lg:px-8'} text-center ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            Book Collections
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
            Curated collections of exceptional books - from bestsellers to hidden gems
          </p>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ''} ${theme.background?.bookCoverSide || ''} ${theme.textColors?.primary || ''}`}
              />
              <FaSearch className={`absolute left-3 top-3 ${theme.textColors?.secondary || ''}`} />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${theme.buttonColors?.secondaryButton?.background || 'border-2 border-gray-300'} ${theme.buttonColors?.secondaryButton?.textColor || ''}`}
            >
              <FaFilter />
              Filters
              {(selectedTags.length > 0 || selectedCollection !== "All") && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                  {selectedTags.length + (selectedCollection !== "All" ? 1 : 0)}
                </span>
              )}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded ${viewMode === "grid" ? theme.buttonColors?.primaryButton?.background || 'bg-blue-600 text-white' : theme.buttonColors?.secondaryButton?.background || ''}`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded ${viewMode === "list" ? theme.buttonColors?.primaryButton?.background || 'bg-blue-600 text-white' : theme.buttonColors?.secondaryButton?.background || ''}`}
              >
                ≡
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className={`mt-6 p-4 rounded-lg ${theme.background?.bookCoverSide || ''} ${theme.border?.default || ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-semibold ${theme.textColors?.primary || ''}`}>Filter Collections</h3>
                <button onClick={clearFilters} className={`text-sm ${theme.textColors?.highlight || ''}`}>
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedTags.includes(tag)
                        ? theme.buttonColors?.primaryButton?.background || 'bg-blue-600 text-white'
                        : theme.buttonColors?.secondaryButton?.background || 'border border-gray-300'
                    } ${selectedTags.includes(tag) ? 'text-white' : theme.textColors?.secondary || ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Info */}
      {(searchTerm || selectedCollection !== "All" || selectedTags.length > 0) && (
        <div className={`px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
          <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto py-4 flex justify-between items-center ${theme.textColors?.secondary || ''}`}>
            <span>Found {tagFilteredCollections.length} collections</span>
            <button onClick={clearFilters} className={`text-sm flex items-center gap-1 ${theme.textColors?.highlight || ''}`}>
              <FaTimes size={12} />
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Collections Display */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          {tagFilteredCollections.length === 0 ? (
            <div className={`text-center py-12 ${theme.textColors?.secondary || ''}`}>
              No collections found. Try adjusting your filters.
            </div>
          ) : viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tagFilteredCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={collection.path}
                  className={`group ${theme.background?.bookCoverSide || ''} ${theme.border?.default || ''} ${theme.shadow?.container || ''} rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`text-4xl ${collection.color}`}>
                        {collection.icon}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${collection.bgColor} ${collection.color}`}>
                        {collection.bookCount} books
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${theme.textColors?.primary || ''}`}>
                      {collection.name}
                    </h3>
                    <p className={`text-sm mb-4 ${theme.textColors?.secondary || ''}`}>
                      {collection.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {collection.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {collection.featuredBooks.slice(0, 2).map((book, idx) => (
                        <span key={idx} className={`text-xs ${theme.textColors?.secondary || ''}`}>
                          {book}{idx < 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <div className={`flex items-center justify-between text-sm ${collection.color} group-hover:translate-x-2 transition-transform`}>
                      <span>Explore Collection</span>
                      <FaArrowRight />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {tagFilteredCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={collection.path}
                  className={`block group ${theme.background?.bookCoverSide || ''} ${theme.border?.default || ''} ${theme.shadow?.container || ''} rounded-xl p-6 transition-all hover:shadow-xl`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className={`text-5xl ${collection.color}`}>
                      {collection.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h3 className={`text-xl font-bold ${theme.textColors?.primary || ''}`}>
                          {collection.name}
                        </h3>
                        <div className={`text-sm px-2 py-1 rounded-full ${collection.bgColor} ${collection.color}`}>
                          {collection.bookCount} books
                        </div>
                      </div>
                      <p className={`text-sm mb-3 ${theme.textColors?.secondary || ''}`}>
                        {collection.longDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {collection.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {collection.featuredBooks.map((book, idx) => (
                          <span
                            key={idx}
                            className={`text-sm ${theme.textColors?.highlight || ''}`}
                          >
                            {book}{idx < 2 && " • "}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`flex items-center ${collection.color} group-hover:translate-x-2 transition-transform`}>
                      <FaArrowRight size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto text-center`}>
          <h2 className={`text-3xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            Never Miss a New Collection
          </h2>
          <p className={`text-lg mb-8 ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
            Subscribe to get updates about new collections, curated book lists, and reading recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ''} ${theme.background?.bookCoverSide || ''} ${theme.textColors?.primary || ''}`}
            />
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all hover:scale-105 ${theme.buttonColors?.primaryButton?.background || 'bg-blue-600'} ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:bg-blue-700'} text-white`}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}