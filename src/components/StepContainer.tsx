import { ReactNode } from "react";

interface StepContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const StepContainer = ({ children, title, subtitle }: StepContainerProps) => {
  return (
    <div className="min-h-screen pt-20 p-6 animate-slide-in">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground tracking-tight text-center">{title}</h1>
          {subtitle && <p className="text-muted-foreground text-base leading-relaxed text-center">{subtitle}</p>}
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};
