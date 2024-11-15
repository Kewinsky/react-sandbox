import React, { useContext } from "react";
import { ThemeContext } from "./DarkMode";

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

export default ToggleComponent;
