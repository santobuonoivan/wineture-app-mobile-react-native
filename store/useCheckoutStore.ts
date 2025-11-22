import { create } from "zustand";

export interface OrderCheckoutData {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  saveAddress: boolean;
}

export interface PaymentData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardHolder: string;
  saveCard: boolean;
}

interface CheckoutState {
  shippingData: OrderCheckoutData | null;
  paymentData: PaymentData | null;
  setShippingData: (data: OrderCheckoutData) => void;
  setPaymentData: (data: PaymentData) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  shippingData: null,
  paymentData: null,
  setShippingData: (data) => set({ shippingData: data }),
  setPaymentData: (data) => set({ paymentData: data }),
  reset: () => set({ shippingData: null, paymentData: null }),
}));
