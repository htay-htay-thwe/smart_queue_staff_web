"use client";

import Link from "next/link";
import { StepIndicator } from "../StepIndicator";
import LocationPicker from "./card/LocationPicker";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRegisterStore } from "@/store/authStore";
import ProfileImageUpload from "./card/ProfileImageUpload";
import { MapPicker } from "./card/MapPicker";
import { useState } from "react";

const formSchema = z.object({
  shop_img: z
    .any()
    .refine(
      (file) => file !== null && file !== undefined,
      "* Profile image is required",
    ),
  fullAddress: z.string().min(1, "*required"),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .refine(
      (loc) => loc.lat !== 16.8409 || loc.lng !== 96.1735,
      "* Please select your location on the map",
    ),
});

export default function StepTwo() {
  const router = useRouter();
  const [location, setLocation] = useState<any>(null);
  const setStepTwo = useRegisterStore((s) => s.setStepTwo);
  const stepTwo = useRegisterStore((s) => s.stepTwo);
  console.log('stepTwo:', stepTwo);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shop_img: stepTwo?.shop_img || null,
      fullAddress: stepTwo?.fullAddress || location?.fullAddress || "",
      location: {
        lat: stepTwo?.location?.lat || location?.lat || 0,
        lng: stepTwo?.location?.lng || location?.lng || 0,
      },
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setStepTwo(data);
    router.push("/auth/register/stepThree");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            Upload your photo and set your location
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-12 animate-fade-in-delay-1">
          <StepIndicator currentStep={2} />
        </div>

        {/* Main Content Card */}
        <form id="form-step-two" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="animate-fade-in-delay-2">
            <ProfileImageUpload control={form.control} />

            <div className="border-t border-gray-200 my-8"></div>

            <MapPicker setLocation={setLocation} />

            {location && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700">
                <p>
                  <b>Latitude:</b> {location.lat}
                </p>
                <p>
                  <b>Longitude:</b> {location.lng}
                </p>
                <p>
                  <b>Postcode:</b> {location.postcode}
                </p>
                <p>
                  <b>Full Address:</b> {location.fullAddress}
                </p>
              </div>
            )}
            {/* <LocationPicker control={form.control} /> */}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              <Link
                href="/auth/register/stepOne"
                className="flex-1 h-14 flex items-center justify-center rounded-xl
                                         border-2 border-gray-300 bg-white
                                         text-base font-semibold text-gray-700
                                         hover:bg-gray-50 hover:border-gray-400
                                         transition-all duration-300 transform hover:scale-[1.02]
                                         shadow-sm hover:shadow-md"
              >
                Back
              </Link>
              <Button
                type="submit"
                form="form-step-two"
                className="flex-1 h-14 flex items-center justify-center gap-2 rounded-xl
                                         bg-linear-to-r from-[#157aa2] to-[#1C7AA5]
                                         text-base font-semibold text-white
                                         hover:from-[#1C7AA5] hover:to-[#157aa2]
                                         transition-all duration-300 transform hover:scale-[1.02]
                                         shadow-lg hover:shadow-xl"
              >
                Next Step
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </form>

        {/* Progress Text */}
        <div className="text-center mt-6 text-sm text-gray-500 animate-fade-in-delay-4">
          Step 2 of 3 - Almost there!
        </div>
      </div>
    </div>
  );
}
