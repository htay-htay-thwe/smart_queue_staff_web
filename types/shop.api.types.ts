// shop.api.types.ts

export interface RegisterShopRequest {
  name: string;
  email: string;
  phoneNumber: string;
  shopTypeId: string;
  password: string;
  description: string;
  tableTypes: {
    type: "2-seat" | "4-seat" | "6-seat";
    capacity: number;
  }[];
  fullAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  shop_img: File ;
}

export interface RegisterShopData {
  name: string;
  email: string;
  phoneNumber: string;
  shopTypeId: string;
  description: string;
  tableTypes: {
    type: "2-seat" | "4-seat" | "6-seat";
    capacity: number;
  }[];
  fullAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  shop_img: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}