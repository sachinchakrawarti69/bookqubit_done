"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { publicationsData } from "@/data/publications/PublicationsData";
import booksData from "@/data/books/BooksData";
import { useTheme } from "@/themes/useTheme";
import { FaArrowLeft, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaGlobe, FaTwitter, FaInstagram, FaFacebook, FaUsers, FaChartLine, FaBuilding as FaCompany, FaBook } from "react-icons/fa";

const PublicationsDetails = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  const { theme, themeName } = useTheme();

  if (!theme) return null;

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Find the publisher by slug
  const publisher = publicationsData.find((pub) => pub.slug === slug);

  // Filter books by publisher name (case-insensitive partial match)
  const publisherBooks = booksData.filter(
    (book) =>
      book.publisher &&
      book.publisher.toLowerCase().includes(publisher?.name.toLowerCase()),
  );

  // If no publisher found, show a 404-like message
  if (!publisher) {
    return (
      <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} min-h-screen py-20`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FaBuilding className={`text-6xl mx-auto mb-4 ${theme.textColors?.secondary || 'text-gray-400'}`} />
          <h2 className={`text-3xl font-bold mb-4 ${theme.textColors?.highlight || 'text-sky-600'}`}>
            Publisher Not Found
          </h2>
          <p className={`text-lg mb-8 ${theme.textColors?.secondary || 'text-gray-600'}`}>
            The publisher you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => router.push("/publications")}
            className={`px-6 py-3 rounded-lg ${theme.buttonColors?.primaryButton?.background || 'bg-sky-600'} hover:opacity-90 text-white transition-all duration-200 hover:scale-105`}
          >
            ← Back to Publishers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50')} min-h-screen py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => router.push("/publications")}
          className={`mb-8 flex items-center gap-2 px-4 py-2 rounded-lg ${theme.background?.bookCoverSide || (isDarkMode ? 'bg-gray-800' : 'bg-gray-100')} ${theme.textColors?.primary || 'text-gray-900'} hover:underline transition-all`}
        >
          <FaArrowLeft size={16} /> Back to all publishers
        </button>

        {/* Main publisher card */}
        <div
          className={`grid md:grid-cols-3 gap-8 ${theme.background?.bookCoverSide || (isDarkMode ? 'bg-gray-800' : 'bg-gray-100')} p-8 rounded-2xl ${theme.shadow?.book || 'shadow-2xl'}`}
        >
          {/* Logo and basic info */}
          <div className="md:col-span-1">
            <div className={`flex justify-center p-6 ${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-white')} rounded-xl`}>
              <img
                src={publisher.logo}
                alt={`${publisher.name} logo`}
                className="max-h-40 w-full object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x150?text=Logo+Not+Found";
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-4">
            <h1 className={`text-4xl font-bold ${theme.textColors?.highlight || 'text-sky-600'}`}>
              {publisher.name}
            </h1>
            <p className={`text-lg leading-relaxed ${theme.textColors?.secondary || 'text-gray-600'}`}>
              {publisher.description}
            </p>

            <div className={`grid grid-cols-2 gap-4 pt-4 border-t ${theme.border?.default || 'border-gray-200 dark:border-gray-700'}`}>
              <div>
                <p className={`font-semibold ${theme.textColors?.primary || 'text-gray-900'}`}>
                  <FaCalendarAlt className="inline mr-2" size={14} /> Founded
                </p>
                <p className={theme.textColors?.secondary || 'text-gray-600'}>
                  {publisher.founded}
                </p>
              </div>
              <div>
                <p className={`font-semibold ${theme.textColors?.primary || 'text-gray-900'}`}>
                  <FaMapMarkerAlt className="inline mr-2" size={14} /> Headquarters
                </p>
                <p className={theme.textColors?.secondary || 'text-gray-600'}>
                  {publisher.headquarters}
                </p>
              </div>
              <div>
                <p className={`font-semibold ${theme.textColors?.primary || 'text-gray-900'}`}>
                  Type
                </p>
                <p className={theme.textColors?.secondary || 'text-gray-600'}>{publisher.type}</p>
              </div>
              <div>
                <p className={`font-semibold ${theme.textColors?.primary || 'text-gray-900'}`}>
                  <FaGlobe className="inline mr-2" size={14} /> Website
                </p>
                <a
                  href={publisher.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme.textColors?.highlight || 'text-sky-600'} hover:underline break-all`}
                >
                  {publisher.website}
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <button
                onClick={() => router.push(`/publications/${publisher.slug}/books`)}
                className={`px-6 py-3 rounded-lg ${theme.buttonColors?.primaryButton?.background || 'bg-sky-600'} hover:opacity-90 text-white font-medium transition-all hover:scale-105`}
              >
                View All Books
              </button>
              <a
                href={publisher.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-lg ${theme.background?.section || 'bg-white'} ${theme.textColors?.primary || 'text-gray-900'} border ${theme.border?.default || 'border-gray-200 dark:border-gray-700'} hover:bg-opacity-80 transition-all`}
              >
                Visit Official Website
              </a>
            </div>
          </div>
        </div>

        {/* Rich details section */}
        <div className="mt-12 space-y-8">
          {/* About */}
          {publisher.about && (
            <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} p-6 rounded-2xl ${theme.shadow?.container || 'shadow-lg'}`}>
              <h2 className={`text-2xl font-semibold mb-4 ${theme.textColors?.primary || 'text-gray-900'}`}>
                About {publisher.name}
              </h2>
              <p className={`${theme.textColors?.secondary || 'text-gray-600'} leading-relaxed`}>
                {publisher.about}
              </p>
            </div>
          )}

          {/* Two-column layout for lists */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Notable Authors */}
            {publisher.notableAuthors && publisher.notableAuthors.length > 0 && (
              <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} p-6 rounded-2xl ${theme.shadow?.container || 'shadow-lg'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme.textColors?.primary || 'text-gray-900'}`}>
                  <FaUsers className="inline mr-2" size={18} /> Notable Authors
                </h3>
                <ul className={`list-disc list-inside ${theme.textColors?.secondary || 'text-gray-600'} space-y-1`}>
                  {publisher.notableAuthors.map((author, idx) => (
                    <li key={idx}>{author}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Imprints */}
            {publisher.imprints && publisher.imprints.length > 0 && (
              <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} p-6 rounded-2xl ${theme.shadow?.container || 'shadow-lg'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme.textColors?.primary || 'text-gray-900'}`}>
                  Imprints
                </h3>
                <ul className={`list-disc list-inside ${theme.textColors?.secondary || 'text-gray-600'} space-y-1`}>
                  {publisher.imprints.map((imprint, idx) => (
                    <li key={idx}>{imprint}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Publications */}
            {publisher.keyPublications && publisher.keyPublications.length > 0 && (
              <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} p-6 rounded-2xl ${theme.shadow?.container || 'shadow-lg'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme.textColors?.primary || 'text-gray-900'}`}>
                  <FaBook className="inline mr-2" size={18} /> Key Publications
                </h3>
                <ul className={`list-disc list-inside ${theme.textColors?.secondary || 'text-gray-600'} space-y-1`}>
                  {publisher.keyPublications.map((title, idx) => (
                    <li key={idx}>{title}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Metadata */}
            <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} p-6 rounded-2xl ${theme.shadow?.container || 'shadow-lg'}`}>
              <h3 className={`text-xl font-semibold mb-3 ${theme.textColors?.primary || 'text-gray-900'}`}>
                <FaCompany className="inline mr-2" size={18} /> Company Details
              </h3>
              <dl className="space-y-2">
                {publisher.employees && (
                  <>
                    <dt className={`font-semibold ${theme.textColors?.primary || 'text-gray-900'}`}>Employees</dt>
                    <dd className={theme.textColors?.secondary || 'text-gray-600'}>{publisher.employees}</dd>
                  </>
                )}
                {publisher.revenue && (
                  <>
                    <dt className={`font-semibold ${theme.textColors?.primary || 'text-gray-900'}`}>Annual Revenue</dt>
                    <dd className={theme.textColors?.secondary || 'text-gray-600'}>{publisher.revenue}</dd>
                  </>
                )}
                {publisher.parentCompany && (
                  <>
                    <dt className={`font-semibold ${theme.textColors?.primary || 'text-gray-900'}`}>Parent Company</dt>
                    <dd className={theme.textColors?.secondary || 'text-gray-600'}>{publisher.parentCompany}</dd>
                  </>
                )}
              </dl>
            </div>
          </div>

          {/* Social Media */}
          {publisher.socialMedia && (
            <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} p-6 rounded-2xl ${theme.shadow?.container || 'shadow-lg'}`}>
              <h3 className={`text-xl font-semibold mb-3 ${theme.textColors?.primary || 'text-gray-900'}`}>
                Connect with {publisher.name}
              </h3>
              <div className="flex flex-wrap gap-4">
                {publisher.socialMedia.twitter && (
                  <a
                    href={`https://twitter.com/${publisher.socialMedia.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.textColors?.highlight || 'text-sky-600'} hover:underline flex items-center gap-1`}
                  >
                    <FaTwitter /> Twitter
                  </a>
                )}
                {publisher.socialMedia.instagram && (
                  <a
                    href={`https://instagram.com/${publisher.socialMedia.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.textColors?.highlight || 'text-sky-600'} hover:underline flex items-center gap-1`}
                  >
                    <FaInstagram /> Instagram
                  </a>
                )}
                {publisher.socialMedia.facebook && (
                  <a
                    href={`https://facebook.com/${publisher.socialMedia.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme.textColors?.highlight || 'text-sky-600'} hover:underline flex items-center gap-1`}
                  >
                    <FaFacebook /> Facebook
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Books Section */}
        <div className="mt-12">
          <h2 className={`text-2xl font-semibold mb-6 ${theme.textColors?.primary || 'text-gray-900'}`}>
            Books Published by {publisher.name} ({publisherBooks.length})
          </h2>

          {publisherBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {publisherBooks.map((book) => (
                <Link
                  key={book.id}
                  href={`/bookdeatils/${book.slug || book.id}`}
                  className={`group ${theme.background?.section || (isDarkMode ? 'bg-gray-800' : 'bg-white')} p-4 rounded-xl ${theme.shadow?.container || 'shadow-lg'} ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} hover:shadow-xl transition-all hover:scale-105`}
                >
                  <div className="aspect-[2/3] mb-3 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                    <img
                      src={book.imageUrl || "https://via.placeholder.com/300x450?text=No+Cover"}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x450?text=No+Cover";
                      }}
                    />
                  </div>
                  <h3 className={`font-semibold ${theme.textColors?.primary || 'text-gray-900'} line-clamp-2 text-sm`}>
                    {book.title}
                  </h3>
                  <p className={`text-xs ${theme.textColors?.secondary || 'text-gray-600'} mb-2`}>
                    by {book.author}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${theme.textColors?.secondary || 'text-gray-500'}`}>
                      {book.published || book.year || "N/A"}
                    </span>
                    <span className={`text-xs ${theme.textColors?.highlight || 'text-sky-600'}`}>
                      Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className={`${theme.textColors?.secondary || 'text-gray-600'} italic`}>
              No books found for this publisher in our catalog. Check back later!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationsDetails;