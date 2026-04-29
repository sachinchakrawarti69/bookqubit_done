"use client";

import Link from "next/link";
import { useTheme } from "@/themes/useTheme";

export default function HomePage() {
  const { theme, themeName } = useTheme();
  
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  return (
    <main className={`min-h-screen ${theme.background?.section || ''}`}>
      {/* Hero Section */}
      <section className={`${theme.layout?.sectionPadding || 'py-16 px-4 sm:px-6 lg:px-8'} text-center`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme.textColors?.primary || ''}`}>
            Welcome to BookQubit
          </h1>
          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${theme.textColors?.secondary || ''}`}>
            Discover, explore, and immerse yourself in a world of books, comics, and endless stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/books"
              className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${theme.buttonColors?.primaryButton?.background || 'bg-blue-600'} ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:bg-blue-700'} text-white`}
            >
              Explore Books
            </Link>
            <Link
              href="/comics"
              className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border-2 ${theme.buttonColors?.secondaryButton?.background || 'border-blue-600'} ${theme.buttonColors?.secondaryButton?.hoverBackground || 'hover:bg-blue-50'} ${theme.buttonColors?.secondaryButton?.textColor || 'text-blue-600'}`}
            >
              Browse Comics
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
              Why Choose BookQubit?
            </h2>
            <p className={`text-lg ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
              Your ultimate destination for reading and discovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-6 rounded-xl text-center ${theme.background?.bookCoverSide || ''} ${theme.shadow?.container || ''} transition-all hover:scale-105`}>
              <div className={`text-4xl mb-4 ${theme.textColors?.highlight || ''}`}>
                📚
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme.textColors?.primary || ''}`}>
                Vast Collection
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                Thousands of books, comics, and publications across all genres
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-6 rounded-xl text-center ${theme.background?.bookCoverSide || ''} ${theme.shadow?.container || ''} transition-all hover:scale-105`}>
              <div className={`text-4xl mb-4 ${theme.textColors?.highlight || ''}`}>
                ⭐
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme.textColors?.primary || ''}`}>
                Personalized Recommendations
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                Get book suggestions tailored to your reading preferences
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-6 rounded-xl text-center ${theme.background?.bookCoverSide || ''} ${theme.shadow?.container || ''} transition-all hover:scale-105`}>
              <div className={`text-4xl mb-4 ${theme.textColors?.highlight || ''}`}>
                🔥
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme.textColors?.primary || ''}`}>
                Trending Now
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                Stay updated with the latest bestsellers and popular titles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
              Explore by Category
            </h2>
            <p className={`text-lg ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
              Find your next adventure across our diverse categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.path}
                className={`p-4 rounded-lg text-center transition-all hover:scale-105 ${theme.background?.navigationDots || ''} ${theme.border?.default || ''} border hover:${theme.textColors?.highlight || ''}`}
              >
                <div className={`text-3xl mb-2 ${theme.textColors?.highlight || ''}`}>
                  {category.icon}
                </div>
                <span className={`font-medium ${theme.textColors?.primary || ''}`}>
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.bookCoverSide || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto text-center`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            Ready to Start Reading?
          </h2>
          <p className={`text-lg mb-8 ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
            Join thousands of readers who have already discovered their next favorite book
          </p>
          <Link
            href="/auth/login"
            className={`px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 ${theme.buttonColors?.primaryButton?.background || 'bg-blue-600'} ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:bg-blue-700'} text-white inline-block`}
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </main>
  );
}

// Categories data
const categories = [
  { name: "Fiction", icon: "📖", path: "/category/fiction" },
  { name: "Non-Fiction", icon: "📚", path: "/category/non-fiction" },
  { name: "Science Fiction", icon: "🚀", path: "/category/sci-fi" },
  { name: "Fantasy", icon: "🐉", path: "/category/fantasy" },
  { name: "Mystery", icon: "🔍", path: "/category/mystery" },
  { name: "Romance", icon: "💕", path: "/category/romance" },
  { name: "Biography", icon: "👤", path: "/category/biography" },
  { name: "Comics", icon: "🦸", path: "/comics" },
];