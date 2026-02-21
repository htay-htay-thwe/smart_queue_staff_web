"use client";

import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRegisterStore } from "@/store/authStore";

// Fix marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const LocationMarker = ({ setLocation }: any) => {
  const [position, setPosition] = useState<any>(null);
  const setStepTwo = useRegisterStore((state) => state.setStepTwo);


  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      );

      const data = await res.json();
      console.log("reverse geocoding data", data.address);

      const address = data.address || {};

      setLocation({
        lat,
        lng,
        postcode: address.postcode || "",
        fullAddress: data.display_name,
      });
    },
  });

  return position ? <Marker position={position} /> : null;
};
