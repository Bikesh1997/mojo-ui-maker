import { useState } from "react";
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

const Index = () => {
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

        {/* Top Feature Cards */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            <FeatureCard title="Savings Account" icon={Wallet} />
            <FeatureCard title="Credit Card" icon={CreditCard} />
          </div>
        </div>

        {/* Two Cards in Row */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground mb-3">Quick Services</h2>
          <div className="grid grid-cols-2 gap-3">
            <FeatureCard title="Quick Apply" icon={CheckCircle} />
            <FeatureCard title="Zero Balance" icon={Landmark} />
          </div>
        </div>

        {/* Additional Feature Cards */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground mb-3">Banking Services</h2>
          <div className="grid grid-cols-2 gap-3">
            <FeatureCard title="Current Account" icon={Building2} />
            <FeatureCard title="Fixed Deposit" icon={Landmark} />
            <FeatureCard title="Car Loan" icon={Car} />
            <FeatureCard title="Bill Pay" icon={FileText} />
          </div>
        </div>

        {/* More Services */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground mb-3">More Services</h2>
          <div className="grid grid-cols-2 gap-3">
            <FeatureCard title="Offers" icon={Gift} />
            <FeatureCard title="Recharge" icon={Smartphone} />
            <FeatureCard title="Bus" icon={Bus} />
            <FeatureCard title="Hotels" icon={Hotel} />
            <FeatureCard title="Flights" icon={Plane} />
            <FeatureCard title="Apply Now" icon={CheckCircle} />
          </div>
        </div>


        {/* Product Cards */}
        <div className="space-y-4">
          <ProductCard
            title="Savings Account"
            description="Earn up to 8.00% with monthly interest credits"
            illustration={savingsIllustration}
            gradient="bg-gradient-secondary"
            applyRoute="/savings-application"
          />
          
          <ProductCard
            title="Credit card"
            description="Apply for life-time free credit card"
            illustration={creditCardIllustration}
            gradient="bg-gradient-accent"
          />
          
          <ProductCard
            title="Personal Loan"
            description="Get loans up to ₹20 lakh approved instantly"
            illustration={loanIllustration}
            gradient="bg-gradient-success"
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
