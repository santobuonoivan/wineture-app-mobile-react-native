import { config } from "../config/env";

// Use the config instead of direct process.env access
const API_BASE_URL = config.API_BASE_URL;
const API_KEY = config.API_KEY;

interface GetVineyardWinesParams {
  vineyardId: number;
}

interface IVineyardWinesResponse {
  status: number;
  data: {
    wineId: number;
    wineBrand: string;
    wineCategory: string;
    wineName: string;
    wineBarCode: string | null;
    alcoholContent: string;
    monthsInBarrel: string;
    strain: string;
    valley: string;
    image: string;
    description: string;
    promoDescription: string | null;
    deletedAt: null;
    status: string;
    createdAt: string;
    updatedAt: string;
    vineyardId: number;
    price: string;
  }[];
}

export const getWinesInfoByVineyard = async (
  params: GetVineyardWinesParams
): Promise<IVineyardWinesResponse> => {
  const { vineyardId } = params;
  const url = new URL(`${API_BASE_URL}/wines/vineyards/${vineyardId}`);

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
    return { status: response.status, data: data };
  } catch (error) {
    console.error(`Error fetching vineyard reviews statistic: ${error}`);
    return { status: 500, data: [] };
  }
};
