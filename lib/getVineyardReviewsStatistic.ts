import { config } from "../config/env";

// Use the config instead of direct process.env access
const API_BASE_URL = config.API_BASE_URL;
const API_KEY = config.API_KEY;

interface GetVineyardsReviewParams {
  vineyardId: number;
}

interface IVineyardReviewStatisticResponse {
  status: number;
  data: {
    count: number;
    rating: number;
  };
}

export const getVineyardReviewsStatistic = async (
  params: GetVineyardsReviewParams
): Promise<IVineyardReviewStatisticResponse> => {
  const { vineyardId } = params;
  const url = new URL(
    `${API_BASE_URL}/reviews/vineyards/${vineyardId}/statistics`
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching vineyard reviews statistic: ${error}`);
    return { status: 500, data: { count: 0, rating: 0 } };
  }
};
