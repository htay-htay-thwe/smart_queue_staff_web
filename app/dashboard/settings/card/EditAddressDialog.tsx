"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useChangeAddress } from "@/hooks/useProfile";
import { useShopStore } from "@/store/shopStore";
import { Loading } from "@/components/ui/loading";
import dynamic from "next/dynamic";

const EditMapPicker = dynamic(
  () => import("./EditMapPicker").then((mod) => mod.default),
  { ssr: false },
);

const formSchema = z.object({
  fullAddress: z.string().min(1, "*required"),
  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .refine(
      (loc) => loc.lat !== 0 || loc.lng !== 0,
      "* Please select your location on the map",
    ),
});

type FormSchema = z.infer<typeof formSchema>;

type EditAddressDialogProps = {
  id: string;
  lon: number;
  lat: number;
  fullAddress: string;
};

export function EditAddressDialog({
  id,
  lon,
  lat,
  fullAddress,
}: EditAddressDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<any>(
    lat && lon ? { lat, lng: lon, fullAddress } : null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullAddress: fullAddress,
      location: {
        lat: lat || 0,
        lng: lon || 0,
      },
    },
  });

  // Log and sync when `location` from the map picker changes
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("EditAddressDialog - location state:", location);
    if (
      location &&
      typeof location.lat === "number" &&
      typeof location.lng === "number"
    ) {
      form.setValue("location.lat", location.lat);
      form.setValue("location.lng", location.lng);
      if (location.fullAddress)
        form.setValue("fullAddress", location.fullAddress);
    }
  }, [location]);

  const { mutate: updateAddress, isPending } = useChangeAddress();
  const setShopData = useShopStore((s) => s.setShop);

  const onSubmit = (data: FormSchema) => {
    console.log("Address data:", data);
    // Handle form submission - integrate with your backend
    updateAddress(
      {
        shop_id: id,
        fullAddress: data.fullAddress,
        lat: data.location.lat,
        lng: data.location.lng,
      },
      {
        onSuccess: (res: any) => {
          toast.success("Address updated successfully!", {
            position: "top-right",
            style: { color: "green" },
          });

          // Try to use server-returned address when available
          const serverAddress = res?.address || res?.data?.address || null;
          console.log("Server returned address:", serverAddress);

          const addressToSet = serverAddress
            ? serverAddress
            : {
                location: {
                  type: "Point",
                  coordinates: [data.location.lng, data.location.lat],
                },
                fullAddress: data.fullAddress,
                // fallback id: if server didn't return an address id, use shop id as placeholder
                _id: id,
              };

          setShopData({ address: addressToSet });
          // debug: log store after update to verify
          // eslint-disable-next-line no-console
          console.log(
            "shop store after address set",
            useShopStore.getState().shop,
          );
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-blue-500 to-cyan-600 text-white px-6 h-10 rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-cyan-700 hover:scale-105 shadow-md hover:shadow-lg">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-0 shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header with gradient background */}
          <div className="bg-linear-to-br from-blue-500 to-cyan-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <DialogHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4 animate-fade-in">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center">
                <div className="text-2xl font-bold mb-2 animate-fade-in-delay-1">
                  Edit Address
                </div>
                <p className="text-sm text-white/80 font-normal animate-fade-in-delay-2">
                  Click on the map or fill the form below
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Form content */}
          <div className="p-8 animate-fade-in-delay-3">
            <EditMapPicker location={location} setLocation={setLocation} />
            <div>
              <label
                htmlFor="fullAddress"
                className="block text-sm font-medium text-gray-700 mt-6 mb-2"
              >
                {location?.fullAddress}
              </label>
            </div>
          </div>

          {/* Footer with buttons */}
          <DialogFooter className="px-8 pb-8 pt-0 gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-linear-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
        {isPending && <Loading />}
      </DialogContent>
    </Dialog>
  );
}
