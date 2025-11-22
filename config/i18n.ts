import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Importar traducciones
import es from "../locales/es.json";
import en from "../locales/en.json";
import pt from "../locales/pt.json";

// Función para detectar el idioma del dispositivo
const getDeviceLanguage = (): string => {
  const locale = Localization.getLocales()[0];
  const languageCode = locale?.languageCode || "en";

  // Mapear códigos de idioma a nuestros idiomas soportados
  switch (languageCode) {
    case "es":
      return "es";
    case "pt":
      return "pt";
    case "en":
    default:
      return "en";
  }
};

const resources = {
  es: { translation: es },
  en: { translation: en },
  pt: { translation: pt },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: getDeviceLanguage(), // Idioma por defecto basado en el dispositivo
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  // Mantener el idioma seleccionado
  saveMissing: false,
  updateMissing: false,
});

export { getDeviceLanguage };
export default i18n;
