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

  // Sincronizar el store con i18n cuando cambie el idioma
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (lng !== currentLanguage) {
        useLanguageStore.setState({ currentLanguage: lng as Language });
      }
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [currentLanguage]);

  // Inicializar idioma cuando cambie el estado de autenticación
  useEffect(() => {
    if (isAuthenticated && user?.lang) {
      // Si el usuario está logueado, usar su idioma preferido
      if (user.lang !== currentLanguage) {
        changeLanguage(user.lang as Language);
      }
    } else if (!isAuthenticated) {
      // Si no está logueado, inicializar con idioma del dispositivo
      initializeLanguage();
    }
  }, [isAuthenticated, user?.lang]);

  const getLanguageNames = () => ({
    es: "Español",
    en: "English",
    pt: "Português",
  });

  const switchLanguage = (lang: Language) => {
    changeLanguage(lang);

    // Actualizar el idioma en los datos del usuario si está logueado
    if (isAuthenticated && user) {
      useAuthStore.getState().updateUserLanguage(lang);
    }
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
