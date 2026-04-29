"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { 
  FaBook, 
  FaTheaterMasks, 
  FaFlask, 
  FaDragon, 
  FaSearch, 
  FaUserSecret, 
  FaHeart, 
  FaUserGraduate,
  FaRocket,
  FaSkull,
  FaMagic,
  FaRobot,
  FaCompass,
  FaStar,
  FaFire,
  FaNewspaper
} from "react-icons/fa";

export default function CategoryPage() {
  const { theme, themeName } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Category data
  const categories = [
    {
      id: 1,
      name: "Fiction",
      icon: <FaBook />,
      description: "Imaginative stories that explore human experiences and emotions",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      path: "/category/fiction",
      subcategories: ["Literary Fiction", "Historical Fiction", "Contemporary Fiction", "Short Stories"]
    },
    {
      id: 2,
      name: "Non-Fiction",
      icon: <FaUserGraduate />,
      description: "Educational and informative books based on facts and reality",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      path: "/category/non-fiction",
      subcategories: ["Biography", "History", "Science", "Self-Help", "Business"]
    },
    {
      id: 3,
      name: "Science Fiction",
      icon: <FaRocket />,
      description: "Futuristic concepts, advanced technology, and space exploration",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      path: "/category/sci-fi",
      subcategories: ["Cyberpunk", "Space Opera", "Time Travel", "Dystopian", "Apocalyptic"]
    },
    {
      id: 4,
      name: "Fantasy",
      icon: <FaDragon />,
      description: "Magical worlds, mythical creatures, and epic adventures",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      path: "/category/fantasy",
      subcategories: ["High Fantasy", "Urban Fantasy", "Dark Fantasy", "Sword & Sorcery"]
    },
    {
      id: 5,
      name: "Mystery",
      icon: <FaSearch />,
      description: "Puzzles, crimes, and investigations that keep you guessing",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      path: "/category/mystery",
      subcategories: ["Detective", "Thriller", "Noir", "Cozy Mystery", "Psychological Thriller"]
    },
    {
      id: 6,
      name: "Romance",
      icon: <FaHeart />,
      description: "Love stories that touch the heart and soul",
      color: "text-pink-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      path: "/category/romance",
      subcategories: ["Contemporary Romance", "Historical Romance", "Paranormal Romance", "Young Adult Romance"]
    },
    {
      id: 7,
      name: "Horror",
      icon: <FaSkull />,
      description: "Terrifying tales that haunt your imagination",
      color: "text-gray-700 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      path: "/category/horror",
      subcategories: ["Psychological Horror", "Supernatural Horror", "Gothic", "Body Horror"]
    },
    {
      id: 8,
      name: "Comics",
      icon: <FaTheaterMasks />,
      description: "Visual storytelling through sequential art",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      path: "/comics",
      subcategories: ["Superhero Comics", "Manga", "Graphic Novels", "Webtoons"]
    },
    {
      id: 9,
      name: "Indian Superhero",
      icon: <FaMagic />,
      description: "Desi superheroes and Indian mythology-inspired stories",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      path: "/category/indian-superhero",
      subcategories: ["Raj Comics", "Apex Comics", "Mythological", "Desi Superheroes"]
    },
    {
      id: 10,
      name: "Biography",
      icon: <FaUserSecret />,
      description: "Real-life stories of remarkable people",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      path: "/category/biography",
      subcategories: ["Autobiography", "Memoir", "Celebrity Biography", "Political Biography"]
    },
    {
      id: 11,
      name: "Young Adult",
      icon: <FaStar />,
      description: "Coming-of-age stories for teen and young adult readers",
      color: "text-teal-500",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      path: "/category/young-adult",
      subcategories: ["YA Fantasy", "YA Romance", "YA Sci-Fi", "YA Contemporary"]
    },
    {
      id: 12,
      name: "Science & Technology",
      icon: <FaRobot />,
      description: "Explore the wonders of science and innovation",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      path: "/category/science-tech",
      subcategories: ["Artificial Intelligence", "Space Science", "Programming", "Physics"]
    }
  ];

  // Filter categories based on search
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Popular genres for quick navigation
  const popularGenres = ["Fiction", "Fantasy", "Mystery", "Science Fiction", "Romance", "Comics"];

  return (
    <main className={`min-h-screen ${theme.background?.section || ''}`}>
      {/* Hero Section */}
      <section className={`${theme.layout?.sectionPadding || 'py-16 px-4 sm:px-6 lg:px-8'} text-center ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            Explore Categories
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
            Discover your next favorite read by exploring our diverse collection of genres and categories
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ''} ${theme.background?.bookCoverSide || ''} ${theme.textColors?.primary || ''}`}
              />
              <FaSearch className={`absolute left-3 top-3 ${theme.textColors?.secondary || ''}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Genres Section */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${theme.textColors?.primary || ''}`}>
            Popular Genres
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {popularGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  setSelectedCategory(genre);
                  setSearchTerm("");
                }}
                className={`px-4 py-2 rounded-full transition-all hover:scale-105 ${theme.buttonColors?.secondaryButton?.background || 'border-2 border-gray-300'} ${theme.buttonColors?.secondaryButton?.textColor || ''}`}
              >
                {genre}
              </button>
            ))}
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-full transition-all hover:scale-105 ${theme.buttonColors?.primaryButton?.background || 'bg-blue-600'} text-white`}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results Count */}
      {searchTerm || selectedCategory !== "All" ? (
        <div className={`px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
          <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto mb-4 ${theme.textColors?.secondary || ''}`}>
            Found {filteredCategories.length} categories
          </div>
        </div>
      ) : null}

      {/* Categories Grid */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          {filteredCategories.length === 0 ? (
            <div className={`text-center py-12 ${theme.textColors?.secondary || ''}`}>
              No categories found. Try adjusting your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  href={category.path}
                  className={`group ${theme.background?.bookCoverSide || ''} ${theme.border?.default || ''} ${theme.shadow?.container || ''} rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`text-4xl ${category.color}`}>
                        {category.icon}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${category.bgColor} ${category.color}`}>
                        {category.subcategories.length} subcategories
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${theme.textColors?.primary || ''}`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm mb-4 ${theme.textColors?.secondary || ''}`}>
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.subcategories.slice(0, 3).map((sub, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                    <div className={`flex items-center justify-between text-sm ${category.color} group-hover:translate-x-2 transition-transform`}>
                      <span>Explore {category.name}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto text-center`}>
          <h2 className={`text-3xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            Can't Find What You're Looking For?
          </h2>
          <p className={`text-lg mb-8 ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
            Explore our complete collection or contact us for personalized recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/books"
              className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${theme.buttonColors?.primaryButton?.background || 'bg-blue-600'} ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:bg-blue-700'} text-white`}
            >
              Browse All Books
            </Link>
            <Link
              href="/comics"
              className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${theme.buttonColors?.secondaryButton?.background || 'border-2 border-blue-600'} ${theme.buttonColors?.secondaryButton?.textColor || 'text-blue-600'}`}
            >
              Explore Comics
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}