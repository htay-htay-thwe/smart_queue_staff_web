"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { MapPin, Navigation, Check, AlertCircle } from "lucide-react";
import { Control, Controller } from "react-hook-form";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

const center = {
  lat: 16.8409,
  lng: 96.1735,
};

interface LocationPickerProps {
  control: Control<any>;
}

export default function LocationPicker({ control }: LocationPickerProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  });

  const [position, setPosition] = useState(center);

  if (!isLoaded) {
    return (
      <Controller
        name="location"
        control={control}
        render={() => (
          <div className="space-y-6 animate-fade-in-delay-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-[#157aa2] to-[#1C7AA5] shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Location
                </h3>
                <p className="text-sm text-gray-500">Pin your work location</p>
              </div>
            </div>
            <div className="w-full h-100 rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 border-4 border-[#157aa2] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-500 font-medium">Loading map...</p>
              </div>
            </div>
          </div>
        )}
      />
    );
  }

  return (
    <Controller
      name="location"
      control={control}
      render={({ field: { onChange, value }, fieldState }) => {
        const isLocationSet =
          value.lat !== center.lat || value.lng !== center.lng;

        return (
          <div className="space-y-6 animate-fade-in-delay-3">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-[#157aa2] to-[#1C7AA5] shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Location
                  </h3>
                  <p className="text-sm text-gray-500">
                    Click on the map to pin your location
                  </p>
                </div>
              </div>

              {isLocationSet && (
                <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-full animate-fade-in">
                  <Check className="w-4 h-4" />
                  Location set
                </div>
              )}
            </div>

            {/* Map Container */}
            <div
              className={`relative rounded-2xl overflow-hidden shadow-xl border-2 transition-shadow duration-300 ${
                fieldState.invalid
                  ? "border-red-300"
                  : "border-gray-200 hover:shadow-2xl"
              }`}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={value}
                zoom={14}
                onClick={(e) => {
                  const lat = e.latLng?.lat();
                  const lng = e.latLng?.lng();

                  if (lat && lng) {
                    const newLocation = { lat, lng };
                    setPosition(newLocation);
                    onChange(newLocation);
                  }
                }}
                options={{
                  styles: [
                    {
                      featureType: "water",
                      elementType: "geometry",
                      stylers: [{ color: "#b3d9f2" }],
                    },
                    {
                      featureType: "landscape",
                      elementType: "geometry",
                      stylers: [{ color: "#f5f5f5" }],
                    },
                  ],
                  disableDefaultUI: false,
                  zoomControl: true,
                  streetViewControl: false,
                  fullscreenControl: true,
                }}
              >
                <Marker
                  position={value}
                  animation={window.google?.maps?.Animation?.DROP}
                />
              </GoogleMap>
            </div>

            {/* Location Coordinates Display */}
            <div className="bg-linear-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-[#157aa2]" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    Selected Coordinates
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Lat:{" "}
                    <span className="font-mono font-semibold">
                      {value.lat.toFixed(6)}
                    </span>
                    , Lng:{" "}
                    <span className="font-mono font-semibold">
                      {value.lng.toFixed(6)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {fieldState.invalid && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl animate-fade-in">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">{fieldState.error?.message}</span>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
