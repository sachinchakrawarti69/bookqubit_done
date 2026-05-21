import React from "react";
import { Link } from "react-router-dom";
import tagsData from "./tags.json";
import TagChip from "./TagChip";

const TagPage = ({ slug }) => {
  // find tag by slug
  const tag = tagsData.tags.find((t) => t.slug === slug);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
      {/* Tag Title */}
      <header>
        {tag ? (
          <>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {tag.icon && <span>{tag.icon}</span>}
              {tag.name}
            </h1>
            <p className="text-gray-500 mt-1">Category: {tag.type}</p>
          </>
        ) : (
          <h1 className="text-3xl font-bold">No Tag Found: {slug}</h1>
        )}
      </header>

      {/* Tag Description */}
      {tag?.description && (
        <p className="text-lg text-gray-700 leading-relaxed">
          {tag.description}
        </p>
      )}

      {/* Related Tags */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Related Tags</h2>
        <div className="flex gap-3 flex-wrap">
          {tagsData.tags
            .filter((t) => t.slug !== slug)
            .slice(0, 12)
            .map((t) => (
              <TagChip
                key={t.slug}
                label={t.name}
                path={`/${t.slug}`}
                icon={t.icon}
              />
            ))}
        </div>
      </section>

      {/* Explore All Tags */}
      <section>
        <h2 className="text-lg font-semibold mb-2">All Tags</h2>
        <div className="flex flex-wrap gap-3">
          {tagsData.tags.map((t) => (
            <TagChip
              key={t.slug}
              label={t.name}
              path={`/${t.slug}`}
              icon={t.icon}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TagPage;
