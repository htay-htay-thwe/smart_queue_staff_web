import { api } from "@/lib/api";
import { clearAuthCookie } from "@/lib/cookies";
import { useRegisterStore } from "@/store/authStore";
import { useShopStore } from "@/store/shopStore";
import {  RegisterShopRequest } from "@/types/shopQueue.api.types";
import { useRouter } from "next/navigation";

export const sendOtpToPhoneNumber = async (phoneNumber: string) => {
  const res = await api.post("/shops/send-phone-otp", { phoneNumber });
  console.log("sendOtpToPhoneNumber response", res.data);
  return res;
};

export const verifyOtpToPhoneNumber = async ({
  phoneNumber,
  otp,
}: {
  phoneNumber: string;
  otp: string;
}) => {
  const res = await api.post("/shops/verify-phone-otp", { phoneNumber, otp });
  return res.data;
};

export const sendOtpToEmail = async (email: string) => {
  const res = await api.post("/shops/send-email-otp", { email });
  console.log("sendOtpToEmail response", res.data);
  return res.data;
};

export const verifyOtpToEmail = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const res = await api.post("/shops/verify-email-otp", { email, otp });
  return res.data;
};

export const fetchShopTypes = async () => {
  const res = await api.get("/shop-types");
  return res.data;
};

export const registerShop = async (data: RegisterShopRequest) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("password", data.password);
  formData.append("description", data.description);
  formData.append("shopTypeId", data.shopTypeId);
  formData.append("fullAddress", data.fullAddress);
  formData.append("lat", String(data.location.lat));
  formData.append("lng", String(data.location.lng));
  formData.append(
    "tableTypes",
    data.tableTypes ? JSON.stringify(data.tableTypes) : "[]",
  );
  formData.append("shop_img", data.shop_img);

  const res = await api.post("/shops/register", formData);
  return res.data;
};

export const shopLogOut = (router: ReturnType<typeof useRouter>) => {
  return async () => {
    await clearAuthCookie();
    useRegisterStore.getState().reset();
    useShopStore.getState().reset();
    router.push("/auth/loginPage");
  };
};

export const loginShop = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/shops/login", { email, password });
  return res.data;
};

