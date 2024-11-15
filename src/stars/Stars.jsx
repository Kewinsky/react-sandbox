import { useState } from "react";

// ☆★

const Stars = () => {
  const numberOfStars = 5;
  const [rate, setRate] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div>
      {Array(numberOfStars)
        .fill(null)
        .map((_, i) => {
          const starIndex = i + 1;

          return (
            <span
              key={i}
              onClick={() => setRate(starIndex)}
              onMouseEnter={() => setHoveredStar(starIndex)}
              onMouseLeave={() => setHoveredStar(0)}
              style={{
                cursor: "pointer",
              }}
            >
              {/* this handles displaying proper star */}
              {starIndex <= (hoveredStar || rate) ? "★" : "☆"}
            </span>
          );
        })}
      <p>Rate: {rate}</p>
    </div>
  );
};

export default Stars;
