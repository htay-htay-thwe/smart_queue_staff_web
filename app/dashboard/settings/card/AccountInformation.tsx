import { Card } from "@/components/ui/card";
import { ChangeEmailDialog } from "./ChangeEmailDialog";
import { ChangePhoneDialog } from "./ChangePhoneDialog";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

export default function AccountInformation() {
  return (
    <div className="p-4 sm:p-6 w-full">
      <Card className="w-full p-6 sm:p-7 transition-all duration-300 hover:shadow-xl">
        {/* Title */}
       <div className="flex justify-between items-center">
         <h1 className="text-lg sm:text-xl font-semibold">
          Account Information
        </h1>

       </div>

        {/* Company + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <div className="text-sm text-muted-foreground">
              Company Name :
            </div>
            <div className="font-medium">H2T Company</div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground">
              Date of registration :
            </div>
            <div className="font-medium">11.2.2025</div>
          </div>
        </div>

        {/* Main info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">
                Email Address :
              </div>
              <div className="font-medium break-all">
                htaythwe@gmail.com
              </div>
            </div>
            <ChangeEmailDialog />
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">
                Phone Number :
              </div>
              <div className="font-medium">+0823989048</div>
            </div>
            <ChangePhoneDialog />
          </div>

          {/* Password */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">
                Password :
              </div>
              <div className="font-medium">********</div>
            </div>
            <ChangePasswordDialog />
          </div>

          {/* Role */}
          <div>
            <div className="text-sm text-muted-foreground">
              User Role :
            </div>
            <div className="font-medium">Admin</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
