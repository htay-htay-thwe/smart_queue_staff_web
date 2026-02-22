import { ShopData } from "@/types/shopQueue.api.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const isDev = process.env.NODE_ENV === "development";

type ShopRegisterStore = {
  shop: ShopData;
  setShop: (data: Partial<ShopData>) => void;
  reset: () => void;
};

const initialShop: ShopData = {
  _id: "",
  name: "",
  phoneNumber: "",
  email: "",
  shopImg: "",
  description: "",
  address: {
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    fullAddress: "",
    _id: "",
  },
  shopTypes: {
    _id: "",
    shopTypeName: "",
    __v: 0,
  },
  tableTypes: [
    { _id: "", type: "2-seat", capacity: 0, shopId: "", __v: 0 },
    { _id: "", type: "4-seat", capacity: 0, shopId: "", __v: 0 },
    { _id: "", type: "6-seat", capacity: 0, shopId: "", __v: 0 },
  ],
  createdAt: "",
  updatedAt: "",
  __v: 0,
};

export const useShopStore = create<ShopRegisterStore>()(
  (isDev ? devtools : (config: any) => config)(
    persist(
      (set) => ({
        shop: initialShop,

        setShop: (data: Partial<ShopData>) =>
          set((state: { shop: ShopData }) => ({
            shop: { ...state.shop, ...data },
          })),

        reset: () =>
          set({
            shop: initialShop,
          }),
      }),
      {
        name: "shopData-storage",
        partialize: (state: { shop: ShopData }) => ({
          shop: {
            ...state.shop,
          },
        }),
      },
    ),
  ),
);
