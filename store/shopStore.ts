import { create } from "zustand";

type ShopRegData = {
  name: string;
  fullAddress: string;
  lat: string;
  lng: string;
  phoneNumber: number;
  email: string;
  password: string;
  description: string;
  shop_img: string;
};

type ShopStore = {
  shop: ShopRegData;
  setShop: (data: Partial<ShopRegData>) => void;
  reset: () => void;
};

export const useShopStore = create<ShopStore>((set) => ({
  shop: {
    name: "",
    fullAddress: "",
    lat: "",
    lng: "",
    phoneNumber: 0,
    email: "",
    password: "",
    description: "",
    shop_img: "",
  },

  setShop: (data) =>
    set((state) => ({
      shop: { ...state.shop, ...data },
    })),

  reset: () =>
    set({
      shop: {
        name: "",
        fullAddress: "",
        lat: "",
        lng: "",
        phoneNumber: 0,
        email: "",
        password: "",
        description: "",
        shop_img: "",
      },
    }),
}));
