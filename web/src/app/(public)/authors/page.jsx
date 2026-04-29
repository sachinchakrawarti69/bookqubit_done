"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaStar, 
  FaBook, 
  FaAward,
  FaQuoteLeft,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaArrowRight
} from "react-icons/fa";
import authorsData from "@/data/authors/AuthorsData";

export default function AuthorsPage() {
  const { theme, themeName } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [authors, setAuthors] = useState([]);

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  useEffect(() => {
    setAuthors(authorsData);
  }, []);

  // Get unique genres from authors
  const genres = ["All", ...new Set(authorsData.flatMap(author => author.genres || []))];

  // Filter authors based on search and genre
  const filteredAuthors = authors.filter(author => {
    const matchesSearch = 
      author.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.genres?.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesGenre = selectedGenre === "All" || author.genres?.includes(selectedGenre);
    
    return matchesSearch && matchesGenre;
  });

  const clearFilters = () => {
    setSelectedGenre("All");
    setSearchTerm("");
    setSelectedTags([]);
  };

  // Popular tags for filtering
  const popularTags = ["Bestseller", "Award Winning", "New York Times", "International Bestseller", "Pulitzer Prize"];
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Apply tag filter
  const tagFilteredAuthors = selectedTags.length > 0 
    ? filteredAuthors.filter(author => 
        author.tags?.some(tag => selectedTags.includes(tag))
      )
    : filteredAuthors;

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={i} className={`w-4 h-4 ${theme.iconColors?.starFilled || 'text-amber-400'}`} />
      );
    }
    
    for (let i = fullStars; i < 5; i++) {
      stars.push(
        <FaStar key={i} className={`w-4 h-4 ${theme.iconColors?.starEmpty || 'text-gray-300'}`} />
      );
    }
    
    return stars;
  };

  return (
    <main className={`min-h-screen ${theme.background?.section || ''}`}>
      {/* Hero Section */}
      <section className={`${theme.layout?.sectionPadding || 'py-16 px-4 sm:px-6 lg:px-8'} text-center ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            Meet Our Authors
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
            Discover the brilliant minds behind your favorite books. From debut voices to literary legends.
          </p>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by author name, genre, or bio..."
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
              {(selectedTags.length > 0 || selectedGenre !== "All") && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                  {selectedTags.length + (selectedGenre !== "All" ? 1 : 0)}
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
                <h3 className={`font-semibold ${theme.textColors?.primary || ''}`}>Filter Authors</h3>
                <button onClick={clearFilters} className={`text-sm ${theme.textColors?.highlight || ''}`}>
                  Clear All
                </button>
              </div>
              
              {/* Genre Filter */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${theme.textColors?.primary || ''}`}>Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ''} ${theme.background?.navigationDots || ''} ${theme.textColors?.primary || ''}`}
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              {/* Tags Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.textColors?.primary || ''}`}>Popular Tags</label>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
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
            </div>
          )}
        </div>
      </section>

      {/* Results Info */}
      {(searchTerm || selectedGenre !== "All" || selectedTags.length > 0) && (
        <div className={`px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
          <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto py-4 flex justify-between items-center ${theme.textColors?.secondary || ''}`}>
            <span>Found {tagFilteredAuthors.length} authors</span>
            <button onClick={clearFilters} className={`text-sm flex items-center gap-1 ${theme.textColors?.highlight || ''}`}>
              <FaTimes size={12} />
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Authors Display */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          {tagFilteredAuthors.length === 0 ? (
            <div className={`text-center py-12 ${theme.textColors?.secondary || ''}`}>
              No authors found. Try adjusting your filters.
            </div>
          ) : viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tagFilteredAuthors.map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug || author.id}`}
                  className={`group ${theme.background?.bookCoverSide || ''} ${theme.border?.default || ''} ${theme.shadow?.container || ''} rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {author.image ? (
                        <img
                          src={author.image}
                          alt={author.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${theme.background?.navigationDots || ''} ${theme.textColors?.highlight || ''}`}>
                          {author.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className={`text-xl font-bold ${theme.textColors?.primary || ''}`}>
                          {author.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(author.rating || 4.5)}
                          <span className={`text-xs ml-1 ${theme.textColors?.secondary || ''}`}>
                            ({author.rating || 4.5})
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-3 line-clamp-3 ${theme.textColors?.secondary || ''}`}>
                      {author.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {author.genres?.slice(0, 3).map((genre, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-3">
                        {author.bookCount && (
                          <div className={`text-xs ${theme.textColors?.secondary || ''}`}>
                            📚 {author.bookCount} books
                          </div>
                        )}
                        {author.awards && (
                          <div className={`text-xs ${theme.textColors?.secondary || ''}`}>
                            🏆 {author.awards}
                          </div>
                        )}
                      </div>
                      <FaArrowRight className={`${theme.textColors?.highlight || ''} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {tagFilteredAuthors.map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug || author.id}`}
                  className={`block group ${theme.background?.bookCoverSide || ''} ${theme.border?.default || ''} ${theme.shadow?.container || ''} rounded-xl p-6 transition-all hover:shadow-xl`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {author.image ? (
                      <img
                        src={author.image}
                        alt={author.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl ${theme.background?.navigationDots || ''} ${theme.textColors?.highlight || ''}`}>
                        {author.name.charAt(0)}
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h3 className={`text-xl font-bold ${theme.textColors?.primary || ''}`}>
                          {author.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {renderStars(author.rating || 4.5)}
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-3 ${theme.textColors?.secondary || ''}`}>
                        {author.bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {author.genres?.map((genre, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        {author.bookCount && (
                          <span className={theme.textColors?.secondary || ''}>
                            📚 {author.bookCount} books published
                          </span>
                        )}
                        {author.bestsellers && (
                          <span className={theme.textColors?.secondary || ''}>
                            🏆 {author.bestsellers} bestsellers
                          </span>
                        )}
                        {author.awards && (
                          <span className={theme.textColors?.secondary || ''}>
                            ✨ {author.awards} awards
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className={`flex items-center ${theme.textColors?.highlight || ''} group-hover:translate-x-2 transition-transform`}>
                      <FaArrowRight size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Quote Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto text-center`}>
          <FaQuoteLeft className={`text-4xl mx-auto mb-4 ${theme.textColors?.highlight || ''}`} />
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            "The only way to do great work is to love what you do."
          </h2>
          <p className={`text-lg ${theme.textColors?.secondary || ''}`}>
            — Steve Jobs
          </p>
        </div>
      </section>
    </main>
  );
}