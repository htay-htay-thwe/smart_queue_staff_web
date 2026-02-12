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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Check, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  companyName: z.string().min(1, "* required"),
});

type FormSchema = z.infer<typeof formSchema>;

export function EditCompanyName() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit" as const,
    defaultValues: {
      companyName: "H2T Company Ltd.",
    },
  });

  function onSubmit(data: FormSchema) {
    console.log("Company Name Updated:", data.companyName);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-orange-500 to-amber-600 text-white px-6 h-10 rounded-lg transition-all duration-300 hover:from-orange-600 hover:to-amber-700 hover:scale-105 shadow-md hover:shadow-lg">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header with gradient background */}
          <div className="bg-linear-to-br from-orange-500 to-amber-600 p-8 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

            <DialogHeader className="relative z-10">
              <div className="flex items-center justify-center mb-4 animate-fade-in">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <DialogTitle className="text-center">
                <div className="text-2xl font-bold mb-2 animate-fade-in-delay-1">
                  Edit Company Name
                </div>
                <p className="text-sm text-white/80 font-normal animate-fade-in-delay-2">
                  Update your business company name
                </p>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Form content */}
          <div className="p-8 animate-fade-in-delay-3">
            <FieldGroup className="space-y-6">
              <Controller
                name="companyName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Label
                      htmlFor="companyName"
                      className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
                    >
                      <Building2 className="w-4 h-4 text-orange-500" />
                      Company Name
                    </Label>
                    <Input
                      {...field}
                      id="companyName"
                      aria-invalid={fieldState.invalid}
                      type="text"
                      defaultValue="H2T Company Ltd."
                      placeholder="Enter company name"
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          {/* Footer with buttons */}
          <DialogFooter className="px-8 pb-8 pt-0 gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="form-rhf-demo"
              className="flex-1 h-12 rounded-xl bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
