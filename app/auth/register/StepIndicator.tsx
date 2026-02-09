import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const steps = [
  { number: 1, title: "Account", subtitle: "Basic Info" },
  { number: 2, title: "Profile", subtitle: "Details" },
  { number: 3, title: "Confirm", subtitle: "Finish" }
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-4 relative">
        {steps.map((step, index) => {
          const isActive = index + 1 <= currentStep;
          const isCompleted = index + 1 < currentStep;
          const isCurrent = index + 1 === currentStep;

          return (
            <div key={step.title} className="flex items-center">
              {/* Step Circle and Info */}
              <div className="flex flex-col items-center relative z-10">
                {/* Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-500 transform",
                    isActive ? "w-8 h-8" : "w-6 h-6",
                    isCurrent && "scale-110 shadow-lg",
                    isCompleted && "bg-linear-to-br from-green-400 to-green-600",
                    isCurrent && "bg-linear-to-br from-[#157aa2] to-[#1C7AA5] shadow-xl ring-4 ring-blue-200",
                    !isActive && "bg-gray-200 border-2 border-gray-300"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-white animate-fade-in" />
                  ) : (
                    <span
                      className={cn(
                        "text-lg font-bold transition-colors duration-300",
                        isActive ? "text-white" : "text-gray-500"
                      )}
                    >
                      {step.number}
                    </span>
                  )}
                </div>

                {/* Step Title */}
                <div className="mt-3 text-center">
                  <p
                    className={cn(
                      "text-sm font-semibold transition-colors duration-300",
                      isActive ? "text-gray-800" : "text-gray-400"
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{step.subtitle}</p>
                </div>
              </div>

              {/* Progress Line */}
              {index !== steps.length - 1 && (
                <div className="w-24 md:w-32 h-1 mx-4 relative -mt-8">
                  {/* Background line */}
                  <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                  {/* Active line with gradient */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full transition-all duration-700 ease-out",
                      isActive
                        ? "bg-linear-to-r from-[#157aa2] to-[#1C7AA5] w-full"
                        : "w-0"
                    )}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
