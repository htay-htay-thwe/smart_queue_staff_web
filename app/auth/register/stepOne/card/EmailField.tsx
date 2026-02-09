"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Control, Controller } from "react-hook-form";

interface EmailFieldProps {
  control: Control<any>;
}

export default function EmailField({ control }: EmailFieldProps) {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel 
            htmlFor="form-rhf-demo-email" 
            className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
              <Mail className="w-4 h-4 text-[#157aa2]" />
            </div>
            Email Address
          </FieldLabel>
          <Input
            {...field}
            id="form-rhf-demo-email"
            type="email"
            aria-invalid={fieldState.invalid}
            placeholder="example@gmail.com"
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
