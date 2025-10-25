import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SavingsApplication from "./pages/SavingsApplication";
import AccountDetails from "./pages/AccountDetails";
import KYCPermissions from "./pages/KYCPermissions";
import KYCVerification from "./pages/KYCVerification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/savings-application" element={<SavingsApplication />} />
          <Route path="/account-details" element={<AccountDetails />} />
          <Route path="/kyc-permissions" element={<KYCPermissions />} />
          <Route path="/kyc-verification" element={<KYCVerification />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
