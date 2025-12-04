import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
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

export const BasicDetails = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState({
    email: data.email,
    occupation: data.occupation,
    companyName: data.companyName,
    annualIncome: data.annualIncome,
    motherName: data.motherName,
  });
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    setCurrentStep(6);
  }, [setCurrentStep]);

  useEffect(() => {
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));
  }, [formData.email]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      isEmailValid &&
      formData.occupation &&
      formData.companyName &&
      formData.annualIncome &&
      formData.motherName
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    updateData(formData);
    navigate("/onboarding/product-selection");
  };

  return (
    <StepContainer title="Tell us about yourself" subtitle="This helps us serve you better">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`h-12 rounded-2xl border-2 transition-all duration-300 ${
              formData.email.length === 0
                ? "border-input"
                : isEmailValid
                ? "border-success bg-success/5"
                : "border-destructive bg-destructive/5"
            }`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-sm font-medium">
            Occupation *
          </Label>
          <Select value={formData.occupation} onValueChange={(value) => handleChange("occupation", value)}>
            <SelectTrigger className="h-12 rounded-2xl border-2">
              <SelectValue placeholder="Select occupation" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="salaried">Salaried</SelectItem>
              <SelectItem value="self-employed">Self Employed</SelectItem>
              <SelectItem value="business">Business Owner</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-medium">
            Company Name *
          </Label>
          <Input
            id="company"
            type="text"
            placeholder="Your company name"
            value={formData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            className="h-12 rounded-2xl border-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="income" className="text-sm font-medium">
            Annual Income *
          </Label>
          <Select value={formData.annualIncome} onValueChange={(value) => handleChange("annualIncome", value)}>
            <SelectTrigger className="h-12 rounded-2xl border-2">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="0-3">Below ₹3 Lakhs</SelectItem>
              <SelectItem value="3-5">₹3 - ₹5 Lakhs</SelectItem>
              <SelectItem value="5-10">₹5 - ₹10 Lakhs</SelectItem>
              <SelectItem value="10-25">₹10 - ₹25 Lakhs</SelectItem>
              <SelectItem value="25+">Above ₹25 Lakhs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mother" className="text-sm font-medium">
            Mother's Full Name *
          </Label>
          <Input
            id="mother"
            type="text"
            placeholder="Enter full name"
            value={formData.motherName}
            onChange={(e) => handleChange("motherName", e.target.value)}
            className="h-12 rounded-2xl border-2"
          />
        </div>

        <Button size="lg" onClick={handleSubmit} disabled={!isFormValid()} className="w-full">
          Continue
        </Button>
      </div>
    </StepContainer>
  );
};
