import { Info } from "lucide-react";

const KycBanner = () => {
  return (
    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-3">
      <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-foreground mb-1">
          Complete your KYC within 30 days
        </p>
        <p className="text-xs text-muted-foreground">
          To activate full account access and unlock all banking features, please complete your Video KYC verification.
        </p>
      </div>
    </div>
  );
};

export default KycBanner;
