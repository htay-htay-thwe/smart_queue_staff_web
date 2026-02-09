"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle2, Send } from "lucide-react";
import OTPVerificationDialog from "@/app/auth/register/stepOne/card/OTPVerificationDialog";
import { toast } from "sonner";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendCode = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
      });
      return;
    }
    setShowOTPDialog(true);
  };

  const handleVerifySuccess = () => {
    setIsEmailVerified(true);
    setStep("reset");
    toast.success("Email verified! Now set your new password", {
      position: "bottom-right",
    });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters", {
        position: "bottom-right",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "bottom-right",
      });
      return;
    }

    toast.success("Password reset successfully!", {
      position: "bottom-right",
    });

    setTimeout(() => {
      router.push("/auth/loginPage");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12">
        {/* Back to Login Button */}
        <div className="mb-6 animate-fade-in">
          <Link href="/auth/loginPage">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-[#157aa2] border-[#157aa2] hover:bg-[#157aa2] hover:text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Button>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 animate-fade-in-delay-1">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-linear-to-br from-[#157aa2] to-[#1C7AA5] rounded-full flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {step === "email" ? "Forgot Password?" : "Reset Password"}
            </h1>
            <p className="text-gray-600 text-sm">
              {step === "email"
                ? "Enter your email to receive a verification code"
                : "Create a new password for your account"}
            </p>
          </div>

          {/* Step 1: Email Verification */}
          {step === "email" && (
            <div className="space-y-6 animate-fade-in">
              <Field>
                <Label htmlFor="email" className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#157aa2]" />
                  Email Address
                  {isEmailVerified && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="h-14 rounded-xl border-2 border-gray-200 px-4 text-base
                           focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                           transition-all duration-300 hover:border-gray-300"
                />
              </Field>

              <Button
                onClick={handleSendCode}
                disabled={!email || !email.includes("@")}
                className="w-full h-14 bg-linear-to-r from-[#157aa2] to-[#1C7AA5] hover:from-[#1C7AA5] hover:to-[#157aa2] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Verification Code
              </Button>

              <OTPVerificationDialog
                open={showOTPDialog}
                onOpenChange={setShowOTPDialog}
                type="email"
                value={email}
                onVerifySuccess={handleVerifySuccess}
              />
            </div>
          )}

          {/* Step 2: Reset Password */}
          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-6 animate-fade-in-delay-1">
              {/* Email Display (Verified) */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs font-medium text-gray-600">Verified Email</p>
                  <p className="text-sm font-semibold text-gray-900">{email}</p>
                </div>
              </div>

              {/* New Password */}
              <Field>
                <Label htmlFor="new-password" className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#157aa2]" />
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                    className="h-14 rounded-xl border-2 border-gray-200 px-4 pr-12 text-base
                             focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                             transition-all duration-300 hover:border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#157aa2] transition-colors duration-200"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </Field>

              {/* Confirm Password */}
              <Field>
                <Label htmlFor="confirm-password" className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#157aa2]" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="h-14 rounded-xl border-2 border-gray-200 px-4 pr-12 text-base
                             focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                             transition-all duration-300 hover:border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#157aa2] transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </Field>

              {/* Password Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8 ? "bg-green-500" : "bg-gray-400"}`}></div>
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${newPassword === confirmPassword && newPassword ? "bg-green-500" : "bg-gray-400"}`}></div>
                    Passwords match
                  </li>
                </ul>
              </div>

              {/* Reset Button */}
              <Button
                type="submit"
                disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 8}
                className="w-full h-14 bg-linear-to-r from-[#157aa2] to-[#1C7AA5] hover:from-[#1C7AA5] hover:to-[#157aa2] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
