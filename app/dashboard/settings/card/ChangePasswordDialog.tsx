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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loading";
import {
  useChangePhoneNumber,
  useChangeShopPassword,
} from "@/hooks/useProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, Check, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z, { set } from "zod";
import { is } from "zod/locales";

type ChangePasswordDialogProps = {
  email: string;
};

const formSchema = z.object({
  newPassword: z.string().min(8, "* minimum 8 characters required"),
  confirmPassword: z.string().min(8, "* minimum 8 characters required"),
});

export function ChangePasswordDialog({ email }: ChangePasswordDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: changePassword, isPending } = useChangeShopPassword();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form Data:", data);
    console.log(data);
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        style: {
          color: "red",
        },
      });
      return;
    }
    changePassword(
      { email, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success("Password changed successfully!", {
            position: "top-right",
            style: { color: "green" },
          });
          form.reset();
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-purple-500 to-purple-600 text-white px-6 h-10 rounded-xl transition-all duration-300 hover:from-purple-600 hover:to-purple-700 hover:scale-105 shadow-md hover:shadow-lg">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header with gradient background */}
          <div className="bg-linear-to-br from-purple-500 to-purple-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <DialogHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4 animate-fade-in">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center">
                <div className="text-2xl font-bold mb-2 animate-fade-in-delay-1">
                  Change Password
                </div>
                <p className="text-sm text-white/80 font-normal animate-fade-in-delay-2">
                  Update your password to keep your account secure
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Form content */}
          <div className="p-8   animate-fade-in-delay-3">
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-newPassword"
                    className="text-base font-semibold text-gray-700 mb-1 flex items-center gap-2"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                      <Lock className="w-4 h-4 text-[#157aa2]" />
                    </div>
                    New Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="form-rhf-demo-newPassword"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your new password"
                      autoComplete="off"
                      className="h-14 w-full rounded-xl border-2 border-gray-200 px-4 text-base
                     focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                     transition-all duration-300 hover:border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500 text-sm "
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-confirmPassword"
                    className="text-base font-semibold text-gray-700 mb-1 mt-8 flex items-center gap-2"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                      <Lock className="w-4 h-4 text-[#157aa2]" />
                    </div>
                    Confirm Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="form-rhf-demo-confirmPassword"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      type={showConfirmPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your new password"
                      autoComplete="off"
                      className="h-14 w-full rounded-xl border-2 border-gray-200 px-4 text-base
                     focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                     transition-all duration-300 hover:border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500 text-sm mt-1"
                    />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Footer with buttons */}
          <DialogFooter className="px-8 pb-8 pt-0 gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
