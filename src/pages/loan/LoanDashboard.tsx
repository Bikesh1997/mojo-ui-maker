import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Calendar,
  Download,
  CreditCard,
  HelpCircle,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const LOAN_DETAILS = {
  loanId: "PL" + Math.random().toString(36).substring(2, 11).toUpperCase(),
  loanAmount: "₹5,00,000",
  outstanding: "₹4,95,000",
  nextEMI: "₹23,448",
  nextEMIDate: "15 Dec 2024",
  tenureRemaining: "24 months",
  interestRate: "10.99%",
};

const EMI_SCHEDULE = [
  { month: "Dec 2024", principal: "₹16,114", interest: "₹7,334", status: "upcoming" },
  { month: "Jan 2025", principal: "₹16,262", interest: "₹7,186", status: "upcoming" },
  { month: "Feb 2025", principal: "₹16,411", interest: "₹7,037", status: "upcoming" },
  { month: "Mar 2025", principal: "₹16,561", interest: "₹6,887", status: "upcoming" },
];

export const LoanDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-primary-foreground p-6">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-primary-foreground hover:bg-white/20"
            >
              <Home className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">My Loan</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/20"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-90">Loan ID: {LOAN_DETAILS.loanId}</p>
              <p className="text-3xl font-bold mt-2">{LOAN_DETAILS.outstanding}</p>
              <p className="text-sm opacity-90">Outstanding Amount</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-90">Next EMI</p>
                <p className="text-lg font-bold">{LOAN_DETAILS.nextEMI}</p>
                <p className="text-xs opacity-90">{LOAN_DETAILS.nextEMIDate}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-90">Tenure Left</p>
                <p className="text-lg font-bold">{LOAN_DETAILS.tenureRemaining}</p>
                <p className="text-xs opacity-90">Rate: {LOAN_DETAILS.interestRate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="rounded-2xl border-2 border-border bg-card p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Loan Amount</span>
                  <span className="text-sm font-semibold">{LOAN_DETAILS.loanAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Outstanding</span>
                  <span className="text-sm font-semibold">{LOAN_DETAILS.outstanding}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Interest Rate</span>
                  <span className="text-sm font-semibold">{LOAN_DETAILS.interestRate} p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monthly EMI</span>
                  <span className="text-sm font-semibold">{LOAN_DETAILS.nextEMI}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">All payments up to date</p>
                    <p className="text-xs text-muted-foreground">Next EMI on {LOAN_DETAILS.nextEMIDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-3">
            {EMI_SCHEDULE.map((emi, index) => (
              <div key={index} className="rounded-2xl border-2 border-border bg-card p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{emi.month}</p>
                    <p className="text-xs text-muted-foreground capitalize">{emi.status}</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">{LOAN_DETAILS.nextEMI}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Principal</p>
                    <p className="font-semibold text-foreground">{emi.principal}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Interest</p>
                    <p className="font-semibold text-foreground">{emi.interest}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </TabsContent>

          <TabsContent value="actions" className="space-y-3">
            <button className="w-full rounded-2xl border-2 border-border bg-card p-4 hover:border-primary/50 transition-all text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Change Repayment Mode</p>
                    <p className="text-xs text-muted-foreground">Modify your e-mandate</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>

            <button className="w-full rounded-2xl border-2 border-border bg-card p-4 hover:border-primary/50 transition-all text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Download Statement</p>
                    <p className="text-xs text-muted-foreground">Get loan account statement</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>

            <button className="w-full rounded-2xl border-2 border-border bg-card p-4 hover:border-primary/50 transition-all text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Prepayment / Foreclosure</p>
                    <p className="text-xs text-muted-foreground">Close your loan early</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>

            <button className="w-full rounded-2xl border-2 border-border bg-card p-4 hover:border-primary/50 transition-all text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Support & Grievance</p>
                    <p className="text-xs text-muted-foreground">Get help or raise a concern</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
