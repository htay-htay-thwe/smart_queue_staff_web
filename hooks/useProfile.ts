import {
  changeShopAddress,
  changeShopEmail,
  changeShopName,
  changeShopPassword,
  changeShopPhoneNumber,
} from "@/services/profile.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChangeShopName = () => {
  return useMutation({
    mutationFn: changeShopName,
    onSuccess: () => {
      toast.success("Shop name changed successfully!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to change shop name",
        {
          position: "top-right",
          style: {
            color: "red",
          },
        },
      );
    },
  });
};

export const useChangeEmail = () => {
  return useMutation({
    mutationFn: changeShopEmail,
    onSuccess: () => {
      toast.success("Email changed successfully!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to change email", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
    },
  });
};

export const useChangePhoneNumber = () => {
  return useMutation({
    mutationFn: changeShopPhoneNumber,
    onSuccess: () => {
      toast.success("Phone number changed successfully!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to change phone number",
        {
          position: "top-right",
          style: {
            color: "red",
          },
        },
      );
    },
  });
};

export const useChangeShopPassword = () => {
  return useMutation({
    mutationFn: changeShopPassword,
    onSuccess: () => {
      toast.success("Password changed successfully!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to change password",
        {
          position: "top-right",
          style: {
            color: "red",
          },
        },
      );
    },
  });
};

export const useChangeAddress = () => {
  return useMutation({
    mutationFn: changeShopAddress,

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to change address",
        {
          position: "top-right",
          style: {
            color: "red",
          },
        },
      );
    },
  });
};
