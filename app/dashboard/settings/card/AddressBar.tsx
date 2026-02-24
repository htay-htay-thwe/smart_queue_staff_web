"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { EditAddressDialog } from "./EditAddressDialog";
import { MapPin, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopData } from "@/types/shopQueue.api.types";
import { useEffect, useState } from "react";

type AddressBarProps = {
  shop: ShopData;
};
export default function AddressBar({ shop }: AddressBarProps) {
  const [address, setAddress] = useState<string>("Loading address...");
  const coords = shop?.address?.location?.coordinates;
  const [lon, lat] = coords;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  // Coordinates are GeoJSON: [lon, lat]
  const getAddress = async () => {
    if (!coords || coords.length < 2) return "No address provided";
    console.log("coords lon,lat", lon, lat);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
      );

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Reverse geocode failed", res.status, text);
        return;
      }

      const data = await res.json();
      console.log("reverse geocoding data", data);
      return data;
    } catch (err) {
      console.error("Reverse geocoding error", err);
    }
  };

  useEffect(() => {
    getAddress().then((data) => {
      if (data && data.address) {
        setAddress(`${data.address.country}`);
      }
    });
  }, [shop.address]);

  return (
    <div className="p-4 w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-purple-500/20 to-purple-600/20">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle>Address</CardTitle>
              <CardDescription>
                Your business location information
              </CardDescription>
            </div>
          </div>
          <CardAction>
            <EditAddressDialog id={shop?._id} lon={lon} lat={lat} fullAddress={shop?.address?.fullAddress || ""} />
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>Country</span>
              </div>
              <p className="text-base font-medium">{address}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>City / District</span>
              </div>
              <p className="text-base font-medium">
                {shop?.address?.fullAddress || "Unknown City"}
              </p>
            </div>
          </div>

          {/* Google Maps Link */}
          <div className="pt-2 border-t">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
