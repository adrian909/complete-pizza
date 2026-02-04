import React, { createContext, useState, useEffect, useCallback } from "react";
import { translations } from "../constants/translations";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Restore language from localStorage on initial load
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "ro"; // Default to Romanian
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Get translation function
  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let value = translations[language];

      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k];
        } else {
          return key; // Return the key if translation not found
        }
      }

      return value || key;
    },
    [language]
  );

  const changeLanguage = useCallback((newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, availableLanguages: ["ro", "en"] }}>
      {children}
    </LanguageContext.Provider>
  );
}
