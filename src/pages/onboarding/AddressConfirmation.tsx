import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { CheckCircle2, MapPin } from "lucide-react";

export const AddressConfirmation = () => {
  const navigate = useNavigate();
  const { data, setCurrentStep } = useOnboarding();
  const [sameAsAadhaar, setSameAsAadhaar] = useState(true);

  useEffect(() => {
    setCurrentStep(5);
  }, [setCurrentStep]);

  const handleProceed = () => {
    navigate("/onboarding/basic-details");
  };

  return (
    <StepContainer
      title="Confirm your address"
      // subtitle="We'll send your Debit Card and Cheque Book to this address"
    >
       <div className="p-4 rounded-2xl border border-success" style={{ backgroundColor: '#0E945C' }}>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#FFFFFF' }} />
            <p className="text-sm font-medium leading-relaxed" style={{ color: '#FFFFFF' }}>
              Your Debit Card and Cheque Book will be sent to your registered
              address.
            </p>
          </div>
        </div>
      <div className="space-y-6">
        <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-input hover:border-primary/50 transition-all duration-300">
          <Checkbox
            id="address-checkbox"
            checked={sameAsAadhaar}
            onCheckedChange={(checked) => setSameAsAadhaar(checked as boolean)}
            className="h-5 w-5"
          />
          <label
            htmlFor="address-checkbox"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Same as my Aadhaar Address
          </label>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2 flex-1">
              <p className="font-semibold text-foreground">{data.address.name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.address.street}
                <br />
                {data.address.city}, {data.address.state}
                <br />
                PIN: {data.address.pin}
              </p>
            </div>
          </div>
        </div>

       

        <Button size="lg" onClick={handleProceed} className="w-full">
          Proceed
        </Button>
      </div>
    </StepContainer>
  );
};
