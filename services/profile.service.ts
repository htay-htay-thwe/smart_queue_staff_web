import { api } from "@/lib/api";
import { getAuthCookie } from "@/lib/cookies";
import { ProfileUpdateRequest } from "@/types/shopQueue.api.types";

export const changeShopName = async ({
  shop_id,
  shopTitle,
}: {
  shop_id: string;
  shopTitle: string;
}) => {
  console.log("Fetching queue for shopId:", shop_id);
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.patch(
    `shops/change-shopName`,
    { shop_id, shopTitle },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const changeShopEmail = async ({
  oldEmail,
  newEmail,
}: {
  oldEmail: string;
  newEmail: string;
}) => {
  console.log("Changing shop email from", oldEmail, "to", newEmail);
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.patch(
    `shops/change-email`,
    { oldEmail, newEmail },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const changeShopPhoneNumber = async ({
  oldPhoneNumber,
  newPhoneNumber,
}: {
  oldPhoneNumber: string;
  newPhoneNumber: string;
}) => {
  console.log(
    "Changing shop phone number from",
    oldPhoneNumber,
    "to",
    newPhoneNumber,
  );
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.patch(
    `shops/change-phone-number`,
    { oldPhoneNumber, newPhoneNumber },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const changeShopPassword = async ({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) => {
  console.log("Changing shop password for email", email, "to new password");
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.patch(
    `shops/change-password`,
    { email, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const changeShopAddress = async ({
  shop_id,
  fullAddress,
  lat,
  lng,
}: {
  shop_id: string;
  fullAddress: string;
  lat: number;
  lng: number;
}) => {
  console.log(
    "Changing shop address for shop_id",
    shop_id,
    "to new address",
    fullAddress,
    "with coordinates",
    lat,
    lng,
  );
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.patch(
    `shops/change-address`,
    {
      shop_id,
      fullAddress,
      lat,
      lng,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const changeShopInformation = async ({
  shop_id,
  shopTypeId,
  description,
  tableTwo,
  tableFour,
  tableSix,
}: {
  shop_id: string;
  shopTypeId: string;
  description: string;
  tableTwo: number;
  tableFour: number;
  tableSix: number;
}) => {
  console.log(
    "Changing shop information for shop_id",
    shop_id,
    "with new information",
    { shopTypeId, description, tableTwo, tableFour, tableSix },
  );
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.patch(
    `shops/change-shop-information`,
    {
      shop_id,
      shopTypeId,
      description,
      tableTwo,
      tableFour,
      tableSix,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const changeProfileImage = async (data: ProfileUpdateRequest) => {
  console.log(
    "Changing shop profile image for shop_id",
    data.shop_id,
    "with new image",
    data.shop_image,
  );
  const formData = new FormData();
  formData.append("shop_id", data.shop_id);
  formData.append("image", data.shop_image);
  const token = await getAuthCookie();
  console.log("token", token);
  const res = await api.patch(`shops/change-profileImage`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
