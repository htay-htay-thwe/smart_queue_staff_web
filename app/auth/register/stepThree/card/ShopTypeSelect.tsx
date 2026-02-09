"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Utensils } from "lucide-react";
import { Control, Controller } from "react-hook-form";

interface ShopTypeSelectProps {
  control: Control<any>;
}

const shopTypes = [
  { value: "", label: "Select your shop type" },
  { value: "fast-food", label: "🍔 Fast Food" },
  { value: "asian", label: "🍜 Asian Cuisine" },
  { value: "european", label: "🍝 European Cuisine" },
  { value: "cafe", label: "☕ Café & Coffee Shop" },
  { value: "bakery", label: "🥐 Bakery & Pastries" },
  { value: "dessert", label: "🍰 Dessert & Sweets" },
  { value: "seafood", label: "🦞 Seafood" },
  { value: "vegetarian", label: "🥗 Vegetarian/Vegan" },
  { value: "bar", label: "🍺 Bar & Pub" },
  { value: "restaurant", label: "🍽️ Fine Dining Restaurant" },
  { value: "other", label: "🏪 Other" },
];

export default function ShopTypeSelect({ control }: ShopTypeSelectProps) {
  return (
    <Controller
      name="shopType"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel 
            htmlFor="form-shopType" 
            className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
              <Utensils className="w-4 h-4 text-[#157aa2]" />
            </div>
            Shop Type
          </FieldLabel>
          <div className="relative">
            <select
              {...field}
              id="form-shopType"
              aria-invalid={fieldState.invalid}
              className="h-14 w-full rounded-xl border-2 border-gray-200 px-4 text-base
                       focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                       transition-all duration-300 hover:border-gray-300
                       bg-white appearance-none cursor-pointer
                       disabled:bg-gray-50 disabled:cursor-not-allowed">
              {shopTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />
          )}
        </Field>
      )}
    />
  );
}
