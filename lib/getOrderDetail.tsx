import { config } from "../config/env";
import { IOrderRestponse } from "../interfaces";

// Use the config instead of direct process.env access
const API_BASE_URL = config.API_BASE_URL;
const API_KEY = config.API_KEY;

export const getOrderDetailByUUID = async (params: {
  uuid: string;
}): Promise<IOrderRestponse> => {
  const { uuid } = params;
  const url = new URL(`${API_BASE_URL}/orders/${uuid}`);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "HTTP-X-API-KEY": API_KEY,
      },
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error(`Error fetching vineyard reviews statistic: ${error}`);
    throw error;
  }
};
