import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onApply?: () => void;
}

export const FeatureCard = ({ title, description, icon: Icon, onApply }: FeatureCardProps) => {
  return (
    <div 
      className="p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ background: 'linear-gradient(260deg, rgba(234, 103, 28, 0.12) 9.28%, rgba(108, 37, 108, 0.12) 94.59%)' }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-foreground/70">{description}</p>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <Button 
          className="flex-1 min-w-0 h-9 text-xs rounded-lg bg-white hover:bg-white/90 text-black shadow-sm hover:shadow-md transition-all duration-200"
          onClick={onApply}
        >
          Open Account
        </Button>
        <Button 
          variant="outline"
          className="flex-1 min-w-0 h-9 text-xs rounded-lg border-foreground/20 text-foreground hover:bg-foreground/5 shadow-sm transition-all duration-200"
        >
          Know More
        </Button>
      </div>
    </div>
  );
};
