"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const data = {
    twoPeople: 24,
    fourPeople: 27,
    sixPeople: 2,
};

export default function SeatScroll() {
    const [selected, setSelected] = useState<string | null>(null);
    return (
        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            {data && Object.entries(data).map(([key, value]) => (
                <div key={key} className="mb-6">
                    <h3 className="font-medium mb-2 mt-2">
                        {key === "twoPeople"
                            ? "2 People"
                            : key === "fourPeople"
                                ? "4 People"
                                : "6 People"}
                    </h3>
                    <div className="grid grid-cols-5 sm:grid-cols-7 gap-4 mb-6">
                        {Array.from({ length: value }).map((_, i) => {
                            const id = `${key}-${i}`;

                            return (
                                <div key={i} onClick={() => setSelected(id)} className="flex flex-col items-center gap-2 w-10">
                                    <div className={`flex items-center justify-center w-6 h-6 rounded-full ${key === "twoPeople" ? "bg-green-500" : key === "fourPeople" ? "bg-blue-500" : "bg-red-500"} text-white text-sm font-semibold`}>
                                        {i + 1}
                                    </div>
                                    <div className={`w-full h-10 rounded ${selected === id ? "bg-red-500" : "bg-gray-300"}`}>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex items-center justify-center h-full w-full px-14">
                        <div className="border-l-2 border border-gray-200 flex w-full items-center"></div>
                    </div>
                </div>
            ))}

        </ScrollArea>
    );
}