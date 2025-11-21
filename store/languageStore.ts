import { create } from "zustand";
import i18n, { getDeviceLanguage } from "../config/i18n";

export type Language = "es" | "en" | "pt";

interface LanguageState {
  currentLanguage: Language;
  availableLanguages: Language[];
  changeLanguage: (lang: Language) => void;
  initializeLanguage: (userLang?: string) => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  currentLanguage: "es",
  availableLanguages: ["es", "en", "pt"],

  changeLanguage: (lang: Language) => {
    i18n.changeLanguage(lang);
    set({ currentLanguage: lang });
  },

  initializeLanguage: (userLang?: string) => {
    let languageToUse: Language;

    if (userLang && get().availableLanguages.includes(userLang as Language)) {
      // Si el usuario tiene un idioma guardado en su perfil
      languageToUse = userLang as Language;
    } else {
      // Detectar idioma del dispositivo
      languageToUse = getDeviceLanguage() as Language;
    }

    get().changeLanguage(languageToUse);
  },
}));
