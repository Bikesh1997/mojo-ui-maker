import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Info } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "loan_application_customise";

export const CustomiseLoan = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);
  const [date, setDate] = useState<Date>();
  
  const maxAmount = 1000000;
  const minAmount = 50000;
  const interestRate = 13;

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setLoanAmount(data.loanAmount || 500000);
        setTenure(data.tenure || 24);
        if (data.date) {
          setDate(new Date(data.date));
        }
      } catch (e) {
        console.error("Failed to parse stored customise data");
      }
    }
  }, []);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (loanAmount || tenure || date) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ loanAmount, tenure, date: date?.toISOString() })
      );
    }
  }, [loanAmount, tenure, date]);
  
  // EMI Calculation: P × r × (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - loanAmount;
  const processingFee = Math.round(loanAmount * 0.02); // 2% processing fee
  const netDisbursal = loanAmount - processingFee;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Customise Your Loan</h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Adjust loan amount and tenure to fit your budget
              </p>
            </div>

            {/* Amount Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Loan Amount</Label>
                <span className="text-2xl font-bold text-primary">₹{loanAmount.toLocaleString()}</span>
              </div>
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                max={maxAmount}
                min={minAmount}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{minAmount.toLocaleString()}</span>
                <span>₹{maxAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Loan Tenure</Label>
                <span className="text-2xl font-bold text-secondary">{tenure} months</span>
              </div>
              <Slider
                value={[tenure]}
                onValueChange={(value) => setTenure(value[0])}
                max={60}
                min={6}
                step={6}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>6 months</span>
                <span>60 months</span>
              </div>
            </div>

            {/* EMI Summary Card */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6 space-y-4">
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                  <p className="text-4xl font-bold text-primary">₹{emi.toLocaleString()}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-semibold text-foreground">{interestRate}% p.a.</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-semibold text-foreground">₹{totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Amount Payable</span>
                    <span className="font-semibold text-foreground">₹{totalPayable.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Fee Info */}
            <Card className="bg-muted/50">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-sm text-foreground">Disbursal Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-medium text-foreground">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Fee (2%)</span>
                    <span className="font-medium text-foreground">- ₹{processingFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border/50">
                    <span className="font-semibold text-foreground">Net Disbursal</span>
                    <span className="font-bold text-success">₹{netDisbursal.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disbursement Date */}
            <div className="space-y-2">
              <Label>Disbursement Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-12 rounded-2xl",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select disbursement date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Info */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground p-3 rounded-lg bg-muted/30">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>EMI includes principal and interest. No prepayment charges after 6 months.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <div className="w-full max-w-md mx-auto px-6">
          <Button
            size="lg"
            onClick={() => navigate("/loan/bank-details")}
            disabled={!date}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
