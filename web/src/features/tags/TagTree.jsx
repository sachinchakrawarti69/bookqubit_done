import React from "react";

const TagTree = ({ tree }) => {
  if (!tree || tree.length === 0) return null;

  return (
    <ul className="pl-6 list-disc">
      {tree.map((node, index) => (
        <li key={index}>
          <span className="font-medium">{node.name}</span>

          {node.children && node.children.length > 0 && (
            <TagTree tree={node.children} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TagTree;
