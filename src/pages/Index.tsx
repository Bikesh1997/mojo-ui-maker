import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import { 
  Building2, 
  Landmark, 
  Car, 
  FileText, 
  Gift, 
  Smartphone, 
  Bus, 
  Hotel, 
  Plane, 
  CheckCircle,
  CreditCard,
  Wallet
} from "lucide-react";
import auLogo from "@/assets/au-logo.png";
import savingsIllustration from "@/assets/savings-illustration.png";
import creditCardIllustration from "@/assets/creditcard-illustration.png";
import loanIllustration from "@/assets/loan-illustration.png";
import lovableIllustration from "@/assets/lovable-illustration.png";

const Index = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("savings");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src={auLogo} alt="AU Small Finance Bank" className="h-10" />
        </div>
        <Button variant="secondary" size="sm">Login/Register</Button>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-primary px-6 py-8 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to AU Finance</h1>
        <p className="text-white/90 text-sm">
          Your journey to smart banking starts here, quick setup, secure and safe.
        </p>
      </section>

      {/* Service Selector */}
      <div className="px-6 py-6">
        <div className="mb-6">
          <label className="text-sm text-foreground mb-2 block">I am looking for</label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-full bg-card border-border">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="savings">Savings Account</SelectItem>
              <SelectItem value="credit">Credit Card</SelectItem>
              <SelectItem value="loan">Personal Loan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* All Service Cards - One Per Row */}
        <div className="space-y-3">
          <FeatureCard 
            title="Savings Account"
            description="Start saving for your future today."
            icon={Wallet}
            onApply={() => navigate("/savings-application")}
          />
          <FeatureCard 
            title="Credit Card"
            description="Get flexible credit with rewards and cashback."
            icon={CreditCard}
          />
          <FeatureCard 
            title="Current Account"
            description="Manage daily transactions efficiently."
            icon={Building2}
          />
          <FeatureCard 
            title="Fixed Deposit"
            description="Earn higher interest on secure investments."
            icon={Landmark}
          />
          <FeatureCard 
            title="Car Loan"
            description="Drive your dream car with easy EMI options."
            icon={Car}
          />
          <FeatureCard 
            title="Bill Pay"
            description="Pay utilities and bills in a few taps."
            icon={FileText}
          />
          <FeatureCard 
            title="Offers"
            description="Exclusive deals and discounts for you."
            icon={Gift}
          />
          <FeatureCard 
            title="Recharge"
            description="Top-up mobile, DTH, or data plans instantly."
            icon={Smartphone}
          />
          <FeatureCard 
            title="Bus"
            description="Book bus tickets conveniently."
            icon={Bus}
          />
          <FeatureCard 
            title="Hotels"
            description="Reserve your stay at the best rates."
            icon={Hotel}
          />
          <FeatureCard 
            title="Flights"
            description="Book flights quickly and securely."
            icon={Plane}
          />
          <FeatureCard 
            title="Apply Now"
            description="Open an account and start banking immediately."
            icon={CheckCircle}
          />
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="flex justify-center py-8">
        <div className="w-32 h-1 bg-muted rounded-full"></div>
      </div>
    </div>
  );
};

export default Index;
