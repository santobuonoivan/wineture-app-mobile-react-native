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
}

export interface IOrderItem {
  orderItemId: number;
  wineId: number;
  orderId: number;
  quantity: number;
  amount: string;
  wine: IWine;
}
