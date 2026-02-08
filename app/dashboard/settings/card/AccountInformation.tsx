import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EditInformation } from "./EditInformation";

export default function AccountInformation() {
  return (
    <div className="p-4 sm:p-6 w-full">
      <Card className="w-full p-6 sm:p-7">
        {/* Title */}
       <div className="flex justify-between items-center">
         <h1 className="text-lg sm:text-xl font-semibold">
          Account Information
        </h1>
        <EditInformation/>
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
            <Button className="bg-blue-500 text-white w-full sm:w-32">
              Change
            </Button>
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">
                Phone Number :
              </div>
              <div className="font-medium">+0823989048</div>
            </div>
            <Button className="bg-blue-500 text-white w-full sm:w-32">
              Change
            </Button>
          </div>

          {/* Password */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">
                Password :
              </div>
              <div className="font-medium">********</div>
            </div>
            <Button className="bg-blue-500 text-white w-full sm:w-32">
              Change
            </Button>
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
