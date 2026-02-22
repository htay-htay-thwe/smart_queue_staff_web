"use client";
import { clearAuthCookie, setAuthCookie } from "@/lib/cookies";
import {
  fetchShopTypes,
  loginShop,
  registerShop,
  sendOtpToEmail,
  sendOtpToPhoneNumber,
  verifyOtpToEmail,
  verifyOtpToPhoneNumber,
} from "@/services/auth.service";
import { useRegisterStore } from "@/store/authStore";
import { useShopStore } from "@/store/shopStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useOtpSendToPhoneNumber = () => {
  return useMutation({
    mutationFn: sendOtpToPhoneNumber,
    onSuccess: () => {
      toast.success("Otp successfully sent to Your phoneNumber!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to send OTP", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
    },
  });
};

export const useOtpVerifyToPhoneNumber = () => {
  return useMutation({
    mutationFn: verifyOtpToPhoneNumber,
    onSuccess: (data) => {
      toast.success(data.data.message, {
        position: "top-right",
        style: {
          color: "green",
        },
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to verify OTP", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
    },
  });
};

export const useOtpSendToEmail = () => {
  return useMutation({
    mutationFn: sendOtpToEmail,
    onSuccess: () => {
      toast.success("Otp successfully sent to Your Email!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to send OTP", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
    },
  });
};

export const useOtpVerifyToEmail = () => {
  return useMutation({
    mutationFn: verifyOtpToEmail,
    onSuccess: (data) => {
      toast.success(data.data.message, {
        position: "top-right",
        style: {
          color: "green",
        },
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to verify OTP", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
    },
  });
};

export const useFetchShopTypes = () => {
  return useQuery({
    queryKey: ["shopTypes"],
    queryFn: fetchShopTypes,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 1,
  });
};

export const useRegisterShop = (router: ReturnType<typeof useRouter>) => {
  return useMutation({
    mutationFn: registerShop,
    onSuccess: (data) => {
      toast.success("Shop Account registered successfully!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
      console.log("user data", data.data);
      useRegisterStore.getState().reset();
      useShopStore.getState().setShop(data.data.shop);
      setAuthCookie(data.data.token);
      router.push("/dashboard/dashboard");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to register shop", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
    },
  });
};

export const useLoginShop = (router: ReturnType<typeof useRouter>) => {
  return useMutation({
    mutationFn: loginShop,
    onSuccess: (data) => {
      toast.success("Logged in successfully!", {
        position: "top-right",
        style: {
          color: "green",
        },
      });
      useShopStore.getState().setShop(data.data.shop);
      setAuthCookie(data.data.token);
      router.push("/dashboard/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to log in", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
    },
  });
};
