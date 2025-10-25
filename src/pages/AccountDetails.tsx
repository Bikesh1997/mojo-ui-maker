import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Info } from "lucide-react";
import auLogo from "@/assets/au-logo.png";

const AccountDetails = () => {
  const navigate = useNavigate();

  // Mock account details - in a real app, this would come from the API/state
  const accountDetails = {
    customerId: "AUSF9876543210",
    accountNumber: "1234567890123456",
    ifscCode: "AUBL0002345",
    avgMonthlyBalance: "₹10,000",
    branchName: "Connaught Place Branch",
    branchAddress: "12, Connaught Place, New Delhi - 110001",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/")} className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <img src={auLogo} alt="AU Small Finance Bank" className="h-8" />
      </header>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Success Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Account Created Successfully!
          </h1>
          <p className="text-sm text-muted-foreground">
            Your savings account has been created. Here are your account details:
          </p>
        </div>

        {/* Account Details Card */}
        <div className="bg-card rounded-3xl p-6 shadow-card mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Account Details</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Customer ID</p>
              <p className="text-base font-semibold text-foreground">{accountDetails.customerId}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Number</p>
              <p className="text-base font-semibold text-foreground">{accountDetails.accountNumber}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">IFSC Code</p>
              <p className="text-base font-semibold text-foreground">{accountDetails.ifscCode}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Average Monthly Balance</p>
              <p className="text-base font-semibold text-foreground">{accountDetails.avgMonthlyBalance}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Branch Name</p>
              <p className="text-base font-semibold text-foreground">{accountDetails.branchName}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Branch Address</p>
              <p className="text-base font-normal text-foreground">{accountDetails.branchAddress}</p>
            </div>
          </div>
        </div>

        {/* KYC Info Banner */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-6 flex gap-3">
          <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Complete your KYC within 30 days
            </p>
            <p className="text-xs text-muted-foreground">
              To activate full account access and unlock all banking features, please complete your Video KYC verification.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => navigate("/kyc-permissions")}
          className="w-full h-12 text-base font-semibold"
          variant="default"
        >
          Complete KYC
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;
