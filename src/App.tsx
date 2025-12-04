import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { ProgressBar } from "./components/ProgressBar";
import { LoanProgressBar } from "./components/LoanProgressBar";
import Landing from "./pages/Landing";
import { MobileVerification } from "./pages/onboarding/MobileVerification";
import { AadhaarVerification } from "./pages/onboarding/AadhaarVerification";
import { PANVerification } from "./pages/onboarding/PANVerification";
import { DateOfBirth } from "./pages/onboarding/DateOfBirth";
import { OTPVerification } from "./pages/onboarding/OTPVerification";
import { AddressConfirmation } from "./pages/onboarding/AddressConfirmation";
import { BasicDetails } from "./pages/onboarding/BasicDetails";
import { ProductSelection } from "./pages/onboarding/ProductSelection";
import { NomineeAndTerms } from "./pages/onboarding/NomineeAndTerms";
import { AccountSuccess } from "./pages/onboarding/AccountSuccess";
import { KYCPrompt } from "./pages/onboarding/KYCPrompt";
import { MobileEntry } from "./pages/loan/MobileEntry";
import { MobileOTPVerify } from "./pages/loan/MobileOTPVerify";
import { AadhaarEntry } from "./pages/loan/AadhaarEntry";
import { AadhaarOTPVerify } from "./pages/loan/AadhaarOTPVerify";
import { PANEntry } from "./pages/loan/PANEntry";
import { LoanEligibility } from "./pages/loan/LoanEligibility";
import { PersonalDetailsReview } from "./pages/loan/PersonalDetailsReview";
import { LoanBasicDetails } from "./pages/loan/LoanBasicDetails";
import { CustomiseLoan } from "./pages/loan/CustomiseLoan";
import { BankDetails } from "./pages/loan/BankDetails";
import { VideoKYC } from "./pages/loan/VideoKYC";
import { KYCPrompt as LoanKYCPrompt } from "./pages/loan/KYCPrompt";
import { KYCSuccess } from "./pages/loan/KYCSuccess";
import { FinalSanction } from "./pages/loan/FinalSanction";
import { DisbursalProcessing } from "./pages/loan/DisbursalProcessing";
import { DisbursalSuccess } from "./pages/loan/DisbursalSuccess";
import { LoanDashboard } from "./pages/loan/LoanDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const basename = import.meta.env.VITE_BASE_PATH || "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <OnboardingProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/onboarding/*"
              element={
                <div className="min-h-screen flex flex-col">
                  <ProgressBar />
                  <Routes>
                    <Route path="mobile" element={<MobileVerification />} />
                    <Route path="aadhaar" element={<AadhaarVerification />} />
                    <Route path="pan" element={<PANVerification />} />
                    <Route path="dob" element={<DateOfBirth />} />
                    <Route path="otp" element={<OTPVerification />} />
                    <Route path="address" element={<AddressConfirmation />} />
                    <Route path="basic-details" element={<BasicDetails />} />
                    <Route
                      path="product-selection"
                      element={<ProductSelection />}
                    />
                    <Route path="nominee" element={<NomineeAndTerms />} />
                    <Route path="success" element={<AccountSuccess />} />
                    <Route path="kyc-prompt" element={<KYCPrompt />} />
                  </Routes>
                </div>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route
              path="/loan/*"
              element={
                <Routes>
                  <Route
                    path="mobile"
                    element={
                      <>
                        <LoanProgressBar />
                        <MobileEntry />
                      </>
                    }
                  />
                  <Route
                    path="mobile-otp"
                    element={
                      <>
                        <LoanProgressBar />
                        <MobileOTPVerify />
                      </>
                    }
                  />
                  <Route
                    path="aadhaar"
                    element={
                      <>
                        <LoanProgressBar />
                        <AadhaarEntry />
                      </>
                    }
                  />
                  <Route
                    path="aadhaar-otp"
                    element={
                      <>
                        <LoanProgressBar />
                        <AadhaarOTPVerify />
                      </>
                    }
                  />
                  <Route
                    path="pan"
                    element={
                      <>
                        <LoanProgressBar />
                        <PANEntry />
                      </>
                    }
                  />
                  <Route
                    path="personal-details-review"
                    element={
                      <>
                        <LoanProgressBar />
                        <PersonalDetailsReview />
                      </>
                    }
                  />
                  <Route
                    path="basic-details"
                    element={
                      <>
                        <LoanProgressBar />
                        <LoanBasicDetails />
                      </>
                    }
                  />
                  <Route
                    path="eligibility"
                    element={
                      <>
                        <LoanProgressBar />
                        <LoanEligibility />
                      </>
                    }
                  />
                  <Route
                    path="customise"
                    element={
                      <>
                        <LoanProgressBar />
                        <CustomiseLoan />
                      </>
                    }
                  />
                  <Route
                    path="bank-details"
                    element={
                      <>
                        <LoanProgressBar />
                        <BankDetails />
                      </>
                    }
                  />
                  <Route
                    path="video-kyc"
                    element={
                      <>
                        <LoanProgressBar />
                        <VideoKYC />
                      </>
                    }
                  />
                  <Route
                    path="kyc-prompt"
                    element={
                      <>
                        <LoanProgressBar />
                        <LoanKYCPrompt />
                      </>
                    }
                  />
                  <Route
                    path="kyc-success"
                    element={
                      <>
                        <LoanProgressBar />
                        <KYCSuccess />
                      </>
                    }
                  />
                  <Route
                    path="final-sanction"
                    element={
                      <>
                        <LoanProgressBar />
                        <FinalSanction />
                      </>
                    }
                  />
                  <Route
                    path="disbursal-processing"
                    element={<DisbursalProcessing />}
                  />
                  <Route
                    path="disbursal-success"
                    element={<DisbursalSuccess />}
                  />
                  <Route path="dashboard" element={<LoanDashboard />} />
                </Routes>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OnboardingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
