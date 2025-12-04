import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, CircleDot } from "lucide-react";

const STEPS = [
  { id: "mandate", label: "Verifying Mandate", duration: 2000 },
  { id: "aml", label: "AML Check", duration: 2000 },
  { id: "disbursal", label: "Processing Disbursal", duration: 2500 },
  { id: "done", label: "Transfer Complete", duration: 500 },
];

export const DisbursalProcessing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, STEPS[currentStep].duration);

      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        navigate("/loan/disbursal-success");
      }, 1000);

      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, navigate]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Processing Your Loan</h1>
              <p className="text-muted-foreground mt-2">
                We're transferring the funds to your account. This will take a moment.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {STEPS.map((step, index) => {
              const isComplete = index < currentStep;
              const isCurrent = index === currentStep;
              const isPending = index > currentStep;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                    isComplete
                      ? "bg-success/10 border-2 border-success"
                      : isCurrent
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-muted/50 border-2 border-border"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {isComplete ? (
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    ) : isCurrent ? (
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                    ) : (
                      <CircleDot className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        isComplete
                          ? "text-success"
                          : isCurrent
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </p>
                    {isComplete && (
                      <p className="text-xs text-success/70 mt-1">Completed</p>
                    )}
                    {isCurrent && (
                      <p className="text-xs text-primary/70 mt-1">In progress...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Please do not close this window or press back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
