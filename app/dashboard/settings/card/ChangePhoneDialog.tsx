"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Check, X, Sparkles, CheckCircle2 } from "lucide-react"
import OTPVerificationDialog from "@/app/auth/register/stepOne/card/OTPVerificationDialog";
import { toast } from "sonner";

export function ChangePhoneDialog() {
  const [newPhone, setNewPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleVerifyClick = () => {
    if (!newPhone || !/^[0-9]+$/.test(newPhone)) {
      toast.error("Please enter a valid phone number", {
        position: "bottom-right",
      });
      return;
    }
    setShowOTPDialog(true);
  };

  const handleVerifySuccess = () => {
    setIsVerified(true);
    toast.success("Phone number verified successfully!", {
      position: "bottom-right",
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error("Please verify your new phone number first", {
        position: "bottom-right",
      });
      return;
    }
    toast.success("Phone number updated successfully!", {
      position: "bottom-right",
    });
    setIsOpen(false);
    setNewPhone("");
    setIsVerified(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setNewPhone("");
      setIsVerified(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-green-500 to-green-600 text-white px-6 h-10 rounded-xl transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-md hover:shadow-lg">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
        <form>
          {/* Header with gradient background */}
          <div className="bg-linear-to-br from-green-500 to-green-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <DialogHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4 animate-fade-in">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center">
                <div className="text-2xl font-bold mb-2 animate-fade-in-delay-1">Change Phone Number</div>
                <p className="text-sm text-white/80 font-normal animate-fade-in-delay-2">
                  Update your phone number for account security
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Form content */}
          <div className="p-8 animate-fade-in-delay-3">
            <FieldGroup className="space-y-6">
              <Field>
                <Label htmlFor="current-phone" className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500" />
                  Current Phone Number
                </Label>
                <Input
                  id="current-phone"
                  name="currentPhone"
                  type="tel"
                  value="+0823989048"
                  disabled
                  className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-500"
                />
              </Field>

              <Field>
                <Label htmlFor="new-phone" className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500" />
                  New Phone Number
                  {isVerified && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="new-phone"
                    name="newPhone"
                    type="tel"
                    value={newPhone}
                    onChange={(e) => {
                      setNewPhone(e.target.value);
                      setIsVerified(false);
                    }}
                    disabled={isVerified}
                    placeholder="Enter new phone number"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 disabled:opacity-60"
                  />
                  {!isVerified && (
                    <Button
                      type="button"
                      onClick={handleVerifyClick}
                      disabled={!newPhone || !/^[0-9]+$/.test(newPhone)}
                      className="h-12 px-6 bg-linear-to-r from-[#157aa2] to-[#1C7AA5] hover:from-[#1C7AA5] hover:to-[#157aa2] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 whitespace-nowrap"
                    >
                      Verify
                    </Button>
                  )}
                </div>
              </Field>

              <OTPVerificationDialog
                open={showOTPDialog}
                onOpenChange={setShowOTPDialog}
                type="phone"
                value={newPhone}
                onVerifySuccess={handleVerifySuccess}
              />

              {/* Info box */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  Verification Required:
                </p>
                <ul className="text-xs text-gray-600 space-y-1 ml-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    An OTP will be sent to your new phone number
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    Enter the code to verify and complete the change
                  </li>
                </ul>
              </div>
            </FieldGroup>
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
              onClick={handleUpdate}
              disabled={!isVerified}
              className="flex-1 h-12 rounded-xl bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              Update Phone
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
