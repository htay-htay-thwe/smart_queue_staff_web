"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Store } from "lucide-react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface ShopNameFieldProps {
  control: Control<any>;
}

export default function ShopNameField({ control }: ShopNameFieldProps) {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel 
            htmlFor="form-rhf-demo-shopName" 
            className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
              <Store className="w-4 h-4 text-[#157aa2]" />
            </div>
            Shop Name
          </FieldLabel>
          <Input
            {...field}
            id="form-rhf-demo-shopName"
            aria-invalid={fieldState.invalid}
            placeholder="Enter your shop name"
            autoComplete="off"
            className="h-14 w-full rounded-xl border-2 border-gray-200 px-4 text-base
                     focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                     transition-all duration-300 hover:border-gray-300"
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />
          )}
        </Field>
      )}
    />
  );
}
