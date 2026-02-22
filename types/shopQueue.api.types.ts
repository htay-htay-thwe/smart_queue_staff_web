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
  shop_img: File;
}

export interface ShopData {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  shopImg: string;
  description: string;
  address: {
    location: {
      type: "Point";
      coordinates: [number, number];
    };
    fullAddress: string;
    _id: string;
  };
  shopTypes: {
    _id: string;
    shopTypeName: string;
    __v: number;
  };
  tableTypes: {
    _id: string;
    type: "2-seat" | "4-seat" | "6-seat";
    capacity: number;
    shopId: string;
    __v: number;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type QueueStatus = "Ready to seat" | "waiting" | "canceled";

export interface Customer {
  _id: string;
  name: string;
  email: string | null;
  phoneNumber: string | null;
  profileImg?: string;
  isVerified: boolean;
  __v: number;
}

export interface Queue {
  _id: string;
  queue_number: number;
  status: QueueStatus;
  estimated_wait_time: number;
  notification_sent: boolean;
  queue_qr: string | null;
  table_no: string | null;
  table_type_id: string;
  userRequirements: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  customer_id: Customer;
  shop_id: ShopData;
}
