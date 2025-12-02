import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";
import { useAuthRequest } from "expo-auth-session";
import { makeRedirectUri } from "expo-auth-session";

import { config } from "../config/env";

const discovery = {
  authorizationEndpoint: `${config.KEYCLOAK_ISSUER}/protocol/openid-connect/auth`,
  tokenEndpoint: `${config.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
  revocationEndpoint: `${config.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
};

export function useKeycloakAuth() {
  const redirectUri = makeRedirectUri({
    scheme: "wineture",
  });
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: config.KEYCLOAK_ID,
      redirectUri,
      usePKCE: true,
      scopes: ["openid", "profile", "email"],
    },
    discovery
  );

  return { request, response, promptAsync };
}

export async function handleAuthResponse(
  response: AuthSession.AuthSessionResult | null,
  request?: ReturnType<typeof useAuthRequest>[0]
) {
  if (response?.type !== "success") return false;

  let tokenRes = response.authentication;

  if (!tokenRes && response.params && response.params.code) {
    try {
      const code = response.params.code as string;
      const redirectUri = makeRedirectUri({ scheme: "wineture" });
      const body = new URLSearchParams();
      body.append("grant_type", "authorization_code");
      body.append("code", code);
      body.append("client_id", config.KEYCLOAK_ID);
      body.append("redirect_uri", redirectUri);

      if (config.KEYCLOAK_SECRET) {
        body.append("client_secret", config.KEYCLOAK_SECRET);
      }

      if (request && request.codeVerifier) {
        body.append("code_verifier", request.codeVerifier);
      }

      const tokenResponse = await fetch(`${config.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: body.toString(),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error("Token exchange failed:", tokenResponse.status, errorText);
        return false;
      }

      tokenRes = await tokenResponse.json();
    } catch (err) {
      console.error("Token exchange error:", err);
      return false;
    }
  }

  if (!tokenRes) return false;

  const idToken = (tokenRes as any).id_token ?? tokenRes.idToken;
  const accessToken: string | undefined = (tokenRes as any).access_token ?? tokenRes.accessToken;
  const refreshToken: string | undefined = (tokenRes as any).refresh_token ?? tokenRes.refreshToken;
  const expiresIn: number = Number((tokenRes as any).expires_in ?? tokenRes.expiresIn ?? 0);

  if (idToken) {
    await SecureStore.setItemAsync("idToken", idToken);
  }

  if (!accessToken) {
    console.error("No accessToken in response");
    return false;
  }

  if (!refreshToken) {
    console.error("No refreshToken in response");
    return false;
  }

  if (!expiresIn || Number.isNaN(expiresIn)) {
    console.error("Invalid expiresIn value");
    return false;
  }

  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);

  const expiration = Date.now() + expiresIn * 1000;
  await SecureStore.setItemAsync("tokenExpires", String(expiration));

  return true;
}
