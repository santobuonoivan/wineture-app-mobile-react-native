import * as SecureStore from "expo-secure-store";
import { config } from "../config/env";
import { useSessionStore } from "../store/sessionStore";

export interface TokenRefreshResult {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

/**
 * Refresca el access token usando el refresh token
 */
export async function refreshAccessToken(): Promise<TokenRefreshResult> {
  try {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    if (!refreshToken) {
      return { success: false };
    }

    const body = new URLSearchParams();
    body.append("grant_type", "refresh_token");
    body.append("refresh_token", refreshToken);
    body.append("client_id", config.KEYCLOAK_ID);

    if (config.KEYCLOAK_SECRET) {
      body.append("client_secret", config.KEYCLOAK_SECRET);
    }

    const tokenResponse = await fetch(
      `${config.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: body.toString(),
      }
    );

    const text = await tokenResponse.text();
    let tokenRes: any = null;
    try {
      tokenRes = text ? JSON.parse(text) : null;
    } catch (e) {
      // ignore parse error
    }

    if (!tokenResponse.ok) {
      // Handle specific Keycloak error when refresh token is invalid/not active
      if (tokenResponse.status === 400 && tokenRes && tokenRes.error === "invalid_grant") {
        console.warn("[tokenRefresh] Refresh failed - invalid_grant. Clearing stored tokens.");
        await clearStoredTokens();
        return { success: false };
      }

      console.error("[tokenRefresh] Refresh failed:", tokenResponse.status, text);
      return { success: false };
    }

    tokenRes = tokenRes ?? (await tokenResponse.json());

    const newAccessToken: string = tokenRes.access_token;
    const newRefreshToken: string = tokenRes.refresh_token || refreshToken;
    const expiresIn: number = Number(tokenRes.expires_in || 0);

    if (!newAccessToken || !expiresIn || Number.isNaN(expiresIn)) {
      console.error("[tokenRefresh] Invalid response from refresh endpoint");
      return { success: false };
    }

    // Guardar nuevos tokens
    await SecureStore.setItemAsync("accessToken", newAccessToken);
    await SecureStore.setItemAsync("refreshToken", newRefreshToken);

    const expiration = Date.now() + expiresIn * 1000;
    await SecureStore.setItemAsync("tokenExpires", String(expiration));

    // Si hay un nuevo idToken, actualizar también
    if (tokenRes.id_token) {
      await SecureStore.setItemAsync("idToken", tokenRes.id_token);
    }

    return {
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn,
    };
  } catch (err) {
    console.error("[tokenRefresh] Error:", err);
    return { success: false };
  }
}

/**
 * Limpia tokens guardados en el dispositivo.
 * Útil cuando el refresh token ya no es válido (invalid_grant).
 */
export async function clearStoredTokens() {
  try {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("idToken");
    await SecureStore.deleteItemAsync("tokenExpires");
  } catch (err) {
    console.warn("[clearStoredTokens] Error clearing tokens:", err);
  }
}

/**
 * Verifica si el token está próximo a expirar
 * @param bufferMs tiempo en ms antes del vencimiento para considerar que debe refrescarse
 */
export async function isTokenExpired(bufferMs: number = 60000): Promise<boolean> {
  try {
    const tokenExpires = await SecureStore.getItemAsync("tokenExpires");

    if (!tokenExpires) {
      return true;
    }

    const expirationTime = parseInt(tokenExpires, 10);
    const now = Date.now();
    const timeUntilExpiry = expirationTime - now;

    // Refrescar si faltan menos de bufferMs para expirar (default: 1 minuto)
    return timeUntilExpiry < bufferMs;
  } catch (err) {
    console.error("[isTokenExpired] Error:", err);
    return true;
  }
}

/**
 * Obtiene el access token, refrescándolo si es necesario
 */
export async function getValidAccessToken(): Promise<string | null> {
  try {
    const isExpired = await isTokenExpired();

    if (isExpired) {
      const refreshResult = await refreshAccessToken();

      if (!refreshResult.success || !refreshResult.accessToken) {
        console.error("[getValidAccessToken] Failed to refresh token");
        // Clear stored tokens to avoid repeated failing attempts
        await clearStoredTokens();
        // Signal the UI to show a friendly session-expired modal
        try {
          useSessionStore.getState().setExpired(true, "Your session has expired. Please sign in again.");
        } catch (e) {
          console.warn("[getValidAccessToken] Could not set session expired flag", e);
        }
        return null;
      }

      return refreshResult.accessToken;
    }

    // Token aún es válido
    return await SecureStore.getItemAsync("accessToken");
  } catch (err) {
    console.error("[getValidAccessToken] Error:", err);
    return null;
  }
}
