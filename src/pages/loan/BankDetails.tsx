import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "loan_application_bank_details";

export const BankDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ifscCode: "",
    accountHolderName: "",
    accountNumber: "",
    accountType: "",
    branchName: "",
    bankName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFormData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored bank details");
      }
    }
  }, []);

  useEffect(() => {
    if (formData.ifscCode || formData.accountNumber) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFetchBankDetails = async () => {
    if (!formData.ifscCode.trim() || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      setErrors({ ifscCode: "Please enter a valid IFSC code" });
      return;
    }

    setIsFetching(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        bankName: "State Bank of India",
        branchName: "MG Road Branch",
      }));
      setIsFetching(false);
      toast({
        title: "Bank details fetched",
        description: "Bank information has been auto-filled",
      });
    }, 1500);
  };

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.ifscCode.trim() || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Please enter a valid IFSC code";
    }

    if (!formData.accountHolderName.trim() || !/^[a-zA-Z\s]+$/.test(formData.accountHolderName)) {
      newErrors.accountHolderName = "Please enter a valid account holder name";
    }

    if (!formData.accountNumber.trim() || !/^\d{9,18}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Please enter a valid account number";
    }

    if (!formData.accountType) {
      newErrors.accountType = "Please select account type";
    }

    if (!formData.branchName.trim()) {
      newErrors.branchName = "Please enter branch name";
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Please enter bank name";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate("/loan/video-kyc");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Bank Details
              </h1>
              <p className="text-muted-foreground text-base">
                Enter your bank account details for loan disbursal
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  type="text"
                  inputMode="numeric"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter account number"
                  className={`h-12 rounded-2xl border-2 ${
                    errors.accountNumber ? "border-destructive" : ""
                  }`}
                />
                {errors.accountNumber && (
                  <p className="text-sm text-destructive">{errors.accountNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountHolderName">Account Holder's Name</Label>
                <Input
                  id="accountHolderName"
                  type="text"
                  value={formData.accountHolderName}
                  onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                  placeholder="Enter account holder name"
                  className={`h-12 rounded-2xl border-2 ${
                    errors.accountHolderName ? "border-destructive" : ""
                  }`}
                />
                {errors.accountHolderName && (
                  <p className="text-sm text-destructive">{errors.accountHolderName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select
                  value={formData.accountType}
                  onValueChange={(value) => handleInputChange("accountType", value)}
                >
                  <SelectTrigger className={`h-12 rounded-2xl border-2 ${
                    errors.accountType ? "border-destructive" : ""
                  }`}>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="current">Current Account</SelectItem>
                    <SelectItem value="salary">Salary Account</SelectItem>
                  </SelectContent>
                </Select>
                {errors.accountType && (
                  <p className="text-sm text-destructive">{errors.accountType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ifscCode">IFSC Code</Label>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <Input
                      id="ifscCode"
                      type="text"
                      value={formData.ifscCode}
                      onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                      placeholder="Enter IFSC code"
                      className={`h-12 rounded-2xl border-2 ${
                        errors.ifscCode ? "border-destructive" : ""
                      }`}
                      maxLength={11}
                    />
                    <p className="text-xs text-muted-foreground">Example: SBIN0000692</p>
                  </div>
                  <Button
                    onClick={handleFetchBankDetails}
                    disabled={isFetching || !formData.ifscCode}
                    className="h-12 rounded-2xl px-6"
                  >
                    {isFetching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Fetch"
                    )}
                  </Button>
                </div>
                {errors.ifscCode && (
                  <p className="text-sm text-destructive">{errors.ifscCode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name</Label>
                <Input
                  id="branchName"
                  type="text"
                  value={formData.branchName}
                  onChange={(e) => handleInputChange("branchName", e.target.value)}
                  placeholder="Enter branch name"
                  className={`h-12 rounded-2xl border-2 ${
                    errors.branchName ? "border-destructive" : ""
                  }`}
                  disabled={isFetching}
                />
                {errors.branchName && (
                  <p className="text-sm text-destructive">{errors.branchName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  placeholder="Enter bank name"
                  className={`h-12 rounded-2xl border-2 ${
                    errors.bankName ? "border-destructive" : ""
                  }`}
                  disabled={isFetching}
                />
                {errors.bankName && (
                  <p className="text-sm text-destructive">{errors.bankName}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <div className="w-full max-w-md mx-auto px-6">
          <Button
            size="lg"
            onClick={handleContinue}
            className="w-full h-12 rounded-2xl"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
