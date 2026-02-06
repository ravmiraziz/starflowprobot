// src/context/LanguageContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { translations } from "../translations";
import { useInfoContext } from "./infoContext";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { currentUser } = useInfoContext();

  const getInitialLang = () => {
    return localStorage.getItem("lang") || currentUser.language || "uz";
  };

  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    if (currentUser?.language && currentUser.language !== lang) {
      setLang(currentUser.language);
      localStorage.setItem("lang", currentUser.language);
    }
  }, [currentUser?.language]);

  const t = (key, vars = {}) => {
    let text =
      key
        .split(".")
        .reduce((obj, k) => (obj ? obj[k] : null), translations[lang]) || key;

    // {{price}}, {{stars}} kabi qiymatlarni almashtirish
    if (typeof text === "string") {
      Object.keys(vars).forEach((varKey) => {
        text = text.replace(
          new RegExp(`{{\\s*${varKey}\\s*}}`, "g"),
          vars[varKey],
        );
      });
    }

    return text;
  };

  const changeLanguage = (lng) => {
    setLang(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
