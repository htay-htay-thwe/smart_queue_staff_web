import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Control, Controller } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
interface PasswordFieldProps {
  control: Control<any>;
}

export const PasswordCreate = ({ control }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            htmlFor="form-rhf-demo-password"
            className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
              <Lock className="w-4 h-4 text-[#157aa2]" />
            </div>
            Password
          </FieldLabel>
          <div className="relative">
            <Input
              {...field}
              id="form-rhf-demo-password"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your password"
              autoComplete="off"
              onChange={(e) => {
                field.onChange(e);
              }}
              type={showPassword ? "text" : "password"}
              className="h-14 w-full rounded-xl border-2 border-gray-200 px-4 text-base
                       focus:border-[#157aa2] focus:ring-2 focus:ring-[#157aa2]/20
                       transition-all duration-300 hover:border-gray-300 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-[#157aa2] focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {fieldState.invalid && (
            <FieldError
              errors={[fieldState.error]}
              className="text-red-500 text-sm mt-1"
            />
          )}
        </Field>
      )}
    />
  );
};

export default PasswordCreate;
