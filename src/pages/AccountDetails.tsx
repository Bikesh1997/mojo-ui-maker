import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import auLogo from "@/assets/au-logo.png";
import AccountDetailItem from "@/components/AccountDetailItem";
import KycBanner from "@/components/KycBanner";

const AccountDetails = () => {
  const navigate = useNavigate();

  // Mock account details - in a real app, this would come from the API/state
  const accountDetails = {
    customerId: "AUSF9876543210",
    accountNumber: "123456789012",
    ifscCode: "AUBL00234",
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
        <div className="bg-card rounded-2xl p-4 shadow-sm mb-4">
          <h2 className="text-base font-semibold text-foreground mb-3">Account Details</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <AccountDetailItem 
              label="Customer ID" 
              value={accountDetails.customerId} 
            />
            <AccountDetailItem 
              label="Account Number" 
              value={accountDetails.accountNumber} 
            />
            <AccountDetailItem 
              label="IFSC Code" 
              value={accountDetails.ifscCode} 
            />
            <AccountDetailItem 
              label="Average Monthly Balance" 
              value={accountDetails.avgMonthlyBalance} 
            />
            <div className="col-span-2">
              <AccountDetailItem 
                label="Branch Name" 
                value={accountDetails.branchName} 
              />
            </div>
            <div className="col-span-2">
              <AccountDetailItem 
                label="Branch Address" 
                value={accountDetails.branchAddress}
                isBold={false}
              />
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mb-4 p-4 bg-[#28A745]/10 border border-[#28A745]/20 rounded-2xl">
          <p className="text-sm text-[#28A745] font-medium">
            Your Cheque Book and Debit Card will be delivered to the verified address.
          </p>
        </div>

        {/* KYC Info Banner */}
        <KycBanner />

        {/* CTA Button */}
        <Button
          onClick={() => navigate("/kyc-permissions")}
          className="w-full h-12 text-base font-semibold rounded-xl"
          variant="secondary"
        >
          Complete KYC
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;
