import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Info } from "lucide-react";

const STORAGE_KEY = "loan_application_final_sanction";

export const FinalSanction = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const sanction = {
    loanId: "PL" + Math.random().toString(36).substring(2, 11).toUpperCase(),
    amount: "₹5,00,000",
    interestRate: "10.99%",
    tenure: "24 months",
    emi: "₹23,448",
    processingFee: "₹5,000",
    netDisbursal: "₹4,95,000",
    revised: true,
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanction));
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleContinue = () => {
    navigate("/loan/disbursal-processing");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className={`transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                  Loan Sanctioned!
                </h1>
                <p className="text-muted-foreground text-base">
                  Your loan has been approved. Review your final offer below.
                </p>
              </div>
                <div className="rounded-2xl border-2 border-border bg-card p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Loan ID</span>
                    <span className="text-sm font-mono font-semibold text-foreground">{sanction.loanId}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Sanctioned Amount</span>
                      <span className="text-lg font-bold text-primary">{sanction.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Interest Rate (p.a.)</span>
                      <span className="text-sm font-semibold text-foreground">{sanction.interestRate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Tenure</span>
                      <span className="text-sm font-semibold text-foreground">{sanction.tenure}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Monthly EMI</span>
                      <span className="text-lg font-bold text-foreground">{sanction.emi}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Processing Fee</span>
                      <span className="text-sm font-semibold text-foreground">- {sanction.processingFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-foreground">Net Disbursal Amount</span>
                      <span className="text-lg font-bold text-success">{sanction.netDisbursal}</span>
                    </div>
                  </div>
                </div>

                {sanction.revised && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                    <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Note:</span> Your final sanctioned amount may differ from your initial eligibility based on our comprehensive assessment including income verification and credit profile.
                    </div>
                  </div>
                )}

                <div className="rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    What's Next?
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Review and sign loan agreement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Set up e-mandate for EMI payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Complete eSign verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Receive funds in your account</span>
                    </li>
                  </ul>
                </div>

              <Button size="lg" onClick={handleContinue} className="w-full h-12 rounded-2xl">
                Proceed to Agreement
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
