import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Info } from "lucide-react";

const STORAGE_KEY = "loan_application_aadhaar";

export const AadhaarEntry = () => {
  const navigate = useNavigate();
  const [aadhaar, setAadhaar] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setAadhaar(data.aadhaar || "");
      } catch (e) {
        console.error("Failed to parse stored aadhaar data");
      }
    }
  }, []);

  useEffect(() => {
    if (aadhaar) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ aadhaar }));
    }
  }, [aadhaar]);

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
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("OTP sent successfully");
      navigate("/loan/aadhaar-otp");
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
                Verify Your Aadhaar
              </h1>
              <p className="text-muted-foreground text-base">
                We need your Aadhaar number to verify your identity and complete KYC as per RBI guidelines
              </p>
            </div>

            <div className="space-y-4">
              <Input
                inputMode="numeric"
                type="text"
                placeholder="1234 5678 9012"
                value={aadhaar}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                maxLength={14}
                className={`text-lg h-12 rounded-2xl border-2 transition-all duration-300 text-center tracking-widest ${
                  aadhaar.length === 0
                    ? "border-input"
                    : isValid
                    ? "border-success bg-success/5"
                    : "border-destructive bg-destructive/5"
                }`}
                autoFocus
              />

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
                className="w-full h-12 rounded-2xl"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
