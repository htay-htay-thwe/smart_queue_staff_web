"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { useState } from "react";

interface DescriptionFieldProps {
  control: Control<any>;
}

export default function DescriptionField({ control }: DescriptionFieldProps) {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel 
            htmlFor="form-description" 
            className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
              <FileText className="w-4 h-4 text-[#157aa2]" />
            </div>
            Shop Description
          </FieldLabel>
          <div className="relative">
            <Textarea
              {...field}
              id="form-description"
              aria-invalid={fieldState.invalid}
              placeholder="Tell us about your shop... What makes it special? What cuisine do you serve?"
              rows={6}
              maxLength={maxChars}
              onChange={(e) => {
                field.onChange(e);
                setCharCount(e.target.value.length);
              }}
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base
                       focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                       transition-all duration-300 hover:border-gray-300
                       resize-none"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
              {charCount}/{maxChars}
            </div>
          </div>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1" />
          )}
          <p className="text-sm text-gray-500 mt-2">
            Share details about your menu, atmosphere, or what makes your shop unique.
          </p>
        </Field>
      )}
    />
  );
}
