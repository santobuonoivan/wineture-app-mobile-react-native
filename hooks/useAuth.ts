import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import { makeRedirectUri } from "expo-auth-session";

import { useAuthStore, User } from "../store/authStore";
import { Language, useLanguageStore } from "../store/languageStore";
import { useKeycloakAuth, handleAuthResponse } from "../auth/authService";
import { config } from "../config/env";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } =
    useAuthStore();

  const { initializeLanguage, changeLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const { request, response, promptAsync } = useKeycloakAuth();

  const signIn = async () => {
    try {
      setLoading(true);

      const result = await promptAsync();

      const ok = await handleAuthResponse(result, request);
      if (!ok) {
        setLoading(false);
        Alert.alert("Error", "No se pudo iniciar sesión");
        return { success: false };
      }

      const idToken = await SecureStore.getItemAsync("idToken");
      const accessToken = await SecureStore.getItemAsync("accessToken");

      if (!idToken && !accessToken) {
        Alert.alert("Error", "No se recibió token del servidor");
        return { success: false };
      }

      const payload = JSON.parse(
        atob(idToken!.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      );

      const userData: User = {
        id: payload.sub,
        email: payload.email,
        name: payload.preferred_username || payload.name,
        avatar: "",
        lang: payload.locale || "es",
      };

      login(userData);

      if (userData.lang) changeLanguage(userData.lang as Language);

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "No se pudo iniciar sesión");
      return { success: false };
    }
  };

  const signOut = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (refreshToken) {
        try {
          const redirectUri = makeRedirectUri({ scheme: "wineture" });
          await fetch(
            `${config.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                client_id: config.KEYCLOAK_ID,
                refresh_token: refreshToken,
                client_secret: config.KEYCLOAK_SECRET || "",
              }).toString(),
            }
          );
        } catch (err) {
          console.error("[useAuth] Error revoking Keycloak session:", err);
        }
      }

      logout();
      initializeLanguage();

      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("idToken");
      await SecureStore.deleteItemAsync("tokenExpires");

      Alert.alert(t("common.success"), t("auth.sessionClosed"));
    } catch (err) {
      console.error("[useAuth] signOut error:", err);
      Alert.alert("Error", "Error al cerrar sesión");
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
  };
};
