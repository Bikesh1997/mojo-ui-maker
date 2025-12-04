import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const OTPVerification = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    // Auto-verify when all 6 digits are entered
    if (otp.every((digit) => digit !== "")) {
      verifyOTP();
    }
  }, [otp]);

  const verifyOTP = async () => {
    const otpValue = otp.join("");
    setIsVerifying(true);
    setError(false);

    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      
      // Accept any 6-digit OTP
      if (otpValue.length === 6) {
        updateData({ otp: otpValue });
        toast.success("Aadhaar verified successfully");
        navigate("/onboarding/pan");
      } else {
        setError(true);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        toast.error("Invalid OTP. Please try again.");
      }
    }, 1500);
  };

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);
      
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setError(false);
    inputRefs.current[0]?.focus();
    toast.success("OTP resent successfully");
  };

  return (
    <StepContainer
      title="Verify OTP"
      subtitle="Enter the 6-digit OTP sent to your Aadhaar-linked mobile number"
    >
      <div className="space-y-6">
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isVerifying}
              className={`w-12 h-14 text-center text-xl font-semibold rounded-2xl border-2 transition-all duration-300 ${
                error
                  ? "border-destructive bg-destructive/5 animate-shake"
                  : digit
                  ? "border-primary bg-primary/5"
                  : "border-input"
              } ${index === 5 && isVerifying ? "relative" : ""}`}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {isVerifying && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Verifying OTP...</span>
          </div>
        )}

        {error && (
          <div className="text-sm text-destructive text-center p-3 rounded-lg bg-destructive/10">
            Incorrect OTP. Please try again.
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-sm">
          {canResend ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResend}
              className="text-primary hover:text-primary/80"
            >
              Resend OTP
            </Button>
          ) : (
            <span className="text-muted-foreground">
              Resend OTP in {timer}s
            </span>
          )}
        </div>

        <div className="text-xs text-muted-foreground text-center p-3 rounded-lg bg-muted/30">
          For testing, use OTP: <span className="font-mono font-semibold">123456</span>
        </div>
      </div>
    </StepContainer>
  );
};
