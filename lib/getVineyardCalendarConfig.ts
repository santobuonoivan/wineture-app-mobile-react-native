import { config } from "../config/env";
import { GetVineyardCalendarParams } from "../interfaces";

const API_BASE_URL = config.API_BASE_URL;
const API_KEY = config.API_KEY;

export const getVineyardCalendarConfig = async (
  params: GetVineyardCalendarParams
): Promise<any> => {
  const { vineyardId } = params;
  const url = `${API_BASE_URL}/vineyards/${vineyardId}/calendars`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "HTTP-X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json().catch(() => null);

    if (response.ok) {
      return { status: response.status, data };
    } else {
      return {
        status: response.status,
        error: data?.message || response.statusText || "Unknown error",
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: `Fetch error: ${error}`,
    };
  }
};
