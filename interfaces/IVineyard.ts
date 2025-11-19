interface ILocation {
  /** Identificador único de la ubicación. */
  id: number;
  /** Latitud geográfica de la ubicación. */
  lat: number;
  /** Longitud geográfica de la ubicación. */
  long: number;
  /** Nombre o descripción de la ubicación (ej: "Valle de Casablanca"). */
  location: string;
}

interface IImage {
  /** Identificador único de la imagen. */
  id: number;
  /** URL de la imagen. */
  url: string;
}

export interface IVineyard {
  /** Identificador único global de la viña (UUID). */
  uuid: string;
  /** Identificador numérico de la viña. */
  vineyardId: number;
  /** Nombre de la viña (ej: "Villard Fine Wines"). */
  vineyardName: string;
  /** Descripción detallada de la viña. */
  description: string;
  /** URL de la imagen o logo principal de la viña. */
  img: string;
  /** Array de objetos que representan las distintas ubicaciones de la viña. */
  locations: ILocation[];
  /** Array de objetos que representan las imágenes asociadas a la viña. */
  images: IImage[];
  /** Latitud principal o de referencia de la viña. */
  lat: number;
  /** Longitud principal o de referencia de la viña. */
  long: number;
}

export interface IVineyardResponse {
  /** Array principal que contiene los datos de las viñas. */
  data: IVineyard[];
  /** Cantidad total de elementos en el array 'data'. */
  total: number;
}
