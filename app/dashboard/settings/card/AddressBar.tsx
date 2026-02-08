import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Profile() {
    return (
        <div className="p-4 w-full">
            <Card className="w-full flex p-7">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg sm:text-xl font-semibold">
                        Address
                    </h1>
                    <Button className="bg-black w-28 text-white hover:bg-transparent hover:no-underline">
                        Edit
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <div>Country :</div>
                        <div className="text-shadow-2xs">Thailand</div>
                    </div>
                    <div>
                        <div>City :</div>
                        <div className="text-shadow-2xs">Bangkok,Phaya Thai</div>
                    </div>
                </div>
            </Card>
        </div>

    );
}