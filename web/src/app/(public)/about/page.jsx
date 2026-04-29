"use client";

import Link from "next/link";
import { useTheme } from "@/themes/useTheme";

export default function AboutPage() {
  const { theme, themeName } = useTheme();
  
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  return (
    <main className={`min-h-screen ${theme.background?.section || ''}`}>
      {/* Hero Section */}
      <section className={`${theme.layout?.sectionPadding || 'py-16 px-4 sm:px-6 lg:px-8'} text-center`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme.textColors?.primary || ''}`}>
            About BookQubit
          </h1>
          <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto ${theme.textColors?.secondary || ''}`}>
            Your premier destination for discovering, exploring, and enjoying books, comics, and publications from around the world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${theme.textColors?.primary || ''}`}>
                Our Mission
              </h2>
              <p className={`text-lg mb-4 ${theme.textColors?.secondary || ''}`}>
                At BookQubit, we believe that every reader deserves access to a world of stories. Our mission is to connect readers with their next favorite book, create a vibrant community of literature lovers, and support authors and publishers in reaching their audience.
              </p>
              <p className={`text-lg ${theme.textColors?.secondary || ''}`}>
                We strive to make reading accessible, enjoyable, and discoverable for everyone, regardless of their reading preferences or background.
              </p>
            </div>
            <div className={`p-8 rounded-xl ${theme.background?.bookCoverSide || ''} ${theme.shadow?.container || ''}`}>
              <div className={`text-6xl mb-4 text-center ${theme.textColors?.highlight || ''}`}>
                📚
              </div>
              <p className={`text-center italic ${theme.textColors?.secondary || ''}`}>
                "A reader lives a thousand lives before he dies. The man who never reads lives only one."
              </p>
              <p className={`text-center mt-2 font-semibold ${theme.textColors?.primary || ''}`}>
                — George R.R. Martin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
              What We Offer
            </h2>
            <p className={`text-lg ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
              Everything you need for your reading journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl text-center ${theme.background?.bookCoverSide || ''} ${theme.shadow?.container || ''} transition-all hover:scale-105`}>
              <div className={`text-4xl mb-4 ${theme.textColors?.highlight || ''}`}>
                📖
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme.textColors?.primary || ''}`}>
                Extensive Collection
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                Thousands of books, comics, and publications across all genres and categories
              </p>
            </div>

            <div className={`p-6 rounded-xl text-center ${theme.background?.bookCoverSide || ''} ${theme.shadow?.container || ''} transition-all hover:scale-105`}>
              <div className={`text-4xl mb-4 ${theme.textColors?.highlight || ''}`}>
                🤖
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme.textColors?.primary || ''}`}>
                AI Recommendations
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                Smart AI-powered suggestions tailored to your reading preferences
              </p>
            </div>

            <div className={`p-6 rounded-xl text-center ${theme.background?.bookCoverSide || ''} ${theme.shadow?.container || ''} transition-all hover:scale-105`}>
              <div className={`text-4xl mb-4 ${theme.textColors?.highlight || ''}`}>
                🔥
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme.textColors?.primary || ''}`}>
                Trending Updates
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                Stay current with bestsellers, new releases, and popular titles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
              Our Values
            </h2>
            <p className={`text-lg ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-xl ${theme.background?.bookCoverSide || ''}`}>
              <h3 className={`text-xl font-bold mb-3 ${theme.textColors?.highlight || ''}`}>
                Quality Content
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                We curate and showcase only the highest quality content from trusted publishers and authors.
              </p>
            </div>

            <div className={`p-6 rounded-xl ${theme.background?.bookCoverSide || ''}`}>
              <h3 className={`text-xl font-bold mb-3 ${theme.textColors?.highlight || ''}`}>
                User Experience
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                We prioritize intuitive design and seamless navigation for an enjoyable reading experience.
              </p>
            </div>

            <div className={`p-6 rounded-xl ${theme.background?.bookCoverSide || ''}`}>
              <h3 className={`text-xl font-bold mb-3 ${theme.textColors?.highlight || ''}`}>
                Community First
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                We foster a welcoming community of readers, authors, and publishing professionals.
              </p>
            </div>

            <div className={`p-6 rounded-xl ${theme.background?.bookCoverSide || ''}`}>
              <h3 className={`text-xl font-bold mb-3 ${theme.textColors?.highlight || ''}`}>
                Innovation
              </h3>
              <p className={`${theme.textColors?.secondary || ''}`}>
                We constantly evolve our platform with cutting-edge technology and features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto text-center`}>
          <h2 className={`text-3xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            Join Our Journey
          </h2>
          <p className={`text-lg mb-8 ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
            We're always looking for passionate readers, talented developers, and creative minds to join our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${theme.buttonColors?.primaryButton?.background || 'bg-blue-600'} ${theme.buttonColors?.primaryButton?.hoverBackground || 'hover:bg-blue-700'} text-white`}
            >
              Contact Us
            </Link>
            <Link
              href="/faq"
              className={`px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 border-2 ${theme.buttonColors?.secondaryButton?.background || 'border-blue-600'} ${theme.buttonColors?.secondaryButton?.hoverBackground || 'hover:bg-blue-50'} ${theme.buttonColors?.secondaryButton?.textColor || 'text-blue-600'}`}
            >
              Read FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}