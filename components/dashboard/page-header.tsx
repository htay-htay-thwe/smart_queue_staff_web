import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: ReactNode;
  eyebrow?: string;
};

export function PageHeader({
  title,
  description,
  icon: Icon,
  action,
  eyebrow,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="page-header-icon" aria-hidden="true">
          <Icon className="size-6" />
        </div>
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
