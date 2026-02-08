import { cn } from "@/lib/utils";

const steps = ["Account", "Profile", "Confirm"];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isActive = index <= currentStep;

        return (
          <div key={step} className="flex items-center w-full">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border text-sm font-medium",
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground"
              )}
            >
              {index + 1}
            </div>

            <span className="ml-2 text-sm">{step}</span>

            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-4",
                  isActive ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
