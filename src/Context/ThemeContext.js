import { createContext, useContext, useState } from "react";

const themes = {
  light: "light",
  dark: "dark",
};

const ThemeContext = createContext(themes.light);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const switchTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    document.body.style.backgroundColor =
      newTheme === "light" ? "#fff" : "#000";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const value = useContext(ThemeContext);
  return value;
};
export { useTheme, ThemeProvider };
