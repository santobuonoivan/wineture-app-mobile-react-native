import * as SecureStore from "expo-secure-store";
import { isTokenExpired } from "./isTokenExpired";
import { renewToken } from "./renewToken";

export async function getValidToken() {
  const expired = await isTokenExpired();

  if (!expired) {
    return await SecureStore.getItemAsync("accessToken");
  }

  console.log("⚠ Token vencido → renovando...");

  return await renewToken();
}
