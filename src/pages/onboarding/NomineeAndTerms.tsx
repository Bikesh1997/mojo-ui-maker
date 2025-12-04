import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboarding } from "@/contexts/OnboardingContext";

export const NomineeAndTerms = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [addNominee, setAddNominee] = useState(data.addNominee);
  const [skipNominee, setSkipNominee] = useState(!data.addNominee);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nomineeData, setNomineeData] = useState(
    data.nomineeDetails || { name: "", relationship: "", dob: "" }
  );

  useEffect(() => {
    setCurrentStep(8);
  }, [setCurrentStep]);

  const handleAddNomineeChange = (checked: boolean) => {
    setAddNominee(checked);
    if (checked) setSkipNominee(false);
  };

  const handleSkipNomineeChange = (checked: boolean) => {
    setSkipNominee(checked);
    if (checked) setAddNominee(false);
  };

  const isFormValid = () => {
    if (!termsAccepted) return false;
    if (!addNominee && !skipNominee) return false;
    if (addNominee && (!nomineeData.name || !nomineeData.relationship || !nomineeData.dob))
      return false;
    return true;
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    setIsLoading(true);
    updateData({
      addNominee,
      nomineeDetails: addNominee ? nomineeData : undefined,
      termsAccepted,
      accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      customerId: Math.floor(100000 + Math.random() * 900000).toString(),
    });

    setTimeout(() => {
      setIsLoading(false);
      navigate("/onboarding/success");
    }, 2000);
  };

  return (
    <StepContainer title="Almost there!" subtitle="Just a couple more details">
      <div className="space-y-6">
        {/* Nominee Section */}
        <div className="space-y-4 p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground">Nominee Details (Optional)</h3>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="add-nominee"
              checked={addNominee}
              onCheckedChange={handleAddNomineeChange}
              className="h-5 w-5"
            />
            <label htmlFor="add-nominee" className="text-sm font-medium cursor-pointer">
              Add Nominee
            </label>
          </div>

          {addNominee && (
            <div className="space-y-4 pt-2 animate-slide-in">
              <div className="space-y-2">
                <Label htmlFor="nominee-name" className="text-sm font-medium">
                  Nominee Name *
                </Label>
                <Input
                  id="nominee-name"
                  type="text"
                  placeholder="Full name"
                  value={nomineeData.name}
                  onChange={(e) => setNomineeData({ ...nomineeData, name: e.target.value })}
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nominee-relation" className="text-sm font-medium">
                  Relationship *
                </Label>
                <Select
                  value={nomineeData.relationship}
                  onValueChange={(value) => setNomineeData({ ...nomineeData, relationship: value })}
                >
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nominee-dob" className="text-sm font-medium">
                  Date of Birth *
                </Label>
                <Input
                  id="nominee-dob"
                  type="date"
                  value={nomineeData.dob}
                  onChange={(e) => setNomineeData({ ...nomineeData, dob: e.target.value })}
                  className="h-12 rounded-2xl"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Checkbox
              id="skip-nominee"
              checked={skipNominee}
              onCheckedChange={handleSkipNomineeChange}
              className="h-5 w-5"
            />
            <label htmlFor="skip-nominee" className="text-sm font-medium cursor-pointer">
              I don't wish to add nominee details
            </label>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="p-4 rounded-2xl border-2 border-input hover:border-primary/50 transition-all duration-300">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="h-5 w-5 mt-0.5"
            />
            <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              I accept all the{" "}
              <button className="text-primary font-semibold hover:underline">
                terms and conditions
              </button>{" "}
              related to AU Small Finance Bank and confirm that I am a citizen of India.
            </label>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoading}
          className="w-full"
        >
          {isLoading ? "Creating your account..." : "Open My Account"}
        </Button>
      </div>
    </StepContainer>
  );
};
