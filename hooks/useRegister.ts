import { sendOtpToEmail, verifyOtpToEmail } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useOtpSendToEmail = () => {
  return useMutation({
    mutationFn: sendOtpToEmail,
    onSuccess: (data) => {
      toast.success(data.message);
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
      toast.success(data.message);
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

