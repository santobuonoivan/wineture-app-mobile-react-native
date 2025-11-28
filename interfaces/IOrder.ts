import { IWine } from "./IVineyard";

export interface IUserAddress {
  userAddressId: number;
  address: string;
  userId: number;
  country: string;
  postalCode: string;
  region: string;
  state: string;
  isDefault: boolean;
  deletedAt: null | string;
  province: string;
  phoneNumber: string;
}

export interface IOrderRestponse {
  status: number;
  data: IOrder;
}

export interface IOrder {
  orderId: number;
  orderDate: string;
  comission: string;
  discountApplied: string;
  tax: string;
  uuid: string;
  shippingCost: string;
  subTotalAmount: string;
  countryISO: string;
  currencyISO: string;
  totalAmount: string;
  userId: number;
  statusId: number;
  couponCode: null;
  shippingAddress: string;
  isInternational: boolean;
  isCommissionable: boolean;
  deletedAt: null | string;
  vineyardId: null | number;
  status: {
    statusId: number;
    statusName: string;
    color: string;
  };
  user: {
    userId: number;
    status: string;
    firstname: string;
    secondname: null | string;
    firstsurname: string;
    secondsurname: null | string;
    email: string;
    img: string;
    phone: string;
    userAddress: IUserAddress[];
  };
  orderItems: IOrderItem[];
  userAddress: IUserAddress;
  orderTrackings: IOrderTrackingItem[];
}

export interface IOrderTrackingItem {
  trackingId: number;
  trackingNumber: string;
  created_at: string;
  updated_at: string;
  status: {
    statusId: number;
    statusName: string;
    statusCode: string;
    nextStatusId: number | null;
  };
}

export interface IOrderItem {
  orderItemId: number;
  wineId: number;
  orderId: number;
  quantity: number;
  amount: string;
  wine: IWine;
}

// Interface for orders by user response
export interface IOrdersByUserResponse {
  data: IOrderSummary[];
  total: number;
  status: number;
}

// Interface for order summary in the orders by user response
export interface IOrderSummary {
  orderId: number;
  orderDate: string;
  comission: string;
  discountApplied: string;
  tax: string;
  uuid: string;
  shippingCost: string;
  subTotalAmount: string;
  countryISO: string;
  currencyISO: string;
  totalAmount: string;
  userId: number;
  statusId: number;
  couponCode: string | null;
  shippingAddress: string;
  isInternational: boolean;
  isCommissionable: boolean;
  deletedAt: string | null;
  vineyardId: number | null;
  user: IOrderUser;
  status: IOrderStatus;
  payments: IOrderPayment[];
  vineyard: IOrderVineyard | null;
}

// Interface for user in order summary
export interface IOrderUser {
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

// Interface for order status
export interface IOrderStatus {
  statusId: number;
  statusName: string;
  color: string;
}

// Interface for order payments
export interface IOrderPayment {
  // Structure can be extended when payment data is available
  [key: string]: any;
}

// Interface for vineyard in order summary
export interface IOrderVineyard {
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
}
