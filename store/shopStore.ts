import { RegisterShopData, RegisterShopRequest } from "@/types/shop.api.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const isDev = process.env.NODE_ENV === "development";

type ShopRegisterStore = {
  shop: RegisterShopData;
  setShop: (data: Partial<RegisterShopData>) => void;
  reset: () => void;
};

const initialShop: RegisterShopData = {
  name: "",
  email: "",
  phoneNumber: "",
  shopTypeId: "",
  description: "",
  tableTypes: [
    { type: "2-seat", capacity: 0 },
    { type: "4-seat", capacity: 0 },
    { type: "6-seat", capacity: 0 },
  ],
  fullAddress: "",
  location: {
    lat: 0,
    lng: 0,
  },
  shop_img: "",
  createdAt: "",
  updatedAt: "",
  _id: "",
};

export const useShopStore = create<ShopRegisterStore>()(
  (isDev ? devtools : (config: any) => config)(
    persist(
      (set) => ({
        shop: initialShop,

        setShop: (data: Partial<RegisterShopData>) =>
          set((state: { shop: RegisterShopData }) => ({
            shop: { ...state.shop, ...data },
          })),

        reset: () =>
          set({
            shop: initialShop,
          }),
      }),
      {
        name: "shopData-storage",
        partialize: (state: { shop: RegisterShopData }) => ({
          shop: {
            ...state.shop,
          },
        }),
      },
    ),
  ),
);
