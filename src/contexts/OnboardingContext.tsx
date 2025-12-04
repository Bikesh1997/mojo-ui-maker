import React, { createContext, useContext, useState, ReactNode } from "react";

export interface OnboardingData {
  mobile: string;
  aadhaar: string;
  pan: string;
  dob: string;
  otp: string;
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    pin: string;
  };
  email: string;
  occupation: string;
  companyName: string;
  annualIncome: string;
  motherName: string;
  accountType: "digital" | "premium";
  addNominee: boolean;
  nomineeDetails?: {
    name: string;
    relationship: string;
    dob: string;
  };
  termsAccepted: boolean;
  accountNumber?: string;
  customerId?: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 9;
  
  const [data, setData] = useState<OnboardingData>({
    mobile: "",
    aadhaar: "",
    pan: "",
    dob: "",
    otp: "",
    address: {
      name: "Rajesh Kumar",
      street: "123, MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pin: "560001",
    },
    email: "",
    occupation: "",
    companyName: "",
    annualIncome: "",
    motherName: "",
    accountType: "digital",
    addNominee: false,
    termsAccepted: false,
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, currentStep, setCurrentStep, totalSteps }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
