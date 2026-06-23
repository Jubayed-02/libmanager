import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// Default themes for light and dark modes
const lightModeDefaults = {
  navbar: {
    bg: "#ffffff",
    text: "#212529",
    activeText: "#0d6efd",
  },
  background: "#f8f9fa",
  card: {
    bg: "#ffffff",
    text: "#212529",
    border: "#dee2e6",
    shadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  text: "#212529",
  muted: "#6c757d",
  accent: "#0d6efd",
  input: {
    bg: "#ffffff",
    text: "#212529",
    border: "#dee2e6",
  },
  dropdown: {
    bg: "#ffffff",
    text: "#212529",
  },
  footer: {
    bg: "#ffffff",
    text: "#6c757d",
  },
  hover: "#f8f9fa",
  mode: "light",
};

const darkModeDefaults = {
  navbar: {
    bg: "#1a1d23",
    text: "#e1e4e8",
    activeText: "#58a6ff",
  },
  background: "#0d1117",
  card: {
    bg: "#161b22",
    text: "#e1e4e8",
    border: "#30363d",
    shadow: "0 1px 3px rgba(0,0,0,0.4)",
  },
  text: "#e1e4e8",
  muted: "#8b949e",
  accent: "#58a6ff",
  input: {
    bg: "#0d1117",
    text: "#e1e4e8",
    border: "#30363d",
  },
  dropdown: {
    bg: "#161b22",
    text: "#e1e4e8",
  },
  footer: {
    bg: "#161b22",
    text: "#8b949e",
  },
  hover: "#21262d",
  mode: "dark",
};

// Predefined color palettes
const colorPalettes = {
  navbar: [
    { name: "White", value: "#ffffff", textColor: "#212529" },
    { name: "Light Gray", value: "#f8f9fa", textColor: "#212529" },
    { name: "Dark Gray", value: "#1a1d23", textColor: "#e1e4e8" },
    { name: "Dark Blue", value: "#1e3a5f", textColor: "#ffffff" },
    { name: "Black", value: "#0d1117", textColor: "#e1e4e8" },
    { name: "Forest Green", value: "#1a3c2a", textColor: "#ffffff" },
    { name: "Deep Purple", value: "#2d1b69", textColor: "#ffffff" },
    { name: "Burgundy", value: "#722f37", textColor: "#ffffff" },
    { name: "Teal", value: "#00695c", textColor: "#ffffff" },
    { name: "Navy", value: "#1b2838", textColor: "#ffffff" },
  ],
  background: [
    { name: "Light Gray", value: "#f8f9fa" },
    { name: "White", value: "#ffffff" },
    { name: "Dark", value: "#0d1117" },
    { name: "Darker", value: "#0a0e13" },
    { name: "Light Blue", value: "#f0f8ff" },
    { name: "Light Green", value: "#f0f7f4" },
    { name: "Light Purple", value: "#f8f6ff" },
    { name: "Warm White", value: "#fef9f3" },
    { name: "Cool Gray", value: "#e9ecef" },
    { name: "Navy Dark", value: "#1a1f2e" },
  ],
  card: [
    { name: "White", value: "#ffffff", textColor: "#212529" },
    { name: "Light Gray", value: "#f8f9fa", textColor: "#212529" },
    { name: "Dark", value: "#161b22", textColor: "#e1e4e8" },
    { name: "Darker", value: "#1c2128", textColor: "#e1e4e8" },
    { name: "Light Blue", value: "#e3f2fd", textColor: "#212529" },
    { name: "Light Green", value: "#e8f5e9", textColor: "#212529" },
    { name: "Cream", value: "#fff8e1", textColor: "#212529" },
    { name: "Black", value: "#0d1117", textColor: "#e1e4e8" },
    { name: "Charcoal", value: "#21262d", textColor: "#e1e4e8" },
    { name: "Midnight", value: "#1a1d23", textColor: "#e1e4e8" },
  ],
  accent: [
    { name: "Blue", value: "#0d6efd" },
    { name: "Light Blue", value: "#58a6ff" },
    { name: "Green", value: "#198754" },
    { name: "Purple", value: "#6f42c1" },
    { name: "Orange", value: "#fd7e14" },
    { name: "Teal", value: "#20c997" },
    { name: "Pink", value: "#d63384" },
    { name: "Red", value: "#dc3545" },
    { name: "Cyan", value: "#0dcaf0" },
    { name: "Lime", value: "#32cd32" },
  ],
};

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem("library_theme_custom");
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme);
      // Validate the parsed theme has required properties
      if (parsed && parsed.navbar && parsed.card && parsed.mode) {
        return parsed;
      }
    }
    return lightModeDefaults;
  } catch (error) {
    console.error("Error reading theme from localStorage:", error);
    return lightModeDefaults;
  }
}

function getInitialCustomizations() {
  try {
    const saved = window.localStorage.getItem("library_customized_sections");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    return [];
  } catch (error) {
    console.error("Error reading customizations from localStorage:", error);
    return [];
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [customizedSections, setCustomizedSections] = useState(
    getInitialCustomizations,
  );

  // Ensure theme always has all required properties
  const safeTheme = {
    ...lightModeDefaults,
    ...theme,
    navbar: { ...lightModeDefaults.navbar, ...(theme?.navbar || {}) },
    card: { ...lightModeDefaults.card, ...(theme?.card || {}) },
    input: { ...lightModeDefaults.input, ...(theme?.input || {}) },
    dropdown: { ...lightModeDefaults.dropdown, ...(theme?.dropdown || {}) },
    footer: { ...lightModeDefaults.footer, ...(theme?.footer || {}) },
  };

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(
        "library_theme_custom",
        JSON.stringify(safeTheme),
      );
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  }, [safeTheme]);

  // Save customizations to localStorage whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem(
        "library_customized_sections",
        JSON.stringify(customizedSections),
      );
    } catch (error) {
      console.error("Error saving customizations to localStorage:", error);
    }
  }, [customizedSections]);

  const updateSection = (section, value, textColor = null) => {
    setTheme((prev) => {
      const newTheme = { ...prev };

      switch (section) {
        case "navbar":
          newTheme.navbar = {
            ...newTheme.navbar,
            bg: value,
            text: textColor || (isDarkColor(value) ? "#e1e4e8" : "#212529"),
            activeText: isDarkColor(value) ? "#58a6ff" : "#0d6efd",
          };
          break;
        case "background":
          newTheme.background = value;
          break;
        case "card":
          newTheme.card = {
            ...newTheme.card,
            bg: value,
            text: textColor || (isDarkColor(value) ? "#e1e4e8" : "#212529"),
            border: isDarkColor(value) ? "#30363d" : "#dee2e6",
            shadow: isDarkColor(value)
              ? "0 1px 3px rgba(0,0,0,0.4)"
              : "0 1px 3px rgba(0,0,0,0.1)",
          };
          break;
        case "accent":
          newTheme.accent = value;
          break;
        case "mode":
          const newMode = value;
          const defaults =
            newMode === "dark" ? darkModeDefaults : lightModeDefaults;

          newTheme.mode = newMode;
          newTheme.text = defaults.text;
          newTheme.muted = defaults.muted;
          newTheme.hover = defaults.hover;
          newTheme.input = { ...defaults.input };
          newTheme.dropdown = { ...defaults.dropdown };
          newTheme.footer = { ...defaults.footer };

          if (!customizedSections.includes("navbar")) {
            newTheme.navbar = { ...defaults.navbar };
          }
          if (!customizedSections.includes("background")) {
            newTheme.background = defaults.background;
          }
          if (!customizedSections.includes("card")) {
            newTheme.card = { ...defaults.card };
          }
          if (!customizedSections.includes("accent")) {
            newTheme.accent = defaults.accent;
          }
          break;
        default:
          break;
      }

      return newTheme;
    });

    if (section !== "mode" && !customizedSections.includes(section)) {
      setCustomizedSections((prev) => [...prev, section]);
    }
  };

  const resetTheme = () => {
    const defaults =
      theme?.mode === "dark" ? darkModeDefaults : lightModeDefaults;
    setTheme({ ...defaults });
    setCustomizedSections([]);
  };

  const resetSection = (section) => {
    const defaults =
      theme?.mode === "dark" ? darkModeDefaults : lightModeDefaults;
    setTheme((prev) => ({
      ...prev,
      [section]: defaults[section],
    }));
    setCustomizedSections((prev) => prev.filter((s) => s !== section));
  };

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;

    // Apply CSS variables with fallback values
    root.style.setProperty("--navbar-bg", safeTheme.navbar?.bg || "#ffffff");
    root.style.setProperty(
      "--navbar-text",
      safeTheme.navbar?.text || "#212529",
    );
    root.style.setProperty(
      "--navbar-active",
      safeTheme.navbar?.activeText || "#0d6efd",
    );
    root.style.setProperty("--bg-color", safeTheme.background || "#f8f9fa");
    root.style.setProperty("--card-bg", safeTheme.card?.bg || "#ffffff");
    root.style.setProperty("--card-text", safeTheme.card?.text || "#212529");
    root.style.setProperty(
      "--card-border",
      safeTheme.card?.border || "#dee2e6",
    );
    root.style.setProperty(
      "--card-shadow",
      safeTheme.card?.shadow || "0 1px 3px rgba(0,0,0,0.1)",
    );
    root.style.setProperty("--text-color", safeTheme.text || "#212529");
    root.style.setProperty("--muted-color", safeTheme.muted || "#6c757d");
    root.style.setProperty("--accent-color", safeTheme.accent || "#0d6efd");
    root.style.setProperty("--input-bg", safeTheme.input?.bg || "#ffffff");
    root.style.setProperty("--input-text", safeTheme.input?.text || "#212529");
    root.style.setProperty(
      "--input-border",
      safeTheme.input?.border || "#dee2e6",
    );
    root.style.setProperty(
      "--dropdown-bg",
      safeTheme.dropdown?.bg || "#ffffff",
    );
    root.style.setProperty(
      "--dropdown-text",
      safeTheme.dropdown?.text || "#212529",
    );
    root.style.setProperty("--footer-bg", safeTheme.footer?.bg || "#ffffff");
    root.style.setProperty(
      "--footer-text",
      safeTheme.footer?.text || "#6c757d",
    );
    root.style.setProperty("--hover-bg", safeTheme.hover || "#f8f9fa");

    document.body.style.backgroundColor = safeTheme.background || "#f8f9fa";
    document.body.style.color = safeTheme.text || "#212529";

    if (safeTheme.mode === "dark") {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    } else {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    }
  }, [safeTheme]);

  const value = {
    theme: safeTheme,
    setTheme,
    updateSection,
    resetTheme,
    resetSection,
    colorPalettes,
    customizedSections,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

function isDarkColor(hexColor) {
  if (!hexColor) return false;
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}
