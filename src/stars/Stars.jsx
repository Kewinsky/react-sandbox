import { useState } from "react";

// ☆★

const Stars = () => {
  const numberOfStars = 5;
  const [rate, setRate] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleMouseEnter = (starIndex) => {
    setHoveredStar(starIndex);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  const handleClick = (starIndex) => {
    setRate(starIndex);
  };

  return (
    <div>
      {Array(numberOfStars)
        .fill(null)
        .map((_, i) => {
          const starIndex = i + 1;

          return (
            <span
              key={i}
              onClick={() => handleClick(starIndex)}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              onMouseLeave={handleMouseLeave}
              style={{
                cursor: "pointer",
              }}
            >
              {starIndex <= (hoveredStar || rate) ? "★" : "☆"}
            </span>
          );
        })}
      <p>Rate: {rate}</p>
    </div>
  );
};

export default Stars;
