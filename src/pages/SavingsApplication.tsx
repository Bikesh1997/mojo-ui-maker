import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, CreditCard, Landmark, Calendar, X } from "lucide-react";
import auLogo from "@/assets/au-logo.png";

const SavingsApplication = () => {
  const navigate = useNavigate();
  const [showOtpField, setShowOtpField] = useState(false);
  const [sameAsAadhaar, setSameAsAadhaar] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState("digital");
  const [addNominee, setAddNominee] = useState(false);
  const [noNominee, setNoNominee] = useState(true);
  const [nomineeAddressSame, setNomineeAddressSame] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [otpTimer, setOtpTimer] = useState(60);

  const handleGetOtp = () => {
    setShowOtpField(true);
    // Start timer
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

      {/* Banner */}
      <div className="px-6 pt-6 pb-4" style={{ background: 'linear-gradient(102deg, #FFFFFF 9.86%, #EA671C 198.31%)' }}>
        <h1 className="text-2xl font-bold text-primary mb-2">
          Earn up to 8% p.a. interest
        </h1>
        <p className="text-sm text-foreground mb-4">
          Enjoy zero fee banking on all savings account services
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="w-5 h-5 text-secondary" />
            <span className="text-foreground">Exclusive Card Offers</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Landmark className="w-5 h-5 text-secondary" />
            <span className="text-foreground">Unlimited ATM Transactions</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Basic Details */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Basic Details</h2>
          <div className="space-y-4">
            <div>
              <Input
                type="tel"
                placeholder="Aadhaar linked mobile"
                className="rounded-xl"
                defaultValue="+91"
              />
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Date of Birth"
                className="rounded-xl"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                className="rounded-xl"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Permanent account number (PAN)"
                className="rounded-xl"
                maxLength={10}
              />
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="12 digit Aadhaar number"
                className="rounded-xl pr-10"
                maxLength={12}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>

            {showOtpField && (
              <div>
                <Label className="text-sm text-foreground mb-2 block">Verify OTP</Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="enter OTP"
                    className="rounded-xl pr-10"
                    maxLength={6}
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">Timer: {formatTime(otpTimer)}</span>
                  <button className="text-xs text-secondary font-medium" disabled={otpTimer > 0}>
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            <Button 
              onClick={handleGetOtp} 
              className="w-full rounded-xl h-12 text-base font-semibold"
              style={{ backgroundColor: '#EA671C' }}
              disabled={showOtpField}
            >
              Get OTP
            </Button>
          </div>
        </section>

        {/* Address Section */}
        <section>
          <h3 className="text-base font-medium text-foreground mb-3">Review your current address</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Checkbox 
                id="same-aadhaar" 
                checked={sameAsAadhaar}
                onCheckedChange={(checked) => setSameAsAadhaar(checked as boolean)}
              />
              <Label htmlFor="same-aadhaar" className="text-sm font-medium leading-tight">
                Same as my Aadhaar Address
              </Label>
            </div>
            
            {sameAsAadhaar && (
              <div className="rounded-xl p-4 text-sm text-foreground" style={{ backgroundColor: '#6C256C1F' }}>
                Cerebrum IT Park, Office No 4C, 3rd Floor, B-3 Tower, Kalyani Nagar, Pune, Maharashtra 411014
              </div>
            )}

            {!sameAsAadhaar && (
              <div className="rounded-xl p-4 text-sm text-foreground" style={{ backgroundColor: '#6C256C1F' }}>
                Cerebrum IT Park, Office No 4C, 3rd Floor, B-3 Tower, Kalyani Nagar, Pune, Maharashtra 411014
              </div>
            )}
          </div>
        </section>

        {/* Professional & Personal Details */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Professional & Personal Details</h2>
          <div className="space-y-4">
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Occupation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salaried">Salaried</SelectItem>
                <SelectItem value="self-employed">Self-employed</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
                <SelectItem value="homemaker">Homemaker</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Source of Income" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="investments">Investments</SelectItem>
                <SelectItem value="pension">Pension</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Input
                type="text"
                placeholder="Search company"
                className="rounded-xl pl-10 pr-10"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <Input
              type="text"
              placeholder="Annual Income in Rupees"
              className="rounded-xl"
            />

            <Input
              type="text"
              placeholder="Mothers Full Name"
              className="rounded-xl"
            />
          </div>
        </section>

        {/* Product Variants */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Product Variants</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Your Choice Variant */}
            <div 
              className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                selectedVariant === 'digital' ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => setSelectedVariant('digital')}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  Your Choice
                </span>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-3">AU Digital Savings</h3>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox 
                  id="variant-digital"
                  checked={selectedVariant === 'digital'}
                  onCheckedChange={() => setSelectedVariant('digital')}
                />
                <Label htmlFor="variant-digital" className="text-xs font-medium">Select</Label>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Joining Benefits</span>
                  <p className="font-medium text-foreground">-</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Relationship manager</span>
                  <p className="font-medium text-foreground">AU - Value</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Free Cash Deposits</span>
                  <p className="font-medium text-foreground">Up to ₹1,00,000</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Average Balance</span>
                  <p className="font-medium text-foreground">₹0</p>
                </div>
              </div>
            </div>

            {/* Popular Variant */}
            <div 
              className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                selectedVariant === 'popular' ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => setSelectedVariant('popular')}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#EA671C' }}>
                  Popular
                </span>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-3">AU Digital Savings</h3>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox 
                  id="variant-popular"
                  checked={selectedVariant === 'popular'}
                  onCheckedChange={() => setSelectedVariant('popular')}
                />
                <Label htmlFor="variant-popular" className="text-xs font-medium">Select</Label>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Joining Benefits</span>
                  <p className="font-medium text-foreground">Upto ₹300</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Relationship manager</span>
                  <p className="font-medium text-foreground">Yes</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Free Cash Deposits</span>
                  <p className="font-medium text-foreground">Up to ₹2,00,000</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Average Balance</span>
                  <p className="font-medium text-foreground">₹10,000</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add Nominee */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Add Nominee</h2>
          <p className="text-sm text-muted-foreground mb-4">
            We highly suggest that you include a nominee to ensure the security of deposit settlements.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Checkbox 
                id="add-nominee" 
                checked={addNominee}
                onCheckedChange={(checked) => {
                  setAddNominee(checked as boolean);
                  if (checked) setNoNominee(false);
                }}
              />
              <Label htmlFor="add-nominee" className="text-sm font-medium">Add Nominee</Label>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox 
                id="no-nominee" 
                checked={noNominee}
                onCheckedChange={(checked) => {
                  setNoNominee(checked as boolean);
                  if (checked) setAddNominee(false);
                }}
              />
              <Label htmlFor="no-nominee" className="text-sm font-medium">
                I don't wish to add nominee details
              </Label>
            </div>

            {addNominee && (
              <div className="space-y-4 pt-4">
                <Input
                  type="text"
                  placeholder="Nominee Full Name"
                  className="rounded-xl"
                />
                <Input
                  type="text"
                  placeholder="Relationship with Customer"
                  className="rounded-xl"
                />
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Date of Birth"
                    className="rounded-xl"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
                <Input
                  type="text"
                  placeholder="Aadhaar Number"
                  className="rounded-xl"
                  maxLength={12}
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-xl"
                />
                <div className="flex items-start gap-2">
                  <Checkbox 
                    id="nominee-address" 
                    checked={nomineeAddressSame}
                    onCheckedChange={(checked) => setNomineeAddressSame(checked as boolean)}
                  />
                  <Label htmlFor="nominee-address" className="text-sm font-medium">
                    Same as applicant's address
                  </Label>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Terms & Conditions */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Terms & Conditions</h2>
          <div className="flex items-start gap-2">
            <Checkbox 
              id="accept-terms" 
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="accept-terms" className="text-sm leading-tight">
              I accept all the terms and conditions related to AU Small Finance Bank and confirm that I am a citizen of India.
            </Label>
          </div>
        </section>

        {/* Open Account Button */}
        <Button 
          className="w-full rounded-xl h-12 text-base font-semibold"
          style={{ backgroundColor: '#EA671C' }}
          disabled={!acceptTerms}
        >
          Open Account
        </Button>
      </div>
    </div>
  );
};

export default SavingsApplication;
