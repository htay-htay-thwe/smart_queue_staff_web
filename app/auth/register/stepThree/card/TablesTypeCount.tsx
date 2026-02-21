"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Table } from "lucide-react";
import { Control, Controller } from "react-hook-form";

interface TablesTypeCountProps {
  control: Control<any>;
}

const tableTypes = [
  { name: "tableTwo", label: "2-seater tables", type: "2-seat" },
  { name: "tableFour", label: "4-seater tables", type: "4-seat" },
  { name: "tableSix", label: "6-seater tables", type: "6-seat" },
];

export default function TablesTypeCount({ control }: TablesTypeCountProps) {
  return (
    <div className="space-y-4">
      <FieldLabel className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
          <Table className="w-4 h-4 text-[#157aa2]" />
        </div>
        Table Types
      </FieldLabel>
      <div className="grid gap-4 md:grid-cols-3">
        {tableTypes.map((tableType) => (
          <Controller
            key={tableType.name}
            name={tableType.name}
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor={`form-${tableType.name}`}
                  className="text-sm font-medium text-gray-700"
                >
                  {tableType.label}
                </FieldLabel>
                <Input
                  {...field}
                  id={`form-${tableType.name}`}
                  type="number"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  min={0}
                  aria-invalid={fieldState.invalid}
                  placeholder="0"
                  className="h-12 rounded-xl border-2 border-gray-200 px-4 text-base
                           focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                           transition-all duration-300 hover:border-gray-300"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 text-sm"
                  />
                )}
              </Field>
            )}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Enter the number of tables available for each seating capacity.
      </p>
    </div>
  );
}
