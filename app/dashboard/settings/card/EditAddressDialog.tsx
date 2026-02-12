"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Check, X, Globe, Navigation } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().optional(),
  street: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
};

const defaultCenter = {
  lat: 13.7563,
  lng: 100.5018,
};

export function EditAddressDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState<string>("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
  });

  const { control, handleSubmit, setValue, watch } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      location: defaultCenter,
      country: "Thailand",
      city: "",
      district: "",
      street: "",
    },
  });

  const location = watch("location");

  // Geocode location to get address
  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const result = data.results[0];
        setAddress(result.formatted_address);

        // Parse address components
        const components = result.address_components;
        let country = "";
        let city = "";
        let district = "";
        let street = "";

        components.forEach((component: any) => {
          if (component.types.includes("country")) {
            country = component.long_name;
          }
          if (
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_2")
          ) {
            city = component.long_name;
          }
          if (
            component.types.includes("sublocality") ||
            component.types.includes("administrative_area_level_3")
          ) {
            district = component.long_name;
          }
          if (component.types.includes("route")) {
            street = component.long_name;
          }
        });

        setValue("country", country);
        setValue("city", city);
        setValue("district", district);
        setValue("street", street);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  useEffect(() => {
    if (location && isOpen) {
      getAddressFromCoords(location.lat, location.lng);
    }
  }, [location.lat, location.lng, isOpen]);

  const onSubmit = (data: FormSchema) => {
    console.log("Address data:", data);
    // Handle form submission - integrate with your backend
    toast.success("Address updated successfully!", {
      description: `${data.city}, ${data.country}`,
    });
    setIsOpen(false);
  };

  const onError = (errors: any) => {
    console.log("Form errors:", errors);
    toast.error("Please fix the errors", {
      description: "Some required fields are missing or invalid",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-blue-500 to-cyan-600 text-white px-6 h-10 rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-cyan-700 hover:scale-105 shadow-md hover:shadow-lg">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Header with gradient background */}
          <div className="bg-linear-to-br from-blue-500 to-cyan-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <DialogHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4 animate-fade-in">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center">
                <div className="text-2xl font-bold mb-2 animate-fade-in-delay-1">
                  Edit Address
                </div>
                <p className="text-sm text-white/80 font-normal animate-fade-in-delay-2">
                  Click on the map or fill the form below
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Form content */}
          <div className="p-8 animate-fade-in-delay-3">
            <ScrollArea className="h-[60vh] pr-4">
              <FieldGroup className="space-y-6 pr-2">
                {/* Map */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-blue-500" />
                    Pin Your Location
                  </Label>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-1">
                    <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      How to set your address:
                    </p>
                    <p className="text-xs text-blue-700 ml-6">
                      Click anywhere on the map below. Your address fields will be automatically filled from the selected location.
                    </p>
                  </div>

                  {isLoaded ? (
                    <Controller
                      name="location"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="space-y-3">
                          <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                            <GoogleMap
                              mapContainerStyle={mapContainerStyle}
                              center={value}
                              zoom={14}
                              onClick={(e) => {
                                const lat = e.latLng?.lat();
                                const lng = e.latLng?.lng();
                                if (lat && lng) {
                                  onChange({ lat, lng });
                                }
                              }}
                              options={{
                                disableDefaultUI: false,
                                zoomControl: true,
                                streetViewControl: false,
                                fullscreenControl: true,
                              }}
                            >
                              <Marker position={value} />
                            </GoogleMap>
                          </div>

                          {/* Coordinates Display */}
                          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                            <p className="text-xs text-gray-600">
                              <span className="font-semibold">
                                Coordinates:
                              </span>{" "}
                              {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
                            </p>
                            {address && (
                              <p className="text-xs text-gray-600 mt-1">
                                <span className="font-semibold">Address:</span>{" "}
                                {address}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="w-full h-[300px] rounded-xl bg-gray-100 animate-pulse flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-gray-500 text-sm">Loading map...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Country */}
                <Controller
                  name="country"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="country"
                        className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4 text-blue-500" />
                        Country
                        <span className="text-xs text-gray-500 ml-2 font-normal">(Auto-filled from map)</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="country"
                        readOnly
                        aria-invalid={fieldState.invalid}
                        placeholder="Click on map to set location"
                        className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50 cursor-not-allowed transition-all duration-300"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* City */}
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="city"
                        className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-blue-500" />
                        City
                        <span className="text-xs text-gray-500 ml-2 font-normal">(Auto-filled from map)</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="city"
                        readOnly
                        aria-invalid={fieldState.invalid}
                        placeholder="Click on map to set location"
                        className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50 cursor-not-allowed transition-all duration-300"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* District */}
                <Controller
                  name="district"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="district"
                        className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-blue-500" />
                        District
                        <span className="text-xs text-gray-500 ml-2 font-normal">(Auto-filled from map)</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="district"
                        readOnly
                        aria-invalid={fieldState.invalid}
                        placeholder="Click on map to set location"
                        className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50 cursor-not-allowed transition-all duration-300"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Street Address */}
                <Controller
                  name="street"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="street"
                        className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Street Address
                        <span className="text-xs text-gray-500 ml-2 font-normal">(Auto-filled from map)</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="street"
                        readOnly
                        aria-invalid={fieldState.invalid}
                        placeholder="Click on map to set location"
                        className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50 cursor-not-allowed transition-all duration-300"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </ScrollArea>
          </div>

          {/* Footer with buttons */}
          <DialogFooter className="px-8 pb-8 pt-0 gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-linear-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
