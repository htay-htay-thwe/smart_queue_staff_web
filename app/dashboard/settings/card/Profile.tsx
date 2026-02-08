import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import profile from "@/asset/image/profile.jpg";
import Image from "next/image";
export default function Profile() {
    return (
        <div className="p-6">
            <Card className="w-full flex p-7">
                <div className="flex gap-5">
                    <div>
                        <Image src={profile} alt="Profile" width={100} height={200} className="rounded-full  mx-auto mt-4" />
                    </div>
                    <div className="space-y-2">
                        <h2>Htay Thwe</h2>
                        <p className=" text-gray-600">Regular Customer</p>
                        <p>Bangkok, Thailand</p>
                    </div>
                </div>

            </Card>
        </div>
    );
}