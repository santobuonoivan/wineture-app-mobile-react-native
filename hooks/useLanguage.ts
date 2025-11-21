import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageStore, Language } from "../store/languageStore";
import { useAuthStore } from "../store/authStore";

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    initializeLanguage,
  } = useLanguageStore();
  const { user, isAuthenticated } = useAuthStore();

  // Inicializar idioma cuando cambie el estado de autenticación
  useEffect(() => {
    if (isAuthenticated && user?.lang) {
      // Si el usuario está logueado, usar su idioma preferido
      initializeLanguage(user.lang);
    } else if (!isAuthenticated) {
      // Si no está logueado, usar idioma del dispositivo
      initializeLanguage();
    }
  }, [isAuthenticated, user?.lang, initializeLanguage]);

  const getLanguageNames = () => ({
    es: "Español",
    en: "English",
    pt: "Português",
  });

  const switchLanguage = (lang: Language) => {
    changeLanguage(lang);
  };

  return {
    t,
    currentLanguage,
    availableLanguages,
    switchLanguage,
    getLanguageNames,
    isReady: i18n.isInitialized,
  };
};
