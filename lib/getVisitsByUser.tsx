import { config } from "../config/env";
import { IUserVisitsResponse } from "../interfaces";

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
    // Realiza la solicitud GET a la API backend utilizando fetch
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "HTTP-X-API-KEY": API_KEY,
      },
    });
    const { data, total } = await response.json();
    return { status: response.status, data, total };
  } catch (error) {
    console.error(`Error fetching vineyard reviews statistic: ${error}`);
    throw error;
  }
};
