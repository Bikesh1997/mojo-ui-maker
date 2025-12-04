import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";

export const MobileVerification = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [mobile, setMobile] = useState(data.mobile);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentStep(0);
  }, [setCurrentStep]);

  useEffect(() => {
    const valid = /^[6-9]\d{9}$/.test(mobile);
    setIsValid(valid);
  }, [mobile]);

  const handleSubmit = () => {
    if (!isValid) return;

    setIsLoading(true);
    updateData({ mobile });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/onboarding/aadhaar");
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
    <StepContainer
      title="Enter Aadhaar linked mobile number"
      subtitle="We'll send an OTP to this number for verification"
    >
      <div className="space-y-4">
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-3 border border-input rounded-2xl bg-muted/50 font-medium">
              +91
            </div>
            <Input
              type="tel"
              placeholder="Enter Aadhar-linked number"
               inputMode="numeric"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              onKeyPress={handleKeyPress}
              maxLength={10}
              className={`flex-1 text-lg h-14 rounded-2xl border-2 transition-all duration-300 ${
                mobile.length === 0
                  ? "border-input"
                  : isValid
                  ? "border-success bg-success/5 animate-success-pulse"
                  : "border-destructive bg-destructive/5 animate-shake"
              }`}
              autoFocus
            />
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className="w-full"
        >
          {isLoading ? "Continue..." : "Continue"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          By proceeding, you agree to receive SMS updates from AU Bank
        </p>
      </div>
    </StepContainer>
  );
};
