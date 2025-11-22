import { create } from "zustand";
import { CartItemI } from "../interfaces/ICart";

interface CartState {
  items: CartItemI[];
  subtotal: number;
  shipping: number;
  total: number;
  increment: (itemId: number) => void;
  decrement: (itemId: number) => void;
  removeItem: (itemId: number) => void;
}

const initialItems: CartItemI[] = [
  {
    itemId: 1,
    wineId: 1,
    cartId: 1,
    quantity: 1,
    wine: {
      wineBrand: "Bodega del Valle",
      wineCategory: "Tinto",
      wineName: "Reserva Malbec 2018",
      wineBarCode: "1234567890",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCh5ldELJFMtj-xszDDwNnjXw0XSLdBJe_yjBJWaLvuBgUYMKQqouW7z573DorZi1z31FS8abvCHE2efJkYKVa6DStPETaYH09kB9JfvWnSLkxOIDbIAYiLcQRiUVTSgHzGoZdTaEWepgO9xswDHVAiczB1i8xZs4PV3KbdigUCVavXcZaV1sVK-nAkJtClRcpccuCiV9o3PVn6oiV127eyZ5Y0dRy6Ym71eejeZTLS37W4sDbjUhZfKShI4SbjMfUUabSbmTIPIU",
      description: "Un Malbec intenso con notas a frutos rojos.",
      deletedAt: null,
      status: "active",
      createdAt: "",
      updatedAt: "",
      wineId: 1,
      vineyardId: 1,
      price: 45,
    },
  },
  {
    itemId: 2,
    wineId: 2,
    cartId: 1,
    quantity: 2,
    wine: {
      wineBrand: "Bodega del Valle",
      wineCategory: "Tinto",
      wineName: "Cabernet Sauvignon Gran Reserva 2019",
      wineBarCode: "0987654321",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBUdPiBf_0Ezq5FKROeFIaFV2prA-LtxQmyk716p5w_0htQP81FDE3vy-69OfHdkyOWVrvJgI02uAzENUziSFUgoduTcey_0z0mYykOPOagTZE5S3rFas42va506xY_zn9Zk20zfhGY1rq9UFLZXm55Jza8KqGodM1mZfeem9ji6_Za7Hmz12CjWdP119cFCgIgUAr7DElYyAALhYpBjf18P_MCPQuFWvUqrEodGDTFs5hPkogzbGu6zHLmbQtVWb2RpKR7tyo_tYA",
      description: "Cabernet estructurado con notas a madera y especias.",
      deletedAt: null,
      status: "active",
      createdAt: "",
      updatedAt: "",
      wineId: 2,
      vineyardId: 1,
      price: 55,
    },
  },
  {
    itemId: 3,
    wineId: 3,
    cartId: 1,
    quantity: 1,
    wine: {
      wineBrand: "Bodega del Valle",
      wineCategory: "Rosé",
      wineName: "Rosé 2021",
      wineBarCode: "1122334455",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBN2ebYr1__nb8FV2uN0Gl58zrflHb2ZY-QjInmO2yYfqutplaIRKSUKukzwKr3YWiZWD0Y6qpYoyfq4p-Krp_rmxOCkL8yP0ynwerFN1kBCkLgWMEyqqmtPwYePUC1tlXzRcj1ASYmt7gXX2GnOL_CPJ4oddVUYIPLpGjQSu-Y0voH2A6v_1Am74F8EFGX_6boL3uw0hgM0IeMXk02FM4jfy7qBqRXhRjJBS-EyBoNzVpCkpt1u86JU3zh92rQfdBlIfYK2gWXSXA",
      description: "Rosado fresco y frutal, ideal para verano.",
      deletedAt: null,
      status: "active",
      createdAt: "",
      updatedAt: "",
      wineId: 3,
      vineyardId: 1,
      price: 38,
    },
  },
];

const calcSubtotal = (items: CartItemI[]) =>
  items.reduce((sum, item) => sum + item.wine.price * item.quantity, 0);

export const useCartStore = create<CartState>((set) => ({
  items: initialItems,
  shipping: 10,
  subtotal: calcSubtotal(initialItems),
  total: calcSubtotal(initialItems) + 10,
  increment: (itemId: number) =>
    set((state) => {
      const items = state.items.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const subtotal = calcSubtotal(items);
      const total = subtotal + state.shipping;
      return { items, subtotal, total };
    }),
  decrement: (itemId: number) =>
    set((state) => {
      const items = state.items
        .map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);
      const subtotal = calcSubtotal(items);
      const total = subtotal + state.shipping;
      return { items, subtotal, total };
    }),
  removeItem: (itemId: number) =>
    set((state) => {
      const items = state.items.filter((item) => item.itemId !== itemId);
      const subtotal = calcSubtotal(items);
      const total = subtotal + state.shipping;
      return { items, subtotal, total };
    }),
}));
