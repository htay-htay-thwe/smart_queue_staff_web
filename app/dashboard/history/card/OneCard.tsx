import { Card, CardAction,  CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";
import profile from "@/asset/image/profile.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const data = [
    {
        name: "Htay Thwe",
        queueNumber: "A1000",
        seatNumber: "A12",
        description: "Regular Customer",
        date: "11.2.2026",
        time: "11:20 Wednesday",
        status: "Finished",
    },
    {
        name: "Htay Thwe",
        queueNumber: "A1000",
        seatNumber: "A12",
        description: "Regular Customer",
        date: "11.2.2026",
        time: "11:20 Wednesday",
        status: "Finished",
    },
    {
        name: "Htay Thwe",
        description: "Regular Customer",
        queueNumber: "A1000",
        seatNumber: "A12",
        date: "11.2.2026",
        time: "11:20 Wednesday",
        status: "Finished",
    },
    {
        name: "Htay Thwe",
        description: "Regular Customer",
        queueNumber: "A1000",
        seatNumber: "A12",
        date: "11.2.2026",
        time: "11:20 Wednesday",
        status: "Finished",
    },
    {
        name: "Htay Thwe",
        description: "Regular Customer",
        queueNumber: "A1000",
        seatNumber: "A12",
        date: "11.2.2026",
        time: "11:20 Wednesday",
        status: "Finished",
    },
    {
        name: "Htay Thwe",
        description: "Regular Customer",
        queueNumber: "A1000",
        seatNumber: "A12",
        date: "11.2.2026",
        time: "11:20 Wednesday",
        status: "Finished",
    },
    {
        name: "Htay Thwe",
        description: "Regular Customer",
        queueNumber: "A1000",
        seatNumber: "A12",
        date: "11.2.2026",
        time: "11:20 Wednesday",
        status: "Finished",
    },
];

export default function Queue() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {data.map((user, index) => (
                <Card key={index} className="w-full mb-4">
                    <CardHeader className="pb-0">
                        <CardTitle>
                            <div className="flex items-center">
                                <Image
                                    src={profile}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full mr-2"
                                />
                                <span className="font-medium">{user.name}</span>
                            </div>
                        </CardTitle>

                        <CardDescription className="mb-0">
                            <div>
                                <div>
                                    <span className="text-[#157AA2]"> Queue Number -</span>
                                    <span className="text-green-500 font-medium px-2 py-1 text-base rounded">
                                        {user.queueNumber}
                                    </span>
                                </div>
                                <div className="mt-1">
                                    <span className="text-[#157AA2]">Seat Number -</span>
                                    <span className="text-green-500 font-medium px-2 py-1 text-base rounded">
                                        {user.seatNumber}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="font-medium mt-2 text-base text-black">{user.time}</div>
                                <Button className="mt-3 bg-blue-500 text-white rounded-sm">
                                    {user.status}
                                </Button>
                            </div>
                        </CardDescription>

                        <CardAction className="mb-0">
                            <span className="text-sm text-muted-foreground">{user.date}</span>
                        </CardAction>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}