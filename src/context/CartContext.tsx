"use client";
import { getCart } from "@/lib/api";
import { IProduct } from "@/type";
import Cookies from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ICart {
  product: IProduct;
  quantity: number;
}

interface CartContextType {
  cart: ICart[] | [];
  setCart: (cart: ICart[]) => void;
  countCart: number;
  setCountCart: (count: number) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  countCart: 0,
  setCountCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ICart[]>([]);
  const [countCart, setCountCart] = useState(0);
  // load token & user on mount
  useEffect(() => {
    const t = Cookies.get("userToken");
    if (t) {
      // fetch current user profile
      getCart(t)
        .then((data) => {
          console.log("Cart data", data);
          const customData = data.metadata.map((item: ICart) => {
            return {
              product: item.product,
              quantity: item.quantity,
            };
          });
          setCart(customData);
          const totalQuantity = customData.reduce(
            (sum: number, item: ICart) => sum + item.quantity,
            0
          );
          setCountCart(totalQuantity);
        })
        .catch(() => {
          Cookies.remove("userToken");
        });
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, countCart, setCountCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
