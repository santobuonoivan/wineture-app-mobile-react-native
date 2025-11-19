import { IVineyardResponse, IVineyard } from "../interfaces/IVineyard";

export const getVineyards = async (): Promise<IVineyard[]> => {
  const vineyards: IVineyardResponse = await fetch(
    "https://api.wineture.cl/api/v1/vineyards/findByGeo?lat=-35.4161&long=-69.6167&radius=653&currentPage=1&pageSize=20",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "HTTP-X-API-KEY": "EAB0A38835EBA59230EF98D8879DC2C198DF96AF",
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching vineyards:", error);
      return { data: [], total: 0 }; // Return an empty response on error
    });
  console.log("Fetched vineyards:", vineyards);
  return vineyards.data;
};
