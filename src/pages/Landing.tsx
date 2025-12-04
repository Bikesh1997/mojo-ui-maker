import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Landmark, Banknote, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* <Landmark className="w-8 h-8 text-primary" /> */}
          {/* <span className="font-bold text-xl">AU Small Finance Bank</span> */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="AU Small Finance Bank"
              className="h-14 mix-blend-multiply"
            />
          </div>{" "}
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-secondary text-secondary-foreground px-6 py-12 mb-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold mb-3">Welcome to Ujjivan Bank</h1>
          <p className="text-secondary-foreground/90">Banking made easier</p>
        </div>
      </div>

      {/* Loan Card */}
      <div className="px-6 max-w-lg mx-auto animate-fade-in mb-6">
        <Card className="p-6 shadow-lg border-2 hover:border-primary/20 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Personal Loan</h2>
              <p className="text-muted-foreground">
                Loan up to <b className="text-black">₹10 Lakh </b> <br />
                starting 13% p.a.
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Banknote className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 mt-6">
            <Button
              onClick={() => navigate("/loan/mobile")}
              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold px-3 sm:px-4"
            >
              Apply
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold px-3 sm:px-4"
              onClick={() => {
                // View details action
              }}
            >
              View Details
            </Button>
          </div>
        </Card>
      </div>

      {/* Account Card */}
      <div className="px-6 max-w-lg mx-auto animate-fade-in mb-6">
        <Card className="p-6 shadow-lg border-2 hover:border-primary/20 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Savings Account</h2>
              <p className="text-muted-foreground">
                Start saving for your future today
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Landmark className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 mt-6">
            <Button
              onClick={() => navigate("/onboarding/mobile")}
              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold px-3 sm:px-4"
            >
              Open Account
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold px-3 sm:px-4"
              onClick={() => {
                // Know more action
              }}
            >
              Know More
            </Button>
          </div>
        </Card>
      </div>

      {/* Credit Card */}
      <div className="px-6 max-w-lg mx-auto animate-fade-in">
        <Card className="p-6 shadow-lg border-2 hover:border-primary/20 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Credit Card</h2>
              <p className="text-muted-foreground">
                Get exclusive rewards and benefits
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 mt-6">
            <Button
              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold px-3 sm:px-4"
              onClick={() => {
                // Apply action
              }}
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold px-3 sm:px-4"
              onClick={() => {
                // Know more action
              }}
            >
              Know More
            </Button>
          </div>
        </Card>

        {/* Features */}
        {/* <div className="mt-8 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-success rounded-full" />
            <span>Zero balance savings account</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-success rounded-full" />
            <span>Free debit card & cheque book</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-success rounded-full" />
            <span>Digital account opening in minutes</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Landing;
