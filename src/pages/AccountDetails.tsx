import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import auLogo from "@/assets/au-logo.png";
import { useState, useEffect } from "react";

const AccountDetails = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
      <div className="px-6 py-6 space-y-4">
        {/* Success Card */}
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Congratulations!
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Your savings account has been opened
          </p>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Customer ID</p>
              <p className="text-base font-semibold text-foreground">563387272</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Number</p>
              <p className="text-base font-semibold text-foreground">123465789654</p>
            </div>
          </div>
        </div>

        {/* KYC Prompt */}
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <p className="text-sm text-foreground mb-4">
            Your KYC is pending. Complete it using the vKYC option below.
          </p>
          <Button
            onClick={() => navigate("/kyc-permissions")}
            className="w-full h-12 text-base font-semibold rounded-xl"
            variant="solid"
          >
            Complete vKYC
          </Button>
        </div>

        {/* Bank Representative Connection Box */}
        <div className="bg-card rounded-xl p-6 shadow-sm text-center">
          <p className="text-sm text-foreground mb-3">
            We are connecting you with your bank representative
          </p>
          <div className="text-2xl font-bold text-primary mb-4">
            {formatTimer(timer)}
          </div>
          <p className="text-sm text-muted-foreground">Connecting...</p>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
