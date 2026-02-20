import { api } from "@/lib/api";

export const sendOtpToPhone = async () => {
  console.log("api", api);
  const res = await api.post("/shops/send-phone-otp");
  console.log(res);
  return res;
};

export const sendOtpToEmail = async (email: string) => {
  console.log("email", email);
  const res = await api.post("/shops/send-email-otp", { email });
  console.log(res);
  return res.data;
};

export const verifyOtpToEmail = async (email: string, otp: string) => {
  const res = await api.post("/shops/verify-email-otp", { email, otp });
  console.log(res);
  return res.data;
};
