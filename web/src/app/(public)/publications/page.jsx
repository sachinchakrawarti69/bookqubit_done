"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaStar, 
  FaBuilding,
  FaGlobe,
  FaArrowRight,
  FaCalendarAlt,
  FaUsers,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaChartLine,
  FaBook
} from "react-icons/fa";
import publicationsData from "@/data/publications/PublicationsData";

export default function PublicationsPage() {
  const { theme, themeName } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [publications, setPublications] = useState([]);

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  useEffect(() => {
    setPublications(publicationsData);
  }, []);

  // Get unique types
  const types = ["All", ...new Set(publicationsData.map(pub => pub.type))];

  // Filter publications
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = 
      pub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.headquarters?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.notableAuthors?.some(author => 
        author.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      pub.imprints?.some(imprint => 
        imprint.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesType = selectedType === "All" || pub.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const clearFilters = () => {
    setSelectedType("All");
    setSearchTerm("");
  };

  // Social media icon helper
  const getSocialIcon = (platform) => {
    switch(platform) {
      case 'twitter': return <FaTwitter />;
      case 'instagram': return <FaInstagram />;
      case 'facebook': return <FaFacebook />;
      default: return null;
    }
  };

  return (
    <main className={`min-h-screen ${theme.background?.section || ''}`}>
      {/* Hero Section */}
      <section className={`${theme.layout?.sectionPadding || 'py-16 px-4 sm:px-6 lg:px-8'} text-center ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.textColors?.primary || ''}`}>
            Publications
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${theme.textColors?.secondary || ''} max-w-2xl mx-auto`}>
            Discover leading publishers and publications from around the world
          </p>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name, author, imprint, or location..."
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
              {selectedType !== "All" && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                  1
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
                <h3 className={`font-semibold ${theme.textColors?.primary || ''}`}>Filter Publications</h3>
                <button onClick={clearFilters} className={`text-sm ${theme.textColors?.highlight || ''}`}>
                  Clear All
                </button>
              </div>
              
              {/* Type Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.textColors?.primary || ''}`}>Publisher Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${theme.border?.default || ''} ${theme.background?.navigationDots || ''} ${theme.textColors?.primary || ''}`}
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Info */}
      {(searchTerm || selectedType !== "All") && (
        <div className={`px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
          <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto py-4 flex justify-between items-center ${theme.textColors?.secondary || ''}`}>
            <span>Found {filteredPublications.length} publishers</span>
            <button onClick={clearFilters} className={`text-sm flex items-center gap-1 ${theme.textColors?.highlight || ''}`}>
              <FaTimes size={12} />
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Publications Display */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${theme.background?.section || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          {filteredPublications.length === 0 ? (
            <div className={`text-center py-12 ${theme.textColors?.secondary || ''}`}>
              No publications found. Try adjusting your filters.
            </div>
          ) : viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map((pub) => (
                <Link
                  key={pub.id}
                  href={`/publications/${pub.slug}`}
                  className={`group ${theme.background?.bookCoverSide || ''} ${theme.border?.default || ''} ${theme.shadow?.container || ''} rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {pub.logo ? (
                        <img
                          src={pub.logo}
                          alt={pub.name}
                          className="w-16 h-16 object-contain rounded-lg"
                        />
                      ) : (
                        <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl ${theme.background?.navigationDots || ''} ${theme.textColors?.highlight || ''}`}>
                          <FaBuilding />
                        </div>
                      )}
                      <div>
                        <h3 className={`text-xl font-bold line-clamp-2 ${theme.textColors?.primary || ''}`}>
                          {pub.name}
                        </h3>
                        <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}>
                          {pub.type}
                        </div>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-4 line-clamp-3 ${theme.textColors?.secondary || ''}`}>
                      {pub.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pub.founded && (
                        <div className={`text-xs flex items-center gap-1 ${theme.textColors?.secondary || ''}`}>
                          <FaCalendarAlt size={10} />
                          Founded {pub.founded}
                        </div>
                      )}
                      {pub.headquarters && (
                        <div className={`text-xs flex items-center gap-1 ${theme.textColors?.secondary || ''}`}>
                          <FaGlobe size={10} />
                          {pub.headquarters}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pub.notableAuthors?.slice(0, 3).map((author, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}
                        >
                          {author}
                        </span>
                      ))}
                      {pub.notableAuthors?.length > 3 && (
                        <span className={`text-xs px-2 py-1 rounded ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}>
                          +{pub.notableAuthors.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-3">
                        {pub.employees && (
                          <div className={`text-xs ${theme.textColors?.secondary || ''}`}>
                            <FaUsers className="inline mr-1" size={10} />
                            {pub.employees}
                          </div>
                        )}
                        {pub.revenue && (
                          <div className={`text-xs ${theme.textColors?.secondary || ''}`}>
                            <FaChartLine className="inline mr-1" size={10} />
                            {pub.revenue}
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
              {filteredPublications.map((pub) => (
                <Link
                  key={pub.id}
                  href={`/publications/${pub.slug}`}
                  className={`block group ${theme.background?.bookCoverSide || ''} ${theme.border?.default || ''} ${theme.shadow?.container || ''} rounded-xl p-6 transition-all hover:shadow-xl`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {pub.logo ? (
                      <img
                        src={pub.logo}
                        alt={pub.name}
                        className="w-24 h-24 object-contain rounded-lg"
                      />
                    ) : (
                      <div className={`w-24 h-24 rounded-lg flex items-center justify-center text-4xl ${theme.background?.navigationDots || ''} ${theme.textColors?.highlight || ''}`}>
                        <FaBuilding />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <div>
                          <h3 className={`text-2xl font-bold ${theme.textColors?.primary || ''}`}>
                            {pub.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}>
                              {pub.type}
                            </span>
                            {pub.founded && (
                              <span className={`text-xs flex items-center gap-1 ${theme.textColors?.secondary || ''}`}>
                                <FaCalendarAlt size={10} />
                                Founded {pub.founded}
                              </span>
                            )}
                            {pub.headquarters && (
                              <span className={`text-xs flex items-center gap-1 ${theme.textColors?.secondary || ''}`}>
                                <FaGlobe size={10} />
                                {pub.headquarters}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-4 ${theme.textColors?.secondary || ''}`}>
                        {pub.about || pub.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {pub.notableAuthors && pub.notableAuthors.length > 0 && (
                          <div>
                            <h4 className={`text-xs font-semibold mb-2 ${theme.textColors?.primary || ''}`}>Notable Authors</h4>
                            <div className="flex flex-wrap gap-2">
                              {pub.notableAuthors.slice(0, 4).map((author, idx) => (
                                <span key={idx} className={`text-xs px-2 py-1 rounded ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}>
                                  {author}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {pub.imprints && pub.imprints.length > 0 && (
                          <div>
                            <h4 className={`text-xs font-semibold mb-2 ${theme.textColors?.primary || ''}`}>Imprints</h4>
                            <div className="flex flex-wrap gap-2">
                              {pub.imprints.slice(0, 4).map((imprint, idx) => (
                                <span key={idx} className={`text-xs px-2 py-1 rounded ${theme.background?.navigationDots || ''} ${theme.textColors?.secondary || ''}`}>
                                  {imprint}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Social Media Links */}
                      {pub.socialMedia && (
                        <div className="flex gap-3">
                          {Object.entries(pub.socialMedia).map(([platform, handle]) => (
                            handle && (
                              <a
                                key={platform}
                                href={`https://${platform}.com/${handle}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-sm ${theme.textColors?.secondary || ''} hover:${theme.textColors?.highlight || ''} transition-colors`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {getSocialIcon(platform)}
                              </a>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <FaArrowRight className={`${theme.textColors?.highlight || ''} group-hover:translate-x-2 transition-transform`} size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme.background?.navigationDots || ''}`}>
        <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <FaBuilding className={`text-4xl mx-auto mb-3 ${theme.textColors?.highlight || ''}`} />
              <div className={`text-3xl font-bold ${theme.textColors?.primary || ''}`}>
                {publications.length}
              </div>
              <div className={`${theme.textColors?.secondary || ''}`}>Publishers</div>
            </div>
            <div>
              <FaBook className={`text-4xl mx-auto mb-3 ${theme.textColors?.highlight || ''}`} />
              <div className={`text-3xl font-bold ${theme.textColors?.primary || ''}`}>
                {publications.reduce((sum, pub) => sum + (pub.keyPublications?.length || 0), 0)}+
              </div>
              <div className={`${theme.textColors?.secondary || ''}`}>Key Publications</div>
            </div>
            <div>
              <FaUsers className={`text-4xl mx-auto mb-3 ${theme.textColors?.highlight || ''}`} />
              <div className={`text-3xl font-bold ${theme.textColors?.primary || ''}`}>
                {publications.reduce((sum, pub) => {
                  const employees = pub.employees?.match(/\d+/);
                  return sum + (employees ? parseInt(employees[0]) : 0);
                }, 0).toLocaleString()}+
              </div>
              <div className={`${theme.textColors?.secondary || ''}`}>Employees</div>
            </div>
            <div>
              <FaGlobe className={`text-4xl mx-auto mb-3 ${theme.textColors?.highlight || ''}`} />
              <div className={`text-3xl font-bold ${theme.textColors?.primary || ''}`}>
                {new Set(publications.map(pub => pub.headquarters?.split(',')[1] || pub.headquarters)).size}
              </div>
              <div className={`${theme.textColors?.secondary || ''}`}>Countries</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}