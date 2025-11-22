export interface CartItemI {
  itemId: number;
  wineId: number;
  cartId: number;
  quantity: number;
  wine: {
    wineBrand: string;
    wineCategory: string;
    wineName: string;
    wineBarCode: string;
    image: string;
    description: string;
    deletedAt: Date | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    wineId: number;
    vineyardId: number;
    price: number;
  };
}
