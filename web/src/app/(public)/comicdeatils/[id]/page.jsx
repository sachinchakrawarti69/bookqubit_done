"use client";

"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { ComicsData } from "@/data/comics/ComicsData";
// Fix the import path to point to the actual location of ComicButton
import ComicButton, {
  ComicActionButtons,
  ComicButtonGroup,
} from "@/features/comic/comiclist/components/ComicButton";

// Rest of your component...
const ComicsDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Find the comic by ID
  const comic = ComicsData.find((c) => c.id === parseInt(id));

  if (!comic) {
    return (
      <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-4`}>
            Comic Not Found
          </h1>
          <p className={`text-xl ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mb-8`}>
            The comic you're looking for doesn't exist.
          </p>
          <Link
            href="/comicslist"
            className={`px-6 py-3 ${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white ${theme.border?.button || ''} ${theme.shadow?.button || 'shadow-md'} font-semibold rounded-lg inline-block transition-all duration-200 hover:shadow-lg`}
          >
            Back to Comics
          </Link>
        </div>
      </div>
    );
  }

  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = (rating / 2) % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span
            key={`full-${i}`}
            className={`text-2xl ${theme.iconColors?.starFilled || 'text-amber-400'}`}
          >
            ★
          </span>
        ))}
        {hasHalfStar && (
          <span
            key="half"
            className={`text-2xl ${theme.iconColors?.starFilled || 'text-amber-400'}`}
          >
            ½
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span
            key={`empty-${i}`}
            className={`text-2xl ${theme.iconColors?.starEmpty || 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        <span className={`text-lg ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} ml-2 font-semibold`}>
          {rating}/10
        </span>
      </div>
    );
  };

  // Tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-3`}>
                Story Overview
              </h3>
              <p className={`text-lg leading-relaxed ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                {comic.description}
              </p>
            </div>

            {comic.funFact && (
              <div className={`p-6 ${theme.background?.navigationDots || (isDarkMode ? 'bg-gray-800' : 'bg-gray-100')} ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} rounded-xl`}>
                <h4 className={`text-lg font-bold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-2`}>
                  💡 Did You Know?
                </h4>
                <p className={`text-lg leading-relaxed ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                  {comic.funFact}
                </p>
              </div>
            )}
          </div>
        );

      case "characters":
        return (
          <div className="space-y-6">
            <h3 className={`text-xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-4`}>
              Characters Introduced
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comic.charactersIntroduced.map((character, index) => (
                <div
                  key={index}
                  className={`p-4 ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'} ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-lg`}
                >
                  <h4 className={`font-semibold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-2`}>
                    {character}
                  </h4>
                  <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                    First appearance in {comic.title}. This character went on to
                    become a key figure in the Marvel Universe.
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "creators":
        return (
          <div className="space-y-6">
            <h3 className={`text-xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-4`}>
              Creative Team
            </h3>
            <div className="space-y-4">
              {comic.creators?.editor && (
                <div>
                  <h4 className={`font-semibold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-2`}>
                    Editor
                  </h4>
                  <p className={`text-lg ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                    {comic.creators.editor}
                  </p>
                </div>
              )}
              <div>
                <h4 className={`font-semibold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-3`}>
                  Writers & Artists
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {comic.creators?.writersArtists?.map((creator, index) => (
                    <div
                      key={index}
                      className={`p-3 ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}
                    >
                      <p className={`font-medium ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                        {creator}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "collectors":
        return (
          <div className="space-y-6">
            <h3 className={`text-xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-4`}>
              Collector's Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'} ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
                <h4 className={`font-semibold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-3`}>
                  💰 Value & Sales
                </h4>
                <div className="space-y-3">
                  {comic.valueToday && (
                    <div>
                      <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                        Current Market Value
                      </p>
                      <p className={`text-xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                        {comic.valueToday}
                      </p>
                    </div>
                  )}
                  {comic.sales?.firstPrint && (
                    <div>
                      <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                        First Print Run
                      </p>
                      <p className={`text-lg font-semibold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                        {comic.sales.firstPrint}
                      </p>
                    </div>
                  )}
                  {comic.sales?.secondPrint && (
                    <div>
                      <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                        Second Print
                      </p>
                      <p className={`text-lg font-semibold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                        {comic.sales.secondPrint}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className={`p-6 ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'} ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} rounded-xl`}>
                <h4 className={`font-semibold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-3`}>
                  📊 Publication Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                      Cover Price
                    </p>
                    <p className={`text-lg font-semibold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                      {comic.coverPrice}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                      Format
                    </p>
                    <p className={`text-lg font-semibold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                      {comic.format}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                      Publisher
                    </p>
                    <p className={`text-lg font-semibold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                      {comic.publisher}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.shadow?.container || 'shadow-lg'} ${isDarkMode ? "bg-amber-900/20" : "bg-amber-50"} rounded-xl`}>
              <h4 className={`font-semibold ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} mb-3`}>
                💎 Investment Potential
              </h4>
              <p className={`text-lg leading-relaxed ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                This issue is considered a key investment piece due to its
                historical significance as the first appearance of multiple
                iconic characters. Values have shown consistent appreciation
                over decades, making it a cornerstone of any serious comic
                collection.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} min-h-screen`}>
      <div className={`${theme.layout?.sectionPadding || 'py-12 px-4 sm:px-6 lg:px-8'}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          {/* Back Button */}
          <button
            onClick={() => router.push("/comicslist")}
            className={`flex items-center gap-2 mb-6 ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} hover:${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} transition-colors`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Comics
          </button>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Cover Image */}
            <div className="lg:col-span-1">
              <div className={`${theme.background?.bookCoverSide || 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800'} ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.shadow?.book || 'shadow-2xl'} p-8 rounded-xl`}>
                <img
                  src={comic.image}
                  alt={comic.title}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* Quick Actions Sidebar */}
              <div className="mt-6 space-y-4">
                <ComicButtonGroup direction="vertical">
                  <ComicActionButtons.ReadDigital
                    comicId={comic.id}
                    size="lg"
                  />
                  <ComicActionButtons.BuyPhysical url="#" size="lg" />
                  <ComicActionButtons.AddWishlist
                    comicId={comic.id}
                    isWishlisted={isWishlisted}
                    onToggle={() => setIsWishlisted(!isWishlisted)}
                    size="lg"
                  />
                  <ComicActionButtons.ShareComic comicId={comic.id} size="lg" />
                </ComicButtonGroup>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className={`text-4xl lg:text-5xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-2`}>
                      {comic.title}
                    </h1>
                    <p className={`text-xl ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mb-3`}>
                      Published by{" "}
                      <span className="font-semibold">{comic.publisher}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    {renderStars(comic.rating)}
                    <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} mt-1`}>
                      {comic.publicationDate} • {comic.coverPrice}
                    </p>
                  </div>
                </div>

                {/* Category & Era Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={`px-4 py-2 ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.textColors?.badge || 'text-sky-800 dark:text-sky-400'} ${isDarkMode ? "bg-sky-900/30" : "bg-sky-100"} font-semibold rounded-full`}>
                    {comic.category} Era
                  </span>
                  {comic.valueToday && (
                    <span className={`px-4 py-2 ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'} ${isDarkMode ? "bg-amber-900/30" : "bg-amber-100"} font-bold rounded-full`}>
                      {comic.valueToday}
                    </span>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-8">
                <div className={`flex flex-wrap gap-2 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} pb-2`}>
                  {["overview", "characters", "creators", "collectors"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-semibold capitalize rounded-lg transition-all duration-300 ${
                        activeTab === tab
                          ? `${theme.buttonColors?.primaryButton?.background || 'bg-gradient-to-r from-sky-600 to-sky-500'} text-white ${theme.shadow?.button || 'shadow-md'}`
                          : `${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')} hover:${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="mt-6">{renderTabContent()}</div>
              </div>
            </div>
          </div>

          {/* Related Comics Section */}
          <div className={`border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} pt-8`}>
            <h2 className={`text-2xl font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-6`}>
              Related Comics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ComicsData.filter((c) => c.id !== comic.id && c.category === comic.category)
                .slice(0, 3)
                .map((relatedComic) => (
                  <Link
                    key={relatedComic.id}
                    href={`/comicdeatils/${relatedComic.id}`}
                    className={`block ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} ${theme.shadow?.book || 'shadow-2xl'} ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    <div className={`h-48 ${theme.background?.bookCoverSide || 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800'} flex items-center justify-center p-4`}>
                      <img
                        src={relatedComic.image}
                        alt={relatedComic.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-bold ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} mb-2 line-clamp-2`}>
                        {relatedComic.title}
                      </h3>
                      <p className={`text-sm ${theme.textColors?.secondary || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                        {relatedComic.publicationDate} • {relatedComic.coverPrice}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicsDetailsPage;