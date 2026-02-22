"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  location: any;
  setLocation: (loc: any) => void;
};

import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fix marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapPicker({ location, setLocation }: Props) {
  function LocationMarker() {
    useMapEvents({
      async click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        // Fetch full address
        let fullAddress = "";
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
          );
          const data = await res.json();
          fullAddress = data.display_name || "";
        } catch (err) {
          fullAddress = "";
        }
        setLocation({ lat, lng, fullAddress });
      },
    });

    return location && location.lat && location.lng ? (
      <Marker position={[location.lat, location.lng]} />
    ) : null;
  }

  return (
    <div className="h-96 w-full rounded-xl overflow-hidden">
      <MapContainer
        center={[location?.lat || 13.7563, location?.lng || 100.5018]}
        zoom={13}
        className="h-full w-full">
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}