"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Mail, Phone, CheckCircle2, XCircle } from "lucide-react";
import { useOtpSendToEmail, useOtpVerifyToEmail } from "@/hooks/useRegister";

interface OTPVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "email" | "phone";
  value: string;
  onVerifySuccess: () => void;
  email: string;
}

export default function OTPVerificationDialog({
  open,
  onOpenChange,
  type,
  value,
  onVerifySuccess,
  email,
}: OTPVerificationDialogProps) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const otpToEmail = useOtpSendToEmail();
  // Countdown timer
  useEffect(() => {
    if (open && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [open, timer]);

  // Reset on open
  useEffect(() => {
    if (open) {
      setOtp("");
      setError("");
      setTimer(60);
      setCanResend(false);
    }
  }, [open]);

  const otpVerifyToEmail = useOtpVerifyToEmail();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    otpVerifyToEmail.mutate(email,otp)

    setIsVerifying(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo: correct OTP is "123456"
    if (otp === "123456") {
      onVerifySuccess();
      onOpenChange(false);
    } else {
      setError("Invalid verification code. Please try again.");
      setOtp("");
    }

    setIsVerifying(false);
  };

  const handleResend = async () => {
    setTimer(60);
    setCanResend(false);
    setOtp("");
    setError("");
    otpToEmail.mutate(email);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                type === "email" ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              {type === "email" ? (
                <Mail className="w-8 h-8 text-blue-600" />
              ) : (
                <Phone className="w-8 h-8 text-green-600" />
              )}
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Verify Your {type === "email" ? "Email" : "Phone Number"}
          </DialogTitle>
          <DialogDescription className="text-center">
            We've sent a 6-digit code to
            <br />
            <span className="font-semibold text-gray-900">{value}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* OTP Input */}
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value: string) => {
                setOtp(value);
                setError("");
              }}
              onComplete={handleVerify}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm justify-center animate-fade-in">
              <XCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Timer / Resend */}
          <div className="text-center text-sm text-gray-600">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-[#157aa2] font-semibold hover:underline"
              >
                Resend Code
              </button>
            ) : (
              <span>
                Resend code in <strong>{timer}s</strong>
              </span>
            )}
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            className="w-full h-12 bg-linear-to-r from-[#157aa2] to-[#1C7AA5] hover:from-[#1C7AA5] hover:to-[#157aa2] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify Code"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
