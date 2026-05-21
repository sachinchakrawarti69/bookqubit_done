import React from "react";
import TagChip from "./TagChip";

const TagList = ({ tags = [] }) => {
  return (
    <div className="space-y-3">
      {tags.map((tag) => (
        <TagChip key={tag} label={tag} />
      ))}
    </div>
  );
};

export default TagList;
