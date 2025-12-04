import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export const KYCSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/loan/final-sanction");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-8">
          <div className="space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
                <div className="relative bg-success/10 rounded-full p-6">
                  <CheckCircle2 className="h-24 w-24 text-success" />
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                KYC Verified Successfully
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Your identity has been verified successfully. Proceeding to final sanction...
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center">
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-bounce [animation-delay:-0.3s]" />
                <div className="h-2 w-2 rounded-full bg-success animate-bounce [animation-delay:-0.15s]" />
                <div className="h-2 w-2 rounded-full bg-success animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
