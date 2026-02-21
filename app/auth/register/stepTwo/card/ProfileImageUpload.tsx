"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, Check, AlertCircle } from "lucide-react";
import { Control, Controller, useWatch } from "react-hook-form";

interface ProfileImageUploadProps {
  control: Control<any>;
}

export default function ProfileImageUpload({
  control,
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (
    file: File | undefined,
    onChange: (value: any) => void,
  ) => {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onChange(file);
  };

  const watchedImage = useWatch({
    control,
    name: "shop_img",
  });

  useEffect(() => {
    if (watchedImage instanceof File) {
      const imageUrl = URL.createObjectURL(watchedImage);
      setPreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [watchedImage]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, onChange: (value: any) => void) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file, onChange);
    }
  };

  return (
    <Controller
      name="shop_img"
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <div className="space-y-6 animate-fade-in-delay-2">
          {/* Section Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-[#157aa2] to-[#1C7AA5] shadow-lg">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Profile Picture
              </h3>
              <p className="text-sm text-gray-500">
                Upload a professional photo
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar Preview */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-[#157aa2] to-[#1C7AA5] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <Avatar className="relative h-40 w-40 border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105">
                <AvatarImage src={preview ?? ""} className="object-cover" />
                <AvatarFallback className="bg-linear-to-br from-gray-100 to-gray-200 text-4xl font-bold text-gray-400">
                  {preview ? (
                    <Check className="w-12 h-12 text-green-500" />
                  ) : (
                    <Camera className="w-12 h-12" />
                  )}
                </AvatarFallback>
              </Avatar>
              {preview && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Upload Area */}
            <div className="flex-1 w-full">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, onChange)}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                  fieldState.invalid
                    ? "border-red-300 bg-red-50"
                    : isDragging
                      ? "border-[#157aa2] bg-blue-50 scale-105"
                      : "border-gray-300 bg-gray-50 hover:border-[#157aa2] hover:bg-blue-50"
                }`}
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isDragging ? "bg-[#157aa2] scale-110" : "bg-gray-200"
                        }`}
                      >
                        <Upload
                          className={`w-8 h-8 ${
                            isDragging ? "text-white" : "text-gray-500"
                          }`}
                        />
                      </div>
                    </Label>
                  </div>

                  <div>
                    <span className="text-gray-500">
                      Click icon or drag and drop
                    </span>
                    <p className="text-sm text-gray-400 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>

                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(e.target.files?.[0], onChange)
                    }
                  />
                </div>
              </div>

              {preview && (
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600 animate-fade-in">
                  <Check className="w-4 h-4" />
                  <span className="font-medium">
                    Image uploaded successfully!
                  </span>
                </div>
              )}
              {fieldState.invalid && (
                <div className="mt-4 flex items-center gap-2 text-sm text-red-600 animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">
                    {fieldState.error?.message}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    />
  );
}
