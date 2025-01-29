import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContext {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Detect the system's preferred theme
  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | null;
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState<"dark" | "light">(getPreferredTheme);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("theme", theme);
    // Apply CSS variables dynamically
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider as ThemeContextProvider, useTheme };
