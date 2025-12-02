import { config } from "../config/env";
import { IUserVisitsResponse } from "../interfaces";
import { getValidAccessToken } from "../auth";

// Use the config instead of direct process.env access
const API_BASE_URL = config.API_BASE_URL;
const API_KEY = config.API_KEY;

export const getVisitsByUser = async (params: {
  id: number;
}): Promise<IUserVisitsResponse> => {
  const { id } = params;
  const url = new URL(
    `${API_BASE_URL}/visits/users/${id}?page=1&pageSize=5&searchData={}&sorterData={}`
  );

  try {
    // Obtener token válido (refresca automáticamente si es necesario)
    const accessToken = await getValidAccessToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "HTTP-X-API-KEY": API_KEY,
    };

    // Si hay un token válido, agregarlo también
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
    });

    const { data, total } = await response.json();
    return { status: response.status, data, total };
  } catch (error) {
    console.error(`Error fetching visits by user: ${error}`);
    throw error;
  }
};
