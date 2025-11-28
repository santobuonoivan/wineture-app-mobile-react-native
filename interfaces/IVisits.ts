// Interface para la respuesta de visitas del usuario
export interface IUserVisitsResponse {
  data: IVisit[];
  status: number;
  total: number;
}

// Interface principal para una visita
export interface IVisit {
  visitId: number;
  userId: number;
  vineyardId: number;
  tourId: number;
  hasReview: boolean;
  needCheckOut: boolean;
  countryISO: string;
  currencyISO: string;
  couponCode: string | null;
  discountApplied: string;
  tax: string;
  isInternational: boolean;
  isCommissionable: boolean;
  visitSlot: number;
  deletedAt: string | null;
  token: string;
  comission: string;
  uuid: string;
  status: string;
  payments: IVisitPayment[];
  vineyard: IVisitVineyard;
  user: IVisitUser;
  tour: IVisitTour;
  people: IVisitPerson[];
}

// Interface para los pagos de la visita
export interface IVisitPayment {
  // Estructura por definir cuando se obtenga información de los pagos
  [key: string]: any;
}

// Interface para la persona en una visita
export interface IVisitPerson {
  // Estructura por definir cuando se obtenga información de personas
  [key: string]: any;
}

// Interface para el viñedo en una visita
export interface IVisitVineyard {
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
  locations: IVisitVineyardLocation[];
}

// Interface para las ubicaciones del viñedo
export interface IVisitVineyardLocation {
  vineyardsLocationId: number;
  vineyardId: number;
  active: boolean;
  location: string;
  country: string;
  lat: string;
  long: string;
}

// Interface para el usuario en una visita
export interface IVisitUser {
  userId: number;
  keycloakId: string | null;
  status: string;
  firstname: string;
  secondname: string | null;
  firstsurname: string;
  secondsurname: string | null;
  email: string;
  img: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  changePassword: boolean;
}

// Interface para el tour en una visita
export interface IVisitTour {
  tourId: number;
  tourTime: string;
  dayId: number;
  price: string;
  includes: string | null;
  availableSpots: number;
  reservedSpots: number;
  active: boolean;
  day: IVisitDay;
}

// Interface para el día del tour
export interface IVisitDay {
  dayId: number;
  date: string;
  active: boolean;
}

// Union types para los estados de visita
export type VisitStatus = "SCHEDULED" | "VISITED" | "CANCELLED" | "CONFIRMED";

// Union types para países ISO
export type CountryISO =
  | "US"
  | "CL"
  | "AR"
  | "MX"
  | "ES"
  | "FR"
  | "IT"
  | "CA"
  | string;

// Union types para monedas ISO
export type CurrencyISO =
  | "USD"
  | "CLP"
  | "ARS"
  | "MXN"
  | "EUR"
  | "CAD"
  | string;
