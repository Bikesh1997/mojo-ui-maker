import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, subYears } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeft, CreditCard, Landmark, Calendar, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import auLogo from "@/assets/au-logo.png";

// Validation Schemas
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const mobileRegex = /^[6-9][0-9]{9}$/;
const aadhaarRegex = /^[0-9]{12}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const baseFormSchema = z.object({
  mobile: z.string()
    .regex(mobileRegex, "Please enter a valid 10-digit mobile number"),
  dob: z.date()
    .refine((date) => {
      const minAge = subYears(new Date(), 18);
      return date <= minAge;
    }, "You must be at least 18 years old to proceed"),
  email: z.string()
    .regex(emailRegex, "Please enter a valid email address"),
  pan: z.string()
    .length(10, "PAN must be exactly 10 characters")
    .regex(panRegex, "Invalid PAN format"),
  aadhaar: z.string()
    .regex(aadhaarRegex, "Please enter a valid 12-digit Aadhaar number"),
  otp: z.string().optional(),
  sameAsAadhaar: z.boolean(),
  occupation: z.string().min(1, "Please select an occupation"),
  sourceOfIncome: z.string().min(1, "Please select source of income"),
  company: z.string().optional(),
  annualIncome: z.string()
    .refine((val) => {
      const num = parseInt(val.replace(/,/g, ''));
      return num >= 50000 && num <= 100000000;
    }, "Annual income must be between ₹50,000 and ₹10,00,00,000"),
  motherName: z.string().min(1, "Mother's name is required"),
  selectedVariant: z.enum(["digital", "popular"]),
  addNominee: z.boolean(),
  noNominee: z.boolean(),
  nomineeFullName: z.string().optional(),
  nomineeRelationship: z.string().optional(),
  nomineeDob: z.date().optional(),
  nomineeAadhaar: z.string().optional(),
  nomineeEmail: z.string().optional(),
  nomineeAddressSame: z.boolean(),
  acceptTerms: z.boolean().refine((val) => val === true, "Please accept terms to continue"),
}).refine((data) => {
  if (data.addNominee) {
    return data.nomineeFullName && data.nomineeRelationship && data.nomineeDob && 
           data.nomineeAadhaar?.match(aadhaarRegex) && data.nomineeEmail?.match(emailRegex);
  }
  return true;
}, {
  message: "All nominee fields are required when adding a nominee",
  path: ["nomineeFullName"],
});

const SavingsApplication = () => {
  const navigate = useNavigate();
  const [showOtpField, setShowOtpField] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [companySearch, setCompanySearch] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<z.infer<typeof baseFormSchema>>({
    resolver: zodResolver(baseFormSchema),
    mode: "onBlur",
    defaultValues: {
      mobile: "",
      email: "",
      pan: "",
      aadhaar: "",
      otp: "",
      sameAsAadhaar: true,
      occupation: "",
      sourceOfIncome: "",
      company: "",
      annualIncome: "",
      motherName: "",
      selectedVariant: "digital",
      addNominee: false,
      noNominee: true,
      nomineeFullName: "",
      nomineeRelationship: "",
      nomineeAadhaar: "",
      nomineeEmail: "",
      nomineeAddressSame: true,
      acceptTerms: false,
    },
  });

  const handleGetOtp = () => {
    setShowOtpField(true);
    setOtpTimer(60);
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

  const handleVerifyOtp = () => {
    // Simulate OTP verification - in real app, this would be an API call
    if (enteredOtp === "123456") { // Mock valid OTP
      setOtpVerified(true);
      setOtpError(false);
    } else {
      setOtpVerified(false);
      setOtpError(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleCompanyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.setValue('company', companySearch);
    }
  };

  const onSubmit = (data: z.infer<typeof baseFormSchema>) => {
    console.log("Form submitted:", data);
    // Navigate to Account Details page after successful submission
    navigate("/account-details");
  };

  const getValidationClassName = (fieldName: any, isTyping?: boolean) => {
    const fieldState = form.getFieldState(fieldName);
    const value = form.getValues(fieldName);
    
    // While typing (real-time)
    if (isTyping && value) {
      if (fieldState.error) {
        return "border-[#FF0000] focus-visible:ring-[#FF0000]";
      }
      // Show green border while typing valid input
      if (!fieldState.error && fieldState.isDirty) {
        return "border-[#00CC66] focus-visible:ring-[#00CC66]";
      }
    }
    
    // Show red for errors
    if (fieldState.error && fieldState.isDirty) {
      return "border-[#FF0000] focus-visible:ring-[#FF0000]";
    }
    
    // Default border for correctly filled fields
    if (value && !fieldState.error) {
      return "border-input";
    }
    
    // Default state
    return "border-input";
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-6 space-y-6">
          {/* Basic Details */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Basic Details</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black font-medium">+91</span>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Aadhaar linked mobile"
                          className={cn(
                            "rounded-xl transition-colors pl-12",
                            field.value && "text-black",
                            getValidationClassName("mobile", true)
                          )}
                          maxLength={10}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                            form.trigger("mobile");
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-10 rounded-xl justify-start text-left font-normal px-3 transition-colors border-input bg-transparent hover:bg-transparent hover:text-foreground",
                              !field.value && "text-muted-foreground",
                              field.value && "text-black",
                              getValidationClassName("dob", false)
                            )}
                          >
                            {field.value ? format(field.value, "dd MMM yyyy") : "Date of Birth"}
                            <Calendar className="ml-auto h-5 w-5 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setCalendarOpen(false);
                          }}
                          disabled={(date) => date > subYears(new Date(), 18) || date < new Date("1900-01-01")}
                          initialFocus
                          captionLayout="dropdown-buttons"
                          fromYear={1900}
                          toYear={subYears(new Date(), 18).getFullYear()}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email Address"
                        className={cn(
                          "rounded-xl transition-colors",
                          field.value && "text-black",
                          getValidationClassName("email", true)
                        )}
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("email");
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pan"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Permanent account number (PAN)"
                        className={cn(
                          "rounded-xl transition-colors",
                          field.value && "text-black",
                          getValidationClassName("pan", true)
                        )}
                        maxLength={10}
                        inputMode={
                          field.value.length < 5 ? "text" :
                          field.value.length < 9 ? "numeric" : "text"
                        }
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase();
                          field.onChange(value);
                          form.trigger("pan");
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aadhaar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="text"
                          inputMode="numeric"
                          placeholder="12 digit Aadhaar number"
                          className={cn(
                            "rounded-xl pr-10 transition-colors",
                            field.value && "text-black",
                            getValidationClassName("aadhaar", true)
                          )}
                          maxLength={12}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                            form.trigger("aadhaar");
                          }}
                        />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              {showOtpField && (
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(
                        "text-sm transition-colors",
                        otpVerified ? "text-[#00CC66]" : "text-foreground"
                      )}>
                        {otpVerified ? "Verified" : "Verify OTP"}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="text"
                            placeholder="enter OTP"
                            className={cn(
                              "rounded-xl pr-10 transition-colors",
                              field.value && "text-black",
                              field.value?.length === 6 && !otpError && !otpVerified && "border-[#00CC66]",
                              field.value && field.value.length < 6 && "border-[#FF0000]",
                              otpError && "border-[#FF0000]",
                              otpVerified && "border-input"
                            )}
                            maxLength={6}
                            autoComplete="one-time-code"
                            inputMode="numeric"
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              field.onChange(value);
                              setEnteredOtp(value);
                              setOtpError(false);
                              setOtpVerified(false);
                            }}
                          />
                          {otpVerified && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#28A745] rounded-full p-1">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      {otpError && (
                        <p className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200">
                          Invalid OTP, please try again
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">Timer: {formatTime(otpTimer)}</span>
                        <button type="button" className="text-xs text-secondary font-medium" disabled={otpTimer > 0}>
                          Resend OTP
                        </button>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              <Button 
                type="button"
                onClick={showOtpField ? handleVerifyOtp : handleGetOtp}
                className="w-full rounded-xl h-12 text-base font-semibold"
                style={{ backgroundColor: '#EA671C' }}
                disabled={showOtpField && (!enteredOtp || enteredOtp.length !== 6)}
              >
                {showOtpField ? "Verify OTP" : "Get OTP"}
              </Button>
            </div>
          </section>

          {/* Address Section */}
          <section>
            <h3 className="text-base font-medium text-foreground mb-3">Review your current address</h3>
            <FormField
              control={form.control}
              name="sameAsAadhaar"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!otpVerified}
                        />
                      </FormControl>
                      <Label className={cn(
                        "text-sm font-medium leading-tight",
                        !otpVerified && "opacity-50"
                      )}>
                        Same as my Aadhaar Address
                      </Label>
                    </div>
                    
                    <div className={cn(
                      "rounded-xl p-4 text-sm text-foreground",
                      !otpVerified && "opacity-50"
                    )} style={{ backgroundColor: '#6C256C1F' }}>
                      Cerebrum IT Park, Office No 4C, 3rd Floor, B-3 Tower, Kalyani Nagar, Pune, Maharashtra 411014
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </section>

          {/* Professional & Personal Details */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Professional & Personal Details</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={cn("rounded-xl transition-colors", getValidationClassName("occupation"))}>
                          <SelectValue placeholder="Occupation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="salaried">Salaried</SelectItem>
                        <SelectItem value="self-employed">Self-employed</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="homemaker">Homemaker</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sourceOfIncome"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={cn("rounded-xl transition-colors", getValidationClassName("sourceOfIncome"))}>
                          <SelectValue placeholder="Source of Income" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="investments">Investments</SelectItem>
                        <SelectItem value="pension">Pension</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search company"
                  className="rounded-xl pl-10 pr-10"
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                  onKeyDown={handleCompanyKeyDown}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => {
                    setCompanySearch("");
                    form.setValue('company', '');
                  }}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <FormField
                control={form.control}
                name="annualIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Annual Income in Rupees"
                        className={cn(
                          "rounded-xl transition-colors",
                          field.value && "text-black",
                          getValidationClassName("annualIncome", true)
                        )}
                        onChange={(e) => {
                          const formatted = formatCurrency(e.target.value);
                          field.onChange(formatted);
                          form.trigger("annualIncome");
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motherName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Mothers Full Name"
                        className={cn(
                          "rounded-xl transition-colors",
                          field.value && "text-black",
                          getValidationClassName("motherName", true)
                        )}
                        onChange={(e) => {
                          field.onChange(e);
                          form.trigger("motherName");
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Product Variants */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Product Variants</h2>
            <FormField
              control={form.control}
              name="selectedVariant"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Your Choice Variant */}
                      <div 
                        className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                          field.value === 'digital' ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                        onClick={() => field.onChange('digital')}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            Your Choice
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-3">AU Digital Savings</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Checkbox 
                            checked={field.value === 'digital'}
                            onCheckedChange={() => field.onChange('digital')}
                          />
                          <Label className="text-xs font-medium">Select</Label>
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
                          field.value === 'popular' ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                        onClick={() => field.onChange('popular')}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#EA671C' }}>
                            Popular
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-3">AU Digital Savings</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Checkbox 
                            checked={field.value === 'popular'}
                            onCheckedChange={() => field.onChange('popular')}
                          />
                          <Label className="text-xs font-medium">Select</Label>
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
                  </FormControl>
                </FormItem>
              )}
            />
          </section>

          {/* Add Nominee */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Add Nominee</h2>
            <p className="text-sm text-muted-foreground mb-4">
              We highly suggest that you include a nominee to ensure the security of deposit settlements.
            </p>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="addNominee"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start gap-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (checked) form.setValue('noNominee', false);
                          }}
                        />
                      </FormControl>
                      <Label className="text-sm font-medium">Add Nominee</Label>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noNominee"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start gap-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (checked) form.setValue('addNominee', false);
                          }}
                        />
                      </FormControl>
                      <Label className="text-sm font-medium">
                        I don't wish to add nominee details
                      </Label>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch('addNominee') && (
                <div className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="nomineeFullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Nominee Full Name"
                            className={cn(
                              "rounded-xl transition-colors",
                              field.value && "text-black",
                              getValidationClassName("nomineeFullName", true)
                            )}
                            onChange={(e) => {
                              field.onChange(e);
                              form.trigger("nomineeFullName");
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nomineeRelationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Relationship with Customer"
                            className={cn(
                              "rounded-xl transition-colors",
                              field.value && "text-black",
                              getValidationClassName("nomineeRelationship", true)
                            )}
                            onChange={(e) => {
                              field.onChange(e);
                              form.trigger("nomineeRelationship");
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nomineeDob"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full h-10 rounded-xl justify-start text-left font-normal px-3 transition-colors border-input bg-transparent hover:bg-transparent hover:text-foreground",
                                  !field.value && "text-muted-foreground",
                                  field.value && "text-black",
                                  getValidationClassName("nomineeDob", false)
                                )}
                              >
                                {field.value ? format(field.value, "dd MMM yyyy") : "Date of Birth"}
                                <Calendar className="ml-auto h-5 w-5 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              captionLayout="dropdown-buttons"
                              fromYear={1900}
                              toYear={new Date().getFullYear()}
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nomineeAadhaar"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Aadhaar Number"
                            className={cn(
                              "rounded-xl transition-colors",
                              field.value && "text-black",
                              getValidationClassName("nomineeAadhaar", true)
                            )}
                            maxLength={12}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              field.onChange(value);
                              form.trigger("nomineeAadhaar");
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nomineeEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email Address"
                            className={cn(
                              "rounded-xl transition-colors",
                              field.value && "text-black",
                              getValidationClassName("nomineeEmail", true)
                            )}
                            onChange={(e) => {
                              field.onChange(e);
                              form.trigger("nomineeEmail");
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nomineeAddressSame"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label className="text-sm font-medium">
                            Same as applicant's address
                          </Label>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Terms & Conditions */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Terms & Conditions</h2>
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className={cn(!field.value && form.formState.isSubmitted && "border-[#D32F2F]")}
                      />
                    </FormControl>
                    <Label className="text-sm leading-tight">
                      I accept all the terms and conditions related to AU Small Finance Bank and confirm that I am a citizen of India.
                    </Label>
                  </div>
                  <FormMessage className="text-xs text-[#D32F2F] animate-in fade-in slide-in-from-top-1 duration-200" />
                </FormItem>
              )}
            />
          </section>

          {/* Open Account Button */}
          <Button 
            type="submit"
            className={cn(
              "w-full rounded-xl h-12 text-base font-semibold transition-all",
              !form.watch('acceptTerms') && "opacity-50 cursor-not-allowed"
            )}
            style={{ backgroundColor: '#EA671C' }}
          >
            Open Account
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SavingsApplication;
