import React, { useEffect, useState } from "react";
import "./DarkMode.css";
import ToggleComponent from "./ToggleComponent";
import H1Component from "./H1Component";

// React Context
const ThemeContext = React.createContext();

const DarkMode = () => {
  const [isDark, setIsDark] = useState(true);

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

export default DarkMode;
export { ThemeContext };
