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
import { Mail, Check, X, Sparkles, CheckCircle2 } from "lucide-react"
import OTPVerificationDialog from "@/app/auth/register/stepOne/card/OTPVerificationDialog";
import { toast } from "sonner";

export function ChangeEmailDialog() {
  const [newEmail, setNewEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleVerifyClick = () => {
    if (!newEmail || !newEmail.includes("@")) {
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
      });
      return;
    }
    setShowOTPDialog(true);
  };

  const handleVerifySuccess = () => {
    setIsVerified(true);
    toast.success("Email verified successfully!", {
      position: "bottom-right",
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error("Please verify your new email address first", {
        position: "bottom-right",
      });
      return;
    }
    toast.success("Email updated successfully!", {
      position: "bottom-right",
    });
    setIsOpen(false);
    setNewEmail("");
    setIsVerified(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setNewEmail("");
      setIsVerified(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-6 h-10 rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:scale-105 shadow-md hover:shadow-lg">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
        <form>
          {/* Header with gradient background */}
          <div className="bg-linear-to-br from-blue-500 to-blue-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <DialogHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4 animate-fade-in">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center">
                <div className="text-2xl font-bold mb-2 animate-fade-in-delay-1">Change Email Address</div>
                <p className="text-sm text-white/80 font-normal animate-fade-in-delay-2">
                  Update your email address for account communications
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Form content */}
          <div className="p-8 animate-fade-in-delay-3">
            <FieldGroup className="space-y-6">
              <Field>
                <Label htmlFor="current-email" className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Current Email
                </Label>
                <Input
                  id="current-email"
                  name="currentEmail"
                  type="email"
                  value="htaythwe@gmail.com"
                  disabled
                  className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-500"
                />
              </Field>

              <Field>
                <Label htmlFor="new-email" className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  New Email Address
                  {isVerified && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="new-email"
                    name="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      setIsVerified(false);
                    }}
                    disabled={isVerified}
                    placeholder="Enter new email address"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-60"
                  />
                  {!isVerified && (
                    <Button
                      type="button"
                      onClick={handleVerifyClick}
                      disabled={!newEmail || !newEmail.includes("@")}
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
                type="email"
                value={newEmail}
                onVerifySuccess={handleVerifySuccess}
              />

              {/* Info box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Important:
                </p>
                <ul className="text-xs text-gray-600 space-y-1 ml-6">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    A verification email will be sent to your new address
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    You must verify before changes take effect
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
              className="flex-1 h-12 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              Update Email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
