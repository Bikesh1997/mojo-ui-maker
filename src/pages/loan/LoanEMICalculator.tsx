import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

export const LoanEMICalculator = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(810000);
  const [tenure, setTenure] = useState(42);
  const interestRate = 13; // Fixed at 13% annual

  // EMI Calculation
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = (interestRate / 12) / 100;
    const numberOfMonths = tenure;

    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths) / 
                (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    const totalAmount = emi * numberOfMonths;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    };
  };

  const { emi, totalInterest, totalAmount } = calculateEMI();

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                EMI Calculator
              </h1>
              <p className="text-muted-foreground text-base">
                Customize your loan to see monthly EMI
              </p>
            </div>

            {/* Loan Amount Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Loan Amount</label>
                <span className="text-lg font-bold text-orange-600">{formatCurrency(loanAmount)}</span>
              </div>
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                min={50000}
                max={1000000}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹50,000</span>
                <span>₹10,00,000</span>
              </div>
            </div>

            {/* Loan Tenure Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Loan Tenure</label>
                <span className="text-lg font-bold text-purple-600">{tenure} months</span>
              </div>
              <Slider
                value={[tenure]}
                onValueChange={(value) => setTenure(value[0])}
                min={6}
                max={60}
                step={1}
                className="w-full "
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6 months</span>
                <span>60 months</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="flex justify-between items-center p-4 rounded-xl bg-card border border-border">
              <label className="text-sm font-medium text-foreground">Interest Rate</label>
              <span className="text-lg font-bold text-foreground">{interestRate}% p.a.</span>
            </div>

            {/* EMI Output Card */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6 space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Monthly EMI</p>
                  <p className="text-4xl font-bold text-primary">
                    {formatCurrency(emi)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-lg font-semibold text-foreground">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                    <p className="text-lg font-semibold text-foreground">{formatCurrency(totalAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground text-center">
                <span className="font-medium text-foreground">Note: </span>
                The EMI calculation is indicative. Final EMI may vary based on your credit profile and loan approval.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <Button
          size="lg"
          onClick={() => navigate("/loan/additional-details")}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
