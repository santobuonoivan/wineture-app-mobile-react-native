import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n, { getDeviceLanguage } from "../config/i18n";

export type Language = "es" | "en" | "pt";

interface LanguageState {
  currentLanguage: Language;
  availableLanguages: Language[];
  changeLanguage: (lang: Language) => void;
  initializeLanguage: (userLang?: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: (i18n.language as Language) || "es",
      availableLanguages: ["es", "en", "pt"],

      changeLanguage: (lang: Language) => {
        i18n.changeLanguage(lang);
        set({ currentLanguage: lang });
      },

      initializeLanguage: (userLang?: string) => {
        let languageToUse: Language;

        if (
          userLang &&
          get().availableLanguages.includes(userLang as Language)
        ) {
          // Si el usuario tiene un idioma guardado en su perfil
          languageToUse = userLang as Language;
        } else {
          // Detectar idioma del dispositivo o usar el actual de i18n
          languageToUse =
            (i18n.language as Language) || (getDeviceLanguage() as Language);
        }

        get().changeLanguage(languageToUse);
      },
    }),
    {
      name: "language-storage",
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.currentLanguage) {
          i18n.changeLanguage(state.currentLanguage);
        }
      },
    }
  )
);
