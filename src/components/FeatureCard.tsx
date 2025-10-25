import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  onApply?: () => void;
}

export const FeatureCard = ({ title, icon: Icon, onApply }: FeatureCardProps) => {
  return (
    <div 
      className="p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ background: 'linear-gradient(260deg, rgba(234, 103, 28, 0.12) 9.28%, rgba(108, 37, 108, 0.12) 94.59%)' }}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground mb-3">{title}</h3>
          <Button 
            className="w-full h-9 text-sm rounded-lg bg-white hover:bg-white/90 text-black shadow-sm hover:shadow-md transition-all duration-200"
            onClick={onApply}
          >
            Open Account
          </Button>
        </div>
      </div>
    </div>
  );
};
