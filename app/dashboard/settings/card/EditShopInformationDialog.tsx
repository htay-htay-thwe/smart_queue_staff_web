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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Store, Check, X, Utensils, FileText, Table } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

const formSchema = z
  .object({
    shopName: z.string().min(1, "* required"),
    shopType: z.string().min(1, "* required"),
    tableTwo: z.coerce.number().int().min(0, "* must be 0 or more"),
    tableFour: z.coerce.number().int().min(0, "* must be 0 or more"),
    tableSix: z.coerce.number().int().min(0, "* must be 0 or more"),
    description: z
      .string()
      .min(10, "* minimum 10 characters required")
      .max(500, "* maximum 500 characters allowed"),
  })
  .refine(
    (data) => data.tableTwo > 0 || data.tableFour > 0 || data.tableSix > 0,
    {
      message: "* Please enter at least one table type",
      path: ["tableTwo"],
    },
  );

type FormSchema = z.infer<typeof formSchema>;

export function EditShopInformationDialog() {
  const [descCharCount, setDescCharCount] = useState(0);
  const maxChars = 500;

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit" as const,
    defaultValues: {
      shopName: "",
      shopType: "",
      tableTwo: 0,
      tableFour: 0,
      tableSix: 0,
      description: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log("Shop data:", data);
    // Handle form submission - integrate with your backend
    toast.success("Shop information updated successfully!", {
      description: `${data.shopName} - ${data.shopType}`,
    });
  };

  const onError = (errors: any) => {
    console.log("Form errors:", errors);
    toast.error("Please fix the errors", {
      description: "Some required fields are missing or invalid",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-emerald-500 to-teal-600 text-white px-6 h-10 rounded-xl transition-all duration-300 hover:from-emerald-600 hover:to-teal-700 hover:scale-105 shadow-md hover:shadow-lg">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-0 shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit, onError)}>
          {/* Header with gradient background */}
          <div className="bg-linear-to-br from-emerald-500 to-teal-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <DialogHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4 animate-fade-in">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Store className="w-8 h-8 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center">
                <div className="text-2xl font-bold mb-2 animate-fade-in-delay-1">
                  Edit Shop Information
                </div>
                <p className="text-sm text-white/80 font-normal animate-fade-in-delay-2">
                  Update your restaurant details and table configuration
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Form content */}
          <div className="p-8 animate-fade-in-delay-3">
            <ScrollArea className="h-[60vh] pr-4">
              <FieldGroup className="space-y-6 pr-2">
                {/* Shop Title */}
                <Controller
                  name="shopName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="shopName"
                        className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
                      >
                        <Store className="w-4 h-4 text-emerald-500" />
                        Shop Title
                      </FieldLabel>
                      <Input
                        id="shopName"
                        {...field}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter shop name"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Shop Type */}
                <Controller
                  name="shopType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="shopType"
                        className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
                      >
                        <Utensils className="w-4 h-4 text-emerald-500" />
                        Shop Type
                      </FieldLabel>
                      <select
                        id="shopType"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        className="flex h-12 w-full items-center justify-between rounded-xl border-2 border-gray-200 bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                      >
                        {shopTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Description */}
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="description"
                        className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4 text-emerald-500" />
                        Description
                      </FieldLabel>
                      <div className="relative">
                        <Textarea
                          id="description"
                          placeholder="Tell us about your shop..."
                          {...field}
                          aria-invalid={fieldState.invalid}
                          rows={6}
                          maxLength={maxChars}
                          onChange={(e) => {
                            field.onChange(e);
                            setDescCharCount(e.target.value.length);
                          }}
                          className="rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 pb-8"
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-white px-2 rounded">
                          {descCharCount}/{maxChars}
                        </div>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Separator />

                {/* Table Types */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <Table className="w-4 h-4 text-emerald-500" />
                    Table Configuration
                  </Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Controller
                      name="tableTwo"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="tableTwo"
                            className="text-sm font-normal text-gray-600"
                          >
                            2-seater
                          </FieldLabel>
                          <Input
                            {...field}
                            id="tableTwo"
                            type="number"
                            min={0}
                            aria-invalid={fieldState.invalid}
                            placeholder="0"
                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                            value={(field.value as number) || 0}
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="tableFour"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="tableFour"
                            className="text-sm font-normal text-gray-600"
                          >
                            4-seater
                          </FieldLabel>
                          <Input
                            {...field}
                            id="tableFour"
                            type="number"
                            min={0}
                            aria-invalid={fieldState.invalid}
                            placeholder="0"
                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                            value={(field.value as number) || 0}
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="tableSix"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="tableSix"
                            className="text-sm font-normal text-gray-600"
                          >
                            6-seater
                          </FieldLabel>
                          <Input
                            {...field}
                            id="tableSix"
                            type="number"
                            min={0}
                            aria-invalid={fieldState.invalid}
                            placeholder="0"
                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                            value={(field.value as number) || 0}
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>
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
              className="flex-1 h-12 rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
