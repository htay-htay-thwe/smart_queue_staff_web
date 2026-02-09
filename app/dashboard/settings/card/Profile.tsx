import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import profile from "@/asset/image/profile.jpg";
import Image from "next/image";
import { MapPin } from "lucide-react";
export default function Profile() {
    return (
        <div className="p-6">
            <Card className="w-full flex p-7 transition-all duration-300 hover:shadow-xl group">
                <div className="flex gap-5">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                        <Image src={profile} alt="Profile" width={100} height={200} className="rounded-full  mx-auto mt-4" />
                    </div>
                    <div className="space-y-2">
                        <div className="text-lg font-medium">John Smith</div>
                        <p className=" text-gray-600">Regular Customer</p>
                        <p className="flex gap-1"><span><MapPin size={16} color={"gray"} className="mt-1"/></span>Bangkok, Thailand</p>
                    </div>
                </div>

            </Card>
        </div>
    );
}