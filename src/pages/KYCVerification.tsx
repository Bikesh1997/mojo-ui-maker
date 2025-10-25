import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Video, CheckCircle2 } from "lucide-react";
import auLogo from "@/assets/au-logo.png";

const KYCVerification = () => {
  const navigate = useNavigate();
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  const handleStartVerification = () => {
    setVerificationStarted(true);
    // Simulate video KYC process
    setTimeout(() => {
      setVerificationComplete(true);
    }, 3000);
  };

  const handleComplete = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <img src={auLogo} alt="AU Small Finance Bank" className="h-8" />
      </header>

      {/* Content */}
      <div className="px-6 py-6 flex flex-col items-center justify-center min-h-[calc(100vh-72px)]">
        {!verificationStarted ? (
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Video className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Ready for Video KYC?
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Please ensure you're in a well-lit area and have your PAN card ready. The verification will take approximately 2-3 minutes.
            </p>
            <Button
              onClick={handleStartVerification}
              className="w-full h-12 text-base font-semibold"
              variant="default"
            >
              Start Verification
            </Button>
          </div>
        ) : !verificationComplete ? (
          <div className="text-center max-w-md">
            <div className="w-64 h-64 mx-auto mb-6 bg-muted rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse" />
              <Video className="w-20 h-20 text-primary relative z-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Verification in Progress
            </h2>
            <p className="text-sm text-muted-foreground">
              Please follow the instructions from our representative...
            </p>
          </div>
        ) : (
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              KYC Verified Successfully!
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Your Video KYC has been completed successfully. Your account is now fully activated with all features unlocked.
            </p>
            <Button
              onClick={handleComplete}
              className="w-full h-12 text-base font-semibold"
              variant="secondary"
            >
              Continue to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerification;
