"use client";

import { useState } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { StepIndicator } from "../StepIndicator";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import ShopNameField from "./card/ShopNameField";
import EmailField from "./card/EmailField";
import PhoneNumberField from "./card/PhoneNumberField";
import OTPVerificationDialog from "./card/OTPVerificationDialog";
import Link from "next/link";
import { useRegisterStore } from "@/store/authStore";
import {
  useOtpSendToEmail,
  useOtpSendToPhoneNumber,
} from "@/hooks/useRegister";
import PasswordCreate from "./card/PasswordCreate";

const formSchema = z.object({
  email: z.string().min(1, "* required").email("* invalid email address"),
  name: z.string().min(1, "* required"),
  phoneNumber: z
    .string()
    .min(1, "* required")
    .regex(/^[0-9]+$/, "* only numbers allowed"),
  password: z.string().min(8, "* minimum 8 characters required"),
});

export default function StepOne() {
  const setStepOne = useRegisterStore((s) => s.setStepOne);
  const stepOne = useRegisterStore((s) => s.stepOne);
  const router = useRouter();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [verificationType, setVerificationType] = useState<"email" | "phone">(
    "email",
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: stepOne.email,
      name: stepOne.name,
      phoneNumber: stepOne.phoneNumber,
      password: stepOne.password,
    },
  });

  const otpToEmail = useOtpSendToEmail();
  const otpToPhoneNumber = useOtpSendToPhoneNumber();

  const handleVerifyEmail = async () => {
    setVerificationType("email");
    const isValid = await form.trigger("email");

    if (!isValid) return;

    otpToEmail.mutate(form.getValues("email"));

    setShowOTPDialog(true);
  };

  const handleVerifyPhone = async () => {
    setVerificationType("phone");
    const isValid = await form.trigger("phoneNumber");

    if (!isValid) return;

    otpToPhoneNumber.mutate(form.getValues("phoneNumber"));

    setShowOTPDialog(true);
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (!isEmailVerified) {
      toast.error("Please verify your email address first", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
      return;
    }

    if (!isPhoneVerified) {
      toast.error("Please verify your phone number first", {
        position: "top-right",
      });
      return;
    }

    setStepOne(data);
    router.push("/auth/register/stepTwo");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Let's get started with your business details
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-12 animate-fade-in-delay-1">
          <StepIndicator currentStep={1} />
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 animate-fade-in-delay-2">
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">
              <ShopNameField control={form.control} />
              <EmailField
                control={form.control}
                isVerified={isEmailVerified}
                onVerifyClick={handleVerifyEmail}
              />
              <PhoneNumberField
                control={form.control}
                isVerified={isPhoneVerified}
                onVerifyClick={handleVerifyPhone}
              />
              <PasswordCreate control={form.control} />
            </FieldGroup>

            <OTPVerificationDialog
              open={showOTPDialog}
              onOpenChange={setShowOTPDialog}
              type={verificationType}
              value={
                verificationType === "email"
                  ? form.watch("email")
                  : form.watch("phoneNumber")
              }
              onVerified={() => {
                if (verificationType === "email") {
                  setIsEmailVerified(true);
                } else {
                  setIsPhoneVerified(true);
                }
              }}
            />

            <Field orientation="horizontal" className="mt-8 w-full">
              <Button
                type="submit"
                form="form-rhf-demo"
                className="w-full h-14 flex items-center justify-center gap-2 rounded-xl
                                         bg-linear-to-r from-[#157aa2] to-[#1C7AA5]
                                         text-base font-semibold text-white
                                         hover:from-[#1C7AA5] hover:to-[#157aa2]
                                         transition-all duration-300 transform hover:scale-[1.02]
                                         shadow-lg hover:shadow-xl"
              >
                Next Step
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Field>
          </form>
        </div>

        {/* Progress Text */}
        <div className="text-center mt-6 text-sm text-gray-500 animate-fade-in-delay-3">
          Step 1 of 3 - Business Information
        </div>
      </div>
    </div>
  );
}
