import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9][0-9]{9}$/;

const SavingsApplication = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Pre-filled DOB for a 28-year-old (1997-10-24)
  const dob = "1997-10-24";

  const isFormValid = () => {
    return (
      fullName.trim() !== "" &&
      emailRegex.test(email) &&
      mobileRegex.test(mobile) &&
      otp.length === 6
    );
  };

  const handleVerifyOtp = () => {
    if (isFormValid()) {
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Form Container */}
      <div className="max-w-md mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Savings Account Application</h1>
        
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="h-12 rounded-lg border-input bg-white text-foreground px-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input transition-all"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-12 rounded-lg border-input bg-white text-foreground px-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input transition-all"
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-sm font-medium text-foreground">
            Mobile Number
          </Label>
          <Input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 10) {
                setMobile(value);
              }
            }}
            placeholder="Enter your mobile number"
            maxLength={10}
            className="h-12 rounded-lg border-input bg-white text-foreground px-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input transition-all"
          />
        </div>

        {/* Date of Birth - Pre-filled and Disabled */}
        <div className="space-y-2">
          <Label htmlFor="dob" className="text-sm font-medium text-foreground">
            Date of Birth
          </Label>
          <Input
            id="dob"
            type="text"
            value={dob}
            disabled
            className="h-12 rounded-lg border-input bg-muted text-muted-foreground px-4 cursor-not-allowed"
          />
        </div>

        {/* OTP */}
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-sm font-medium text-foreground">
            OTP
          </Label>
          <Input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 6) {
                setOtp(value);
              }
            }}
            placeholder="Enter OTP"
            maxLength={6}
            className="h-12 rounded-lg border-input bg-white text-foreground px-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input transition-all"
          />
        </div>

        {/* Verify OTP Button */}
        <Button
          onClick={handleVerifyOtp}
          disabled={!isFormValid()}
          className={cn(
            "w-full h-12 rounded-lg font-medium transition-all",
            !isFormValid() && "opacity-50 cursor-not-allowed"
          )}
        >
          Verify OTP
        </Button>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">OTP Verified Successfully</h2>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 px-8"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavingsApplication;
