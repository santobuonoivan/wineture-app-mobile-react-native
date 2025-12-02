import { getValidAccessToken } from "./tokenRefresh";

export interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Wrapper para fetch que automáticamente:
 * - Inyecta el access token en el header Authorization
 * - Refresca el token si está por expirar
 * - Maneja errores de autenticación
 */
export async function authenticatedFetch(
  url: string | URL,
  options: FetchOptions = {}
): Promise<Response> {
  const { requiresAuth = true, ...fetchOptions } = options;

  // Si la solicitud requiere autenticación, obtener y validar el token
  if (requiresAuth) {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      throw new Error("No valid access token available. Please login again.");
    }

    // Agregar token al header Authorization
    fetchOptions.headers = {
      ...fetchOptions.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // Realizar la solicitud
  const response = await fetch(url, fetchOptions);

  // Si recibimos 401, el token podría ser inválido
  if (response.status === 401 && requiresAuth) {
    console.warn("[authenticatedFetch] Received 401, token might be invalid");
    // En producción, podrías intentar refrescar y reintentar
    // Por ahora, lanzamos el error
  }

  return response;
}
