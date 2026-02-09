"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Users, Check } from "lucide-react";

const data = {
    twoPeople: 24,
    fourPeople: 27,
    sixPeople: 2,
};

const occupiedSeats = new Set(["twoPeople-3", "twoPeople-7", "fourPeople-5", "fourPeople-12", "sixPeople-0"]);

export default function SeatScroll() {
    const [selected, setSelected] = useState<string | null>(null);

    const getSectionConfig = (key: string) => {
        if (key === "twoPeople") {
            return {
                label: "2 People",
                icon: "👥",
                headerBg: "bg-blue-200",
                iconBg: "bg-linear-to-br from-blue-400 to-blue-500",
                badgeBg: "bg-blue-500",
                hoverBorder: "hover:border-blue-300",
                tableBg: "hover:bg-blue-200",
            };
        } else if (key === "fourPeople") {
            return {
                label: "4 People",
                icon: "👨‍👩‍👧‍👦",
                headerBg: "bg-green-200",
                iconBg: "bg-linear-to-br from-green-400 to-green-500",
                badgeBg: "bg-green-500",
                hoverBorder: "hover:border-green-300",
                tableBg: "hover:bg-green-200",
            };
        } else {
            return {
                label: "6 People",
                icon: "👨‍👩‍👧‍👦👤👤",
                headerBg: "bg-orange-200",
                iconBg: "bg-linear-to-br from-orange-400 to-orange-500",
                badgeBg: "bg-orange-500",
                hoverBorder: "hover:border-orange-300",
                tableBg: "hover:bg-orange-200",
            };
        }
    };

    return (
        <ScrollArea className="h-150 w-full rounded-2xl border-2 border-gray-200 p-6 bg-gray-50">
            {data && Object.entries(data).map(([key, value]) => {
                const config = getSectionConfig(key);
                return (
                    <div key={key} className="mb-8">
                        {/* Section Header */}
                        <div className={`flex items-center gap-3 mb-4 p-4 rounded-xl bg-white border-2 ${config.headerBg}`}>
                            <div className={`w-12 h-12 ${config.iconBg} rounded-xl flex items-center justify-center shadow-md`}>
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">
                                    {config.label}
                                </h3>
                                <p className="text-sm text-gray-500">{value} tables available</p>
                            </div>
                        </div>

                        {/* Seats Grid */}
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-6">
                            {Array.from({ length: value }).map((_, i) => {
                                const id = `${key}-${i}`;
                                const isOccupied = occupiedSeats.has(id);
                                const isSelected = selected === id;

                                return (
                                    <div
                                        key={i}
                                        onClick={() => !isOccupied && setSelected(id)}
                                        className={`
                                            flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300
                                            ${isOccupied ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-110 hover:shadow-lg'}
                                            ${isSelected ? 'bg-purple-100 border-2 border-purple-400' : `bg-white border-2 border-gray-200 ${config.hoverBorder}`}
                                        `}
                                    >
                                        {/* Table Number Badge */}
                                        <div className={`
                                            flex items-center justify-center w-8 h-8 rounded-lg text-white text-xs font-bold shadow-md
                                            ${isSelected ? 'bg-purple-500' : isOccupied ? 'bg-gray-400' : config.badgeBg}
                                        `}>
                                            {isSelected && <Check className="w-4 h-4" />}
                                            {!isSelected && (i + 1)}
                                        </div>

                                        {/* Table Visual */}
                                        <div className={`
                                            w-full h-12 rounded-lg flex items-center justify-center transition-all duration-300
                                            ${isSelected ? 'bg-purple-500 shadow-lg' : isOccupied ? 'bg-gray-400' : `bg-gray-300 ${config.tableBg}`}
                                        `}>
                                            {isOccupied && (
                                                <span className="text-white text-xs font-semibold">Busy</span>
                                            )}
                                        </div>

                                        {/* Seat Label */}
                                        <span className={`text-xs font-semibold ${isSelected ? 'text-purple-600' : 'text-gray-600'}`}>
                                            {key[0].toUpperCase()}{i + 1}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="flex items-center justify-center w-full my-4">
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                    </div>
                );
            })}
        </ScrollArea>
    );
}