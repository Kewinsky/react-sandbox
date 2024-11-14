import React, { useContext, useEffect, useState } from "react";
import "./DarkMode.css";

const ThemeContext = React.createContext();

const DarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty("--background-color", "#242424");
      root.style.setProperty("--text-color", "#dbdbdb");
    } else {
      root.style.setProperty("--background-color", "#dbdbdb");
      root.style.setProperty("--text-color", "#242424");
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <H1Component />
      <ToggleComponent />
    </ThemeContext.Provider>
  );
};

const ToggleComponent = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <label>
      <input
        type="checkbox"
        checked={isDark}
        onClick={() => setIsDark(!isDark)}
      />
      Switch to {isDark ? "Bright" : "Dark"} Mode
    </label>
  );
};

const H1Component = () => {
  return (
    <div>
      <h1>Pokasz cyce</h1>
    </div>
  );
};

export default DarkMode;
