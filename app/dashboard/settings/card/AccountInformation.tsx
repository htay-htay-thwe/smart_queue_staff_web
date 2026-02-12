import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChangeEmailDialog } from "./ChangeEmailDialog";
import { ChangePhoneDialog} from "./ChangePhoneDialog";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { EditCompanyName } from "./EditCompanyName";
import { Building2, Calendar, Mail, Phone, Lock, Shield } from "lucide-react";

export default function AccountInformation() {
  return (
    <div className="p-4 sm:p-6 w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-purple-500/20 to-purple-600/20">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details and security</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Company + Date */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Company Name */}
            <div className="group   transition-all ">
              <div className="flex items-start  gap-8">
                <div className=" space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>Company Name</span>
                  </div>
                  <p className="text-sm font-medium">H2T Company</p>
                </div>
                <EditCompanyName />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Date of Registration</span>
              </div>
              <p className="text-base font-medium">11.2.2025</p>
            </div>
          </div>

          <Separator />

          {/* Main info */}
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {/* Email */}
            <div className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Email Address</span>
                  </div>
                  <p className="break-all text-sm font-medium">htaythwe@gmail.com</p>
                </div>
                <ChangeEmailDialog />
              </div>
            </div>

            {/* Phone */}
            <div className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>Phone Number</span>
                  </div>
                  <p className="text-sm font-medium">+0823989048</p>
                </div>
                <ChangePhoneDialog />
              </div>
            </div>

            {/* Password */}
            <div className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Password</span>
                  </div>
                  <p className="text-sm font-medium">••••••••</p>
                </div>
                <ChangePasswordDialog />
              </div>
            </div>

            {/* Role */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>User Role</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Admin</p>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Full Access
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
