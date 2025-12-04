import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import {
  CheckCircle2,
  PartyPopper,
  CreditCard,
  Shield,
  Video,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import agent from "../../../public/agent.png";

export const AccountSuccess = () => {
  const navigate = useNavigate();
  const { data, setCurrentStep } = useOnboarding();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    setCurrentStep(7);
  }, [setCurrentStep]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/onboarding/kyc-prompt");
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Success Icon */}
        {/* <div className="flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center shadow-xl animate-success-pulse">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <PartyPopper className="h-8 w-8 text-primary animate-bounce" />
            </div>
          </div>
        </div> */}

        {/* Success Message */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            Congratulations!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your Savings Account has been created.
          </p>
        </div>

        {/* Account Card */}
        <div className="p-6 rounded-2xl bg-secondary from-primary/10 via-card to-secondary/10 border border-border shadow-xl space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-xl font-bold text-white">AU</span>
            </div>
            <div>
              <p className="text-sm text-white">AU Small Finance Bank</p>
              <p className="font-semibold text-white">
                Digital Savings Account
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">Customer ID</span>
              <span className="font-mono font-semibold text-white">
                {data.customerId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">Account Number</span>
              <span className="font-mono font-semibold text-white">
                {data.accountNumber}
              </span>
            </div>
          </div>
        </div>

        {/* KYC Card */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-foreground text-center">
            KYC is your next step
          </h2>

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

        {/* Features */}
        {/* <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-card border border-border text-center space-y-2">
            <CreditCard className="h-6 w-6 text-primary mx-auto" />
            <p className="text-xs font-medium text-muted-foreground">Free Debit Card</p>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border text-center space-y-2">
            <Shield className="h-6 w-6 text-success mx-auto" />
            <p className="text-xs font-medium text-muted-foreground">100% Secure</p>
          </div>
        </div> */}

        {/* CTA */}
        <Button
          size="lg"
          onClick={() => navigate("/onboarding/kyc-prompt")}
          className="w-full"
          variant="outline"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
};
