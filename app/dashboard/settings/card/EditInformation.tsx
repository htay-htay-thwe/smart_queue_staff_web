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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Check, X, Sparkles } from "lucide-react";
import { useState } from "react";

export function EditInformation() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-linear-to-r from-gray-800 to-black w-28 text-white hover:from-black hover:to-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
          {/* Header with gradient background */}
          <div className="bg-linear-to-br from-[#157aa2] to-[#1C7AA5] p-8 text-white relative overflow-hidden">
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
          <div className="p-8 animate-fade-in-delay-3">
            <FieldGroup className="space-y-6">
              <Field>
                <Label
                  htmlFor="new-password"
                  className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#157aa2]" />
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="h-12 pr-12 rounded-xl border-2 border-gray-200 focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#157aa2] transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </Field>

              <Field>
                <Label
                  htmlFor="confirm-password"
                  className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#157aa2]" />
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter new password"
                    className="h-12 pr-12 rounded-xl border-2 border-gray-200 focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#157aa2] transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </Field>

              {/* Password requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#157aa2]" />
                  Password Requirements:
                </p>
                <ul className="text-xs text-gray-600 space-y-1 ml-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#157aa2]"></div>
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#157aa2]"></div>
                    Include uppercase and lowercase letters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#157aa2]"></div>
                    Include at least one number
                  </li>
                </ul>
              </div>
            </FieldGroup>
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
              className="flex-1 h-12 rounded-xl bg-linear-to-r from-[#157aa2] to-[#1C7AA5] hover:from-[#1C7AA5] hover:to-[#157aa2] transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
