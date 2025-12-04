import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Info } from "lucide-react";
import { toast } from "sonner";

export const AadhaarVerification = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [aadhaar, setAadhaar] = useState(data.aadhaar || "");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  useEffect(() => {
    const cleaned = aadhaar.replace(/\s/g, "");
    const valid = /^\d{12}$/.test(cleaned);
    setIsValid(valid);
  }, [aadhaar]);

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 12);
    const parts = cleaned.match(/.{1,4}/g);
    return parts ? parts.join(" ") : cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaar(formatted);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    setIsLoading(true);
    updateData({ aadhaar: aadhaar.replace(/\s/g, "") });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("OTP sent successfully");
      navigate("/onboarding/otp");
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
    <StepContainer
      title="Verify Your Aadhaar"
      subtitle="We need your Aadhaar number to verify your identity and complete KYC as per RBI guidelines"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Input
            id="aadhaar"
            inputMode="numeric"
            type="text"
            placeholder="1234 5678 9012"
            value={aadhaar}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            maxLength={14}
            className={`text-lg h-14 rounded-2xl border-2 transition-all duration-300 text-center tracking-widest ${
              aadhaar.length === 0
                ? "border-input"
                : isValid
                ? "border-success bg-success/5"
                : "border-destructive bg-destructive/5"
            }`}
            autoFocus
          />
        </div>

        <div className="flex text-sm text-muted-foreground text-center p-4 rounded-xl bg-muted/70">
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="text-sm text-muted-foreground">
          We don't store your Aadhaar number. It's verified securely through the UIDAI e-KYC API, and the entire process follows RBI's Digital Lending guidelines for your safety.
        </div>
        </div>
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className="w-full"
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </Button>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <button className="underline hover:text-foreground transition-colors">
            Why do we need this?
          </button>
        </div>
      </div>
    </StepContainer>
  );
};
