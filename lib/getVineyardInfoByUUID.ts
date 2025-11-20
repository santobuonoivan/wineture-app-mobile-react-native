import { config } from "../config/env";
import {
  GetVineyardWinesParams,
  IVineyardInfoWithWinesResponse,
} from "../interfaces";

// Use the config instead of direct process.env access
const API_BASE_URL = config.API_BASE_URL;
const API_KEY = config.API_KEY;

export const getVineyardInfoByUUID = async (
  params: GetVineyardWinesParams
): Promise<IVineyardInfoWithWinesResponse> => {
  const { uuid } = params;
  const url = new URL(`${API_BASE_URL}/vineyards/findByUUID/${uuid}`);

  try {
    // Realiza la solicitud GET a la API backend utilizando fetch
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "HTTP-X-API-KEY": API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching vineyard reviews statistic: ${error}`);
    return { status: 500, data: {} };
  }
};
