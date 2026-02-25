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
import { MapPin, Check, X, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ProfileBox from "./ProfileBox";
import { ShopData } from "@/types/shopQueue.api.types";
import { changeProfileImage } from "@/services/profile.service";
import { useChangeProfileImage } from "@/hooks/useProfile";
import { toast } from "sonner";
import { useShopStore } from "@/store/shopStore";
import { Loading } from "@/components/ui/loading";

const formSchema = z.object({
  shop_img: z
    .any()
    .refine(
      (file) => file !== null && file !== undefined,
      "* Profile image is required",
    ),
});

type FormSchema = z.infer<typeof formSchema>;

type EditProfileImageProps = {
  setOpen?: (open: boolean) => void;
  opened?: boolean;
  shop: ShopData;
};

export function EditProfileImage({
  shop,
  setOpen,
  opened,
}: EditProfileImageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shop_img: shop.shopImg || null,
    },
  });
  const previewShopImg = form.watch("shop_img");
  const { mutate: changeProfileImageMutation, isPending } =
    useChangeProfileImage();
  const setShop = useShopStore((s) => s.setShop);
  const onSubmit = (data: FormSchema) => {
    console.log("profile image", shop._id, data);
    changeProfileImageMutation(
      {
        shop_id: shop._id,
        shop_image: data.shop_img,
      },
      {
        onSuccess: (updatedShop) => {
          toast.success("Profile image updated successfully", {
            position: "top-right",
            style: {
              color: "green",
            },
          });
          form.reset();
          setShop({ shopImg: updatedShop.data.shopImg });
          console.log("Updated shop data from API response:", updatedShop);
          if (setOpen) setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={opened} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-0 shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header with gradient background */}
          <div className="bg-linear-to-br from-[#1E7A9B] to-cyan-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <DialogHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4 animate-fade-in">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Image className="w-8 h-8 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center">
                <div className="text-2xl font-bold mb-2 animate-fade-in-delay-1">
                  Edit Profile Image
                </div>
                <p className="text-sm text-white/80 font-normal animate-fade-in-delay-2">
                  Upload a new profile image
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Form content */}
          <div className="p-8 animate-fade-in-delay-3">
            <ProfileBox
              control={form.control}
              previewShopImg={previewShopImg}
            />
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
              className="flex-1 h-12 rounded-xl bg-linear-to-br from-[#1E7A9B] to-cyan-600 hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
