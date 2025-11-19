// Temporary environment configuration for debugging
export const config = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  API_KEY: process.env.EXPO_PUBLIC_WINETURE_API_KEY,
};

// Debug log to see what's happening with env vars
console.log("Environment Variables Debug:", {
  EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  EXPO_PUBLIC_WINETURE_API_KEY: process.env.EXPO_PUBLIC_WINETURE_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  allExpoPublic: Object.keys(process.env).filter((key) =>
    key.startsWith("EXPO_PUBLIC_")
  ),
  processEnvKeys: Object.keys(process.env).length,
});
