// src/public_app/features/tags/TagChip.jsx
import React from "react";
import { Link } from "react-router-dom";

const TagChip = ({ label, path }) => {
  return (
    <Link
      to={path || "#"}
      style={{
        backgroundColor: "#e0f2f1",
        color: "#4e342e",
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: "500",
        display: "inline-block",
        margin: "2px",
        textDecoration: "none",
        transition: "all 0.2s",
      }}
    >
      {label}
    </Link>
  );
};

export default TagChip;
