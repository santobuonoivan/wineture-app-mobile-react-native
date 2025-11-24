export interface ILocation {
  vineyardsLocationId: number;
  vineyardId: number;
  active: boolean;
  location: string;
  country: string;
  lat: string;
  long: string;
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

export interface GetVineyardWinesParams {
  uuid: string;
}

export interface GetVineyardCalendarParams {
  vineyardId: number;
}

export interface IVineyardInfoWithWinesData {
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
  images: IImage[];
  wines: IWine[];
  locations: ILocation[];
  socialNetworks: ISocialNetwork[];
}

export interface IWine {
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
}
export interface ISocialNetwork {
  socialNetworkId: number;
  vineyardId: number;
  website: string | null;
  instagram: string | null;
  deletedAt: string | null;
  facebook: string | null;
  twitter: string | null;
  tiktok: string | null;
}

export interface IVineyardInfoWithWinesResponse {
  status: number;
  data: IVineyardInfoWithWinesData;
}

export interface IVineyardInfoWithServicesResponse {
  status: number;
  data: IVineyardService[];
}

export interface IVineyardService {
  serviceId: number;
  active: boolean;
  name: string;
  description: string;
  img: string;
  price: string;
  link: string;
  vineyard: {
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
    descriptionEN: string | null;
    additionalInfoEN: string | null;
    createdAt: string;
    updatedAt: string;
  };
  serviceType: {
    serviceTypeId: number;
    active: boolean;
    name: string;
  };
}
