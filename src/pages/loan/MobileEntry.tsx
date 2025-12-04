import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STORAGE_KEY = "loan_application_mobile";

export const MobileEntry = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setMobile(data.mobile || "");
      } catch (e) {
        console.error("Failed to parse stored data");
      }
    }
  }, []);

  // Validate mobile number
  useEffect(() => {
    const valid = /^[6-9]\d{9}$/.test(mobile);
    setIsValid(valid);
  }, [mobile]);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (mobile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mobile }));
    }
  }, [mobile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    setIsLoading(true);

    // Simulate API call - Skip OTP, go directly to Aadhaar
    setTimeout(() => {
      setIsLoading(false);
      toast.success("OTP sent successfully");
      navigate("/loan/mobile-otp");
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Enter Aadhaar linked mobile number
              </h1>
              <p className="text-muted-foreground text-base">
                We'll send an OTP to verify your number and start your loan application
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center px-4 py-3 border-2 border-input rounded-2xl bg-muted/50 font-medium h-12">
                  +91
                </div>
                <Input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  maxLength={10}
                  className={`flex-1 text-lg h-12 rounded-2xl border-2 transition-all duration-300 ${
                    mobile.length === 0
                      ? "border-input"
                      : isValid
                      ? "border-success bg-success/5"
                      : "border-destructive bg-destructive/5"
                  }`}
                  autoFocus
                />
              </div>

              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!isValid || isLoading}
                className="w-full h-12 rounded-2xl"
              >
                {isLoading ? "Verifying..." : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
