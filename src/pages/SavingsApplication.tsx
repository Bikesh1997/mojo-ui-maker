import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import auLogo from "@/assets/au-logo.png";

const SavingsApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "1997-10-24", // Pre-filled with dummy date for 28-year-old
    otp: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
      formData.mobile.match(/^[0-9]{10}$/) &&
      formData.otp.match(/^[0-9]{6}$/)
    );
  };

  const handleVerifyOTP = () => {
    if (isFormValid()) {
      setShowSuccessModal(true);
    }
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

      {/* Main Form Container */}
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Savings Account Application
          </h1>
          <p className="text-sm text-muted-foreground">
            Please fill in your details to continue
          </p>
        </div>

        <div className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
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
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
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
              value={formData.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  handleInputChange("mobile", value);
                }
              }}
              placeholder="Enter 10-digit mobile number"
              className="h-12 rounded-lg border-input bg-white text-foreground px-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input transition-all"
              maxLength={10}
            />
          </div>

          {/* Date of Birth (Disabled) */}
          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm font-medium text-foreground">
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="text"
              value={formData.dob}
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
              type="tel"
              value={formData.otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 6) {
                  handleInputChange("otp", value);
                }
              }}
              placeholder="Enter 6-digit OTP"
              className="h-12 rounded-lg border-input bg-white text-foreground px-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input transition-all"
              maxLength={6}
            />
          </div>

          {/* Verify OTP Button */}
          <Button
            onClick={handleVerifyOTP}
            disabled={!isFormValid()}
            className={cn(
              "w-full h-12 rounded-lg text-base font-semibold transition-all",
              isFormValid()
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Verify OTP
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <Check className="h-8 w-8 text-success" />
            </div>
            <DialogTitle className="text-xl font-bold">OTP Verified Successfully</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Your OTP has been verified. You can now proceed with your application.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
