import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { CheckCircle2, Crown, Sparkles } from "lucide-react";

export const ProductSelection = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [selected, setSelected] = useState<"digital" | "premium">(data.accountType);

  useEffect(() => {
    setCurrentStep(7);
  }, [setCurrentStep]);

  const handleContinue = () => {
    updateData({ accountType: selected });
    navigate("/onboarding/nominee");
  };

  return (
    <StepContainer title="Account Type" subtitle="Select the plan that fits your needs">
      <div className="space-y-6">
        <div
          onClick={() => setSelected("digital")}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 space-y-4 ${
            selected === "digital"
              ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">AU Digital Savings</h3>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                Your Choice
              </div>
            </div>
            {selected === "digital" && (
              <CheckCircle2 className="h-6 w-6 text-primary animate-success-pulse" />
            )}
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
              <span><b>Zero </b> minimum balance required</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
              <span>minimum balance required <b>10,000 </b></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
              <span>AU Value benefits included</span>
            </li>
          </ul>
        </div>

        <div
          onClick={() => setSelected("premium")}
          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 space-y-4 ${
            selected === "premium"
              ? "border-secondary bg-secondary/5 shadow-lg scale-[1.02]"
              : "border-border hover:border-secondary/50"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-secondary" />
                <h3 className="text-lg font-bold">AU Digital Savings Premium</h3>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                Popular
              </div>
            </div>
            {selected === "premium" && (
              <CheckCircle2 className="h-6 w-6 text-secondary animate-success-pulse" />
            )}
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
              <span>minimum balance required <b>25,000 </b></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
              <span>Dedicated Relationship Manager</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
              <span>Free cash deposits up to ₹2 Lakhs</span>
            </li>
         
          </ul>
        </div>

        <Button size="lg" onClick={handleContinue} className="w-full">
          Continue with {selected === "digital" ? "Digital" : "Premium"}
        </Button>
      </div>
    </StepContainer>
  );
};
