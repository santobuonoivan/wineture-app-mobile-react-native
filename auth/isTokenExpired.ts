import * as SecureStore from "expo-secure-store";

export async function isTokenExpired() {
  const expires = await SecureStore.getItemAsync("tokenExpires");

  if (!expires) return true;

  return Date.now() > Number(expires);
}
