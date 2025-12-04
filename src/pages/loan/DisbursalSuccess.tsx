import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Home } from "lucide-react";

export const DisbursalSuccess = () => {
  const navigate = useNavigate();

  const loanDetails = {
    loanId: "PL" + Math.random().toString(36).substring(2, 11).toUpperCase(),
    amount: "₹4,95,000",
    accountNumber: "****6789",
    bankName: "ICICI Bank",
  };

  useEffect(() => {
    // Clear loan application data from local storage on success
    const keysToRemove = [
      "loan_application_mobile",
      "loan_application_aadhaar",
      "loan_application_pan",
      "loan_application_bank_statement",
      "loan_application_final_sanction",
      "loan_application_kfs_agreement",
      "loan_application_emandate",
      "loan_application_esign",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }, []);

  const handleDownloadReceipt = () => {
    // Implement receipt download
    console.log("Downloading receipt...");
  };

  const handleGoToDashboard = () => {
    navigate("/loan/dashboard");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-success/5 to-background">
      <div className="flex-1 overflow-y-auto  pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-8">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="mx-auto w-24 h-24 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="h-14 w-14 text-success" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Loan Disbursed Successfully!</h1>
              <p className="text-muted-foreground">
                Congratulations! Your loan has been credited to your account.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-success bg-success/5 p-6 space-y-4 text-left">
              <div className="flex justify-between items-center pb-3 border-b border-success/20">
                <span className="text-sm text-muted-foreground">Loan ID</span>
                <span className="text-sm font-mono font-semibold text-foreground">{loanDetails.loanId}</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Disbursed Amount</span>
                  <span className="text-2xl font-bold text-success">{loanDetails.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Credited To</span>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{loanDetails.accountNumber}</p>
                    <p className="text-xs text-muted-foreground">{loanDetails.bankName}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              variant="outline"
              onClick={handleDownloadReceipt}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>

            <div className="rounded-xl bg-muted/50 p-4 text-left space-y-3">
              <h3 className="text-sm font-semibold text-foreground">What's Next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Your first EMI will be auto-debited on the due date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>View EMI schedule and manage repayments from your dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>You can prepay or foreclose your loan anytime</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-primary/10 p-4 text-left">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Need Help?</span> Contact our customer support at{" "}
                <a href="tel:18004194332" className="text-primary font-semibold">
                  1800 419 4332
                </a>{" "}
                or email{" "}
                <a href="mailto:support@idfcfirstbank.com" className="text-primary font-semibold">
                  support@idfcfirstbank.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <div className="w-full max-w-md mx-auto">
          <Button size="lg" onClick={handleGoToDashboard} className="w-full">
            <Home className="mr-2 h-4 w-4" />
            Go to Loan Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
