import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Info, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const STORAGE_KEY = "loan_application_eligibility";

export const LoanEligibility = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  // Mock eligibility data
  const eligibility = {
    amount: 1000000, // 10 lakhs
    minEMI: 33333,
    interestRate: 13,
    maxTenure: 30,
    creditScore: 780,
  };

  useEffect(() => {
    // Save eligibility data to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eligibility));
    
    // Animate content after a brief delay
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-8">
          <div className={`space-y-8 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Success Icon */}
            {/* <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-success/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-success/10 p-6 rounded-full">
                  <CheckCircle2 className="h-16 w-16 text-success" />
                </div>
              </div>
            </div> */}

            {/* Header */}
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Congratulations! 🎉
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                You're eligible for a personal loan
              </p>
            </div>

            {/* Eligibility Card */}
            <Card className="border-2 border-success/20 bg-gradient-to-br from-success/5 to-success/10">
              <CardContent className="p-6 space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Maximum Eligible Amount</p>
                  <p className="text-5xl font-bold text-success">
                    ₹10 lakhs
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                    <p className="text-lg font-semibold text-foreground">{eligibility.interestRate}% p.a.</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Min. EMI</p>
                    <p className="text-lg font-semibold text-foreground">₹{eligibility.minEMI.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Max Tenure</p>
                    <p className="text-lg font-semibold text-foreground">{eligibility.maxTenure} months</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Credit Score</p>
                    <p className="text-lg font-semibold text-success">{eligibility.creditScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Competitive Interest Rate</p>
                  <p className="text-xs text-muted-foreground">Based on your credit profile</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Instant Disbursal</p>
                  <p className="text-xs text-muted-foreground">Funds in your account within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <Info className="h-5 w-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Flexible Repayment</p>
                  <p className="text-xs text-muted-foreground">Choose tenure that suits you best</p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <button className="flex items-start gap-2 w-full text-left">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">How eligibility is calculated: </span>
                  Based on your income, credit history, existing obligations, and credit score.
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <div className="w-full max-w-md mx-auto px-6">
          <Button
            size="lg"
            onClick={() => navigate("/loan/customise")}
            className="w-full"
          >
            Continue to Customise Loan
          </Button>
        </div>
      </div>
    </div>
  );
};
