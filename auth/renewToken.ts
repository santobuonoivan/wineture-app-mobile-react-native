import * as SecureStore from "expo-secure-store";
import { config } from "../config/env";

export async function renewToken() {
  try {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    if (!refreshToken) {
      console.warn("❌ No refreshToken guardado");
      return null;
    }

    const response = await fetch(
      `${config.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: config.KEYCLOAK_ID,
          refresh_token: refreshToken,
        }).toString(),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.access_token) {
      console.error("❌ Error refrescando token", data);
      return null;
    }

    await SecureStore.setItemAsync("accessToken", data.access_token);
    await SecureStore.setItemAsync("refreshToken", data.refresh_token);

    const expiresAt = Date.now() + data.expires_in * 1000;
    await SecureStore.setItemAsync("tokenExpires", `${expiresAt}`);

    console.log("🔄 Token renovado correctamente");

    return data.access_token;
  } catch (error) {
    console.error("❌ Error inesperado refrescando token", error);
    return null;
  }
}
