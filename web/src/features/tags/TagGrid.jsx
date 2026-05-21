import React from "react";
import TagChip from "./TagChip";

const TagGrid = ({ tags = [] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {tags.map((tag) => (
        <TagChip key={tag} label={tag} />
      ))}
    </div>
  );
};

export default TagGrid;
