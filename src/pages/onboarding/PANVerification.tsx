import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";

export const PANVerification = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [pan, setPan] = useState(data.pan || "");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  useEffect(() => {
    const valid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
    setIsValid(valid);
  }, [pan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/\s/g, '').slice(0, 10);
    setPan(value);
    
    // Update input mode dynamically based on position
    if (inputRef.current) {
      const len = value.length;
      if (len < 5 || len === 9) {
        inputRef.current.inputMode = 'text';
      } else if (len >= 5 && len < 9) {
        inputRef.current.inputMode = 'numeric';
      }
    }
  };

  const handleSubmit = () => {
    if (!isValid) return;

    setIsLoading(true);
    updateData({ pan });

    setTimeout(() => {
      setIsLoading(false);
      navigate("/onboarding/dob");
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
    <StepContainer
      title="Enter your PAN"
      subtitle=""
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="AAAAA1111A"
            value={pan}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            maxLength={10}
            inputMode="text"
            className={`text-lg h-14 rounded-2xl border-2 transition-all duration-300 text-center tracking-widest font-mono ${
              pan.length === 0
                ? "border-input"
                : isValid
                ? "border-success bg-success/5 animate-success-pulse"
                : "border-destructive bg-destructive/5 animate-shake"
            }`}
            autoFocus
          />
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
          Your PAN information is secure and encrypted
        </p>
      </div>
    </StepContainer>
  );
};
