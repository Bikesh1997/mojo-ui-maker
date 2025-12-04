import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";

export const DateOfBirth = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [displayValue, setDisplayValue] = useState("");
  const [isoDate, setIsoDate] = useState(data.dob);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  useEffect(() => {
    if (!isoDate) {
      setIsValid(false);
      setErrorMessage("");
      return;
    }

    const dobDate = new Date(isoDate);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      const adjustedAge = age - 1;
      if (adjustedAge < 18) {
        setIsValid(false);
        setErrorMessage("You must be at least 18 years old");
        return;
      }
    } else if (age < 18) {
      setIsValid(false);
      setErrorMessage("You must be at least 18 years old");
      return;
    }

    setIsValid(true);
    setErrorMessage("");
  }, [isoDate]);

  const handleSubmit = () => {
    if (!isValid) return;

    updateData({ dob: isoDate });
    setTimeout(() => {
      navigate("/onboarding/address");
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
    <StepContainer
      title="Enter Birth Date"
      subtitle="You must be at least 18 years old to open a savings account"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            inputMode="numeric"
            placeholder="DD/MM/YYYY"
            value={displayValue}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              
              // Limit to 8 digits (DDMMYYYY)
              if (value.length > 8) value = value.slice(0, 8);
              
              // Format as DD/MM/YYYY
              let formatted = value;
              if (value.length >= 2) {
                formatted = value.slice(0, 2) + '/' + value.slice(2);
              }
              if (value.length >= 4) {
                formatted = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
              }
              
              setDisplayValue(formatted);
              
              // Only set ISO date when we have complete date
              if (value.length === 8) {
                const day = value.slice(0, 2);
                const month = value.slice(2, 4);
                const year = value.slice(4, 8);
                setIsoDate(`${year}-${month}-${day}`);
              } else {
                setIsoDate("");
              }
            }}
            onKeyPress={handleKeyPress}
            maxLength={10}
            className={`text-lg h-14 rounded-2xl transition-all duration-300 text-center ${
              displayValue.length === 0
                ? "border-input"
                : isValid
                ? "border-success bg-success/5 animate-success-pulse"
                : "border-destructive bg-destructive/5 animate-shake"
            }`}
            autoFocus
          />
          {errorMessage && (
            <p className="text-sm text-destructive font-medium animate-fade-in">{errorMessage}</p>
          )}
        </div>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </StepContainer>
  );
};
