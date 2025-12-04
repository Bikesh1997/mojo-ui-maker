import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const AadhaarOTPVerify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");

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
    // Auto-verify when OTP is complete
    if (otp.length === 6) {
      handleVerify(otp);
    }
  }, [otp]);

  const handleVerify = async (otpValue: string) => {
    setIsVerifying(true);
    setError("");

    // Simulate API verification - Always pass, accept any 6-digit OTP
    setTimeout(() => {
      toast.success("Aadhaar verified successfully");
      navigate("/loan/pan");
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setTimer(30);
    setCanResend(false);
    setError("");
    toast.success("OTP sent successfully");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Verify OTP 
              </h1>
              <p className="text-muted-foreground text-base">
                Enter the 6-digit OTP sent to your Aadhaar-linked mobile number
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setError("");
                  }}
                  disabled={isVerifying}
                >
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className={`h-14 w-12 text-lg rounded-xl border-2 transition-all mr-2 ${
                          error
                            ? "border-destructive bg-destructive/5 animate-shake"
                            : otp.length === 6
                            ? "border-success bg-success/5"
                            : isVerifying && index === 5
                            ? "border-primary"
                            : "border-input"
                        }`}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {isVerifying && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying OTP...</span>
                </div>
              )}

              {error && (
                <div className="text-sm text-destructive text-center p-3 rounded-lg bg-destructive/10">
                  {error}
                </div>
              )}

              <div className="text-center space-y-2">
                {!canResend ? (
                  <p className="text-sm text-muted-foreground">
                    Resend OTP in <span className="font-semibold text-foreground">{timer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="text-xs text-muted-foreground text-center p-3 rounded-lg bg-muted/30">
                OTP is valid for 10 minutes. Do not share your OTP with anyone.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
