import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import aul from "../../../public/aul.png";

const STORAGE_KEY = "loan_application_personal_review";

export const PersonalDetailsReview = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Rajesh Kumar",
    dob: "15 Aug 1990",
    address: "Flat 304, Viman Nagar, Pune, Maharashtra - 411014",
    gender: "Male",
    mobile: "+91 83XXX XXXXX",
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setFormData(data);
      } catch (e) {
        console.error("Failed to parse stored personal details");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleContinue = () => {
    navigate("/loan/basic-details");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Review Your Details
              </h1>
              <p className="text-muted-foreground text-base">
                Confirm your information fetched from Aadhaar and PAN
              </p>
            </div>

            {/* Details Card */}
            <Card className="p-6 rounded-2xl border-2 space-y-6">
              {/* Profile Image */}
              <div className="flex justify-center">
                <Avatar className="h-20 w-20 border-2 border-primary">
                  <AvatarFallback className="bg-primary/10">
                    {/* <User className="h-10 w-10 text-primary" /> */}
                    <img src={aul} />
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Details */}
              <div className="space-y-4 text-left">
                <div className="space-y-1 pb-3 border-b border-border">
                  <div className="text-sm text-muted-foreground">Full Name</div>
                  <div className="font-semibold text-foreground">
                    {formData.name}
                  </div>
                </div>

                <div className="space-y-1 pb-3 border-b border-border">
                  <div className="text-sm text-muted-foreground">
                    Date of Birth
                  </div>
                  <div className="font-semibold text-foreground">
                    {formData.dob}
                  </div>
                </div>

                <div className="space-y-1 pb-3 border-b border-border">
                  <div className="text-sm text-muted-foreground">Gender</div>
                  <div className="font-semibold text-foreground">
                    {formData.gender}
                  </div>
                </div>

                <div className="space-y-1 pb-3 border-b border-border">
                  <div className="text-sm text-muted-foreground">Address</div>
                  <div className="font-semibold text-foreground">
                    {formData.address}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Mobile Number
                  </div>
                  <div className="font-semibold text-foreground">
                    {formData.mobile}
                  </div>
                </div>
              </div>
            </Card>

            {/* Info Note */}
            <div className="text-xs text-muted-foreground text-center p-4 rounded-xl bg-muted/30">
              All loan communication will be sent to your registered mobile
              number
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
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
