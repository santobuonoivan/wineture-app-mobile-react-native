import { config } from "../config/env";

// Use the config instead of direct process.env access
const API_BASE_URL = config.API_BASE_URL;
const API_KEY = config.API_KEY;

interface GetVineyardWinesParams {
  uuid: string;
}

interface IVineyardWinesResponse {
  status: number;
  data:
    | {
        vineyardId: number;
        uuid: string;
        deletedAt: string | null;
        statusId: number;
        active: boolean;
        vineyardName: string;
        email: string;
        phone: string;
        img: string;
        description: string;
        additionalInfo: string;
        descriptionEN: string;
        additionalInfoEN: string;
        createdAt: string;
        updatedAt: string;
        wines: {
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
          promoDescription: string;
          deletedAt: string | null;
          status: string;
          createdAt: string;
          updatedAt: string;
          vineyardId: number;
          price: string;
        }[];
      }
    | {};
}

export const getVineyardInfoByUUID = async (
  params: GetVineyardWinesParams
): Promise<IVineyardWinesResponse> => {
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
