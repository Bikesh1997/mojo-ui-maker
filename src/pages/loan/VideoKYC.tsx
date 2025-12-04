import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Video } from "lucide-react";
import agent from "../../../public/agent.png";

export const VideoKYC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/loan/kyc-prompt");
    }
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Video KYC
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Connect with your bank representative for video KYC
              </p>
            </div>

            {/* KYC Card */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-lg space-y-4">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Connect with your bank representative for video KYC.
                </p>

                {/* Agent Avatar */}
                <div className="flex justify-center">
                  <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage src={agent} alt="Bank Representative" />
                    <AvatarFallback>BR</AvatarFallback>
                  </Avatar>
                </div>

                {/* Countdown Timer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Video className="h-5 w-5 text-primary animate-pulse" />
                    <p className="text-sm font-medium text-foreground">
                      Connecting to your bank representative...
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {countdown}s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <div className="w-full max-w-md mx-auto px-6">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/loan/kyc-prompt")}
            className="w-full"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};
