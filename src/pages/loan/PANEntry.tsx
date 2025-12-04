import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "loan_application_pan";

export const PANEntry = () => {
  const navigate = useNavigate();
  const [pan, setPan] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setPan(data.pan || "");
        setName(data.name || "");
        setDob(data.dob || "");
      } catch (e) {
        console.error("Failed to parse stored PAN data");
      }
    }
  }, []);

  useEffect(() => {
    const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
    const nameValid = name.trim().length > 0;
    const dobValid = dob.length === 10 && /^\d{2}\/\d{2}\/\d{4}$/.test(dob);
    setIsValid(panValid && nameValid && dobValid);
  }, [pan, name, dob]);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (pan || name || dob) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ pan, name, dob }));
    }
  }, [pan, name, dob]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/\s/g, '').slice(0, 10);
    setPan(value);
    
    // Update input mode dynamically
    if (inputRef.current) {
      const len = value.length;
      if (len < 5 || len === 9) {
        inputRef.current.inputMode = 'text';
      } else if (len >= 5 && len < 9) {
        inputRef.current.inputMode = 'numeric';
      }
    }
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    setDob(value);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    setIsLoading(true);
    
    // Simulate API validation
    setTimeout(() => {
      setIsLoading(false);
      toast.success("PAN verified successfully");
      navigate("/loan/personal-details-review");
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
   <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto ">
        <div className="w-full max-w-md mx-auto ">
          <StepContainer
            title="Verify Your PAN"
            subtitle="Enter your PAN details for instant verification"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input
                  ref={inputRef}
                  id="pan"
                  type="text"
                  placeholder="ABCDE1234F"
                  value={pan}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  maxLength={10}
                  inputMode="text"
                  className={`text-lg h-14 rounded-2xl border-2 transition-all duration-300 text-center tracking-widest font-mono ${
                    pan.length === 0
                      ? "border-input"
                      : /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)
                      ? "border-success bg-success/5"
                      : "border-destructive bg-destructive/5"
                  }`}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name as per PAN</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter name as per PAN"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 rounded-2xl border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={dob}
                  onChange={handleDobChange}
                  maxLength={10}
                  inputMode="numeric"
                  className="h-14 rounded-2xl border-2"
                />
              </div>

              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!isValid || isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Proceed"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>PAN is required for credit bureau check</span>
              </div>

              <div className="text-xs text-muted-foreground text-center p-3 rounded-lg bg-muted/30">
                Your PAN information is securely encrypted. We fetch your credit score from authorized bureaus (CIBIL/Experian).
              </div>
            </div>
          </StepContainer>
        </div>
      </div>
    </div>
  );
};
