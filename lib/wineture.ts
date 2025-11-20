import { IVineyardResponse, IVineyard } from "../interfaces/IVineyard";
import { config } from "../config/env";

// Use the config instead of direct process.env access
const API_BASE_URL = config.API_BASE_URL;
const API_KEY = config.API_KEY;

interface GetVineyardsParams {
  lat?: number;
  long?: number;
  radius?: number;
  currentPage?: number;
  pageSize?: number;
}

export const getVineyards = async (
  params: GetVineyardsParams = {}
): Promise<IVineyard[]> => {
  const {
    lat = -35.4161,
    long = -69.6167,
    radius = 2653,
    currentPage = 1,
    pageSize = 20,
  } = params;

  const url = new URL(`${API_BASE_URL}/vineyards/findByGeo`);
  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("long", long.toString());
  url.searchParams.set("radius", radius.toString());
  url.searchParams.set("currentPage", currentPage.toString());
  url.searchParams.set("pageSize", pageSize.toString());

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "HTTP-X-API-KEY": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const vineyards: IVineyardResponse = await response.json();

    // Validate response structure
    if (!vineyards || !Array.isArray(vineyards.data)) {
      throw new Error("Invalid response format");
    }

    return vineyards.data;
  } catch (error) {
    // Return empty array instead of throwing to prevent app crashes
    // In production, you might want to throw specific errors for different scenarios
    return [];
  }
};
