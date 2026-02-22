"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react";
import { useLoginShop } from "@/hooks/useRegister";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/loading";

const formSchema = z.object({
  email: z.string().min(1, "* required").email("* invalid email address"),
  password: z.string().min(8, "at least 8 characters required"),
});

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate: loginShopMutation, isPending } = useLoginShop(router);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    loginShopMutation(data);
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign In</h2>
        <p className="text-gray-500 text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="space-y-5">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="form-rhf-demo-email"
                  className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#157aa2]" />
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20 transition-all duration-300 px-4"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="form-rhf-demo-password"
                  className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#157aa2]" />
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    id="form-rhf-demo-password"
                    type={showPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20 transition-all duration-300 px-4 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#157aa2] transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Forgot Password */}
        <div className="mt-4 text-right">
          <Link
            href="/auth/loginPage/forgotPassword"
            className="text-sm text-[#157aa2] hover:text-[#1C7AA5] font-medium transition-colors duration-200"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          form="form-rhf-demo"
          className="w-full mt-6 h-12 bg-linear-to-r from-[#157aa2] to-[#1C7AA5] hover:from-[#1C7AA5] hover:to-[#157aa2] text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          Sign In
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">
            New to Smart Queue?
          </span>
        </div>
      </div>

      {/* Register Link */}
      <Link href="/auth/register">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 border-2 border-[#157aa2] text-[#157aa2] hover:bg-[#157aa2] hover:text-white text-base font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Register Account
        </Button>
      </Link>
        {isPending && <Loading />}
    </div>
  );
}
