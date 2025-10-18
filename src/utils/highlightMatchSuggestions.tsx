import React from "react";

const highlightMatch = (
  text: string,
  query: string
): (string | React.ReactElement)[] => {
  if (!query) return [text];

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} style={{ backgroundColor: "yellow" }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

export default highlightMatch;