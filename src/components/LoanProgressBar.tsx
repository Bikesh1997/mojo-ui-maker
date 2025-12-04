import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export const LoanProgressBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentStep = () => {
    const path = location.pathname;
    
    // Step 1: Mobile Entry
    if (path === '/loan/mobile') return 1;
    // Step 2: Mobile OTP Verify
    if (path === '/loan/mobile-otp') return 2;
    // Step 3: Aadhaar Entry
    if (path === '/loan/aadhaar') return 3;
    // Step 4: Aadhaar OTP Verify
    if (path === '/loan/aadhaar-otp') return 4;
    // Step 5: PAN Entry
    if (path === '/loan/pan') return 5;
    // Step 6: Personal Details Review
    if (path === '/loan/personal-details-review') return 6;
    // Step 7: Basic Details
    if (path === '/loan/basic-details') return 7;
    // Step 8: Loan Eligibility
    if (path === '/loan/eligibility') return 8;
    // Step 9: Customise Loan
    if (path === '/loan/customise') return 9;
    // Step 10: Bank Details
    if (path === '/loan/bank-details') return 10;
    // Step 11: Video KYC
    if (path === '/loan/video-kyc') return 11;
    // Step 12: KYC Prompt
    if (path === '/loan/kyc-prompt') return 12;
    // Step 13: KYC Success
    if (path === '/loan/kyc-success') return 13;
    // Step 14: Final Sanction
    if (path === '/loan/final-sanction') return 14;
    
    return 1;
  };

  const currentStep = getCurrentStep();
  const totalSteps = 14;

  const steps = [
    { number: 1, label: 'KYC' },
    { number: 2, label: 'Personal Info' },
    { number: 3, label: 'Get Offer' },
    { number: 4, label: 'Get Funds' },
  ];
  

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-muted-foreground/10 transition-colors flex-shrink-0"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            {steps.map((step) => {
              const stepsPerBar = totalSteps / 4;
              const barStartStep = (step.number - 1) * stepsPerBar + 1;
              const barEndStep = step.number * stepsPerBar;
              
              let width = '0%';
              if (currentStep >= barEndStep) {
                width = '100%';
              } else if (currentStep >= barStartStep && currentStep < barEndStep) {
                const progressInBar = ((currentStep - barStartStep) / stepsPerBar) * 100;
                width = `${progressInBar}%`;
              }
              
              return (
                <div key={step.number} className="flex-1">
                  <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full transition-all duration-500 ease-out rounded-full"
                      style={{ width, backgroundColor: '#00C639' }}
                    />
                  </div>
                  <p className={`text-[10px] sm:text-xs text-center mt-1 truncate ${currentStep >= barStartStep && currentStep <= barEndStep ? 'text-black-100 font-semibold' : 'text-muted-foreground'}`}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};