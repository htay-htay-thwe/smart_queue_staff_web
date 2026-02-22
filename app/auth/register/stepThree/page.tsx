"use client";

import { Field, FieldGroup } from "@/components/ui/field";
import { StepIndicator } from "../StepIndicator";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ShopTypeSelect from "./card/ShopTypeSelect";
import DescriptionField from "./card/DescriptionField";
import TablesTypeCount from "./card/TablesTypeCount";
import { useRegisterStore } from "@/store/authStore";
import { useRegisterShop } from "@/hooks/useRegister";
import { RegisterShopRequest } from "@/types/shopQueue.api.types";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/loading";

const formSchema = z
  .object({
    shopType: z.string().min(1, "* required"),
    tableTwo: z.coerce.number().int().min(0, "* must be 0 or more"),
    tableFour: z.coerce.number().int().min(0, "* must be 0 or more"),
    tableSix: z.coerce.number().int().min(0, "* must be 0 or more"),
    description: z
      .string()
      .min(10, "* minimum 10 characters required")
      .max(500, "* maximum 500 characters allowed"),
  })
  .refine(
    (data) => data.tableTwo > 0 || data.tableFour > 0 || data.tableSix > 0,
    {
      message: "* Please enter at least one table type",
      path: ["tableTwo"],
    },
  );

export default function StepThree() {
  const setStepThree = useRegisterStore((state) => state.setStepThree);
  const stepOneData = useRegisterStore((state) => state.stepOne);
  const stepTwoData = useRegisterStore((state) => state.stepTwo);
  console.log("step two data", stepTwoData);
  const stepThreeData = useRegisterStore((state) => state.stepThree);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shopType: stepThreeData.shopType,
      tableTwo: stepThreeData.tableTwo,
      tableFour: stepThreeData.tableFour,
      tableSix: stepThreeData.tableSix,
      description: stepThreeData.description,
    },
  });
  const { mutate: registerShopMutation, isPending } = useRegisterShop(router);

  function onSubmit(data: z.infer<typeof formSchema>) {
    const payload = {
      ...data,
      tableTypes: [
        { type: "2-seat", capacity: data.tableTwo },
        { type: "4-seat", capacity: data.tableFour },
        { type: "6-seat", capacity: data.tableSix },
      ],
    };
    setStepThree(payload);

    const registerData: RegisterShopRequest = {
      name: stepOneData.name,
      email: stepOneData.email,
      phoneNumber: stepOneData.phoneNumber,
      shopTypeId: stepThreeData.shopType,
      description: data.description,
      password: stepOneData.password,
      tableTypes: [
        { type: "2-seat", capacity: data.tableTwo },
        { type: "4-seat", capacity: data.tableFour },
        { type: "6-seat", capacity: data.tableSix },
      ],
      fullAddress: stepTwoData.fullAddress,
      location: stepTwoData.location!,
      shop_img: stepTwoData.shop_img!,
    };
    registerShopMutation(registerData);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Final Step!</h1>
          <p className="text-gray-600">Tell us more about your business</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-12 animate-fade-in-delay-1">
          <StepIndicator currentStep={3} />
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 animate-fade-in-delay-2">
          <form id="form-step-three" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">
              <ShopTypeSelect control={form.control} />
              <TablesTypeCount control={form.control} />
              <DescriptionField control={form.control} />
            </FieldGroup>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <Link
                href="/auth/register/stepTwo"
                className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl
                                         border-2 border-gray-300 bg-white
                                         text-base font-semibold text-gray-700
                                         hover:bg-gray-50 hover:border-gray-400
                                         transition-all duration-300 transform hover:scale-[1.02]
                                         shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
              <Button
                type="submit"
                form="form-step-three"
                className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl
                                         bg-linear-to-r from-cyan-500 to-blue-400
                                         text-base font-semibold text-white
                                         hover:from-blue-400 hover:to-cyan-500
                                         transition-all duration-300 transform hover:scale-[1.02]
                                         shadow-lg hover:shadow-xl"
              >
                Complete Registration
                <CheckCircle className="w-5 h-5" />
              </Button>
            </div>
          </form>

          {isPending && <Loading />}
        </div>

        {/* Progress Text */}
        <div className="text-center mt-6 text-sm text-gray-500 animate-fade-in-delay-3">
          Step 3 of 3 - Final Step!
        </div>
      </div>
    </div>
  );
}
