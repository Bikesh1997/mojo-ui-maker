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
      className="p-4 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ background: 'linear-gradient(260deg, rgba(234, 103, 28, 0.12) 9.28%, rgba(108, 37, 108, 0.12) 94.59%)' }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground text-center">{title}</h3>
        <Button 
          className="w-full h-8 text-xs rounded-lg bg-white hover:bg-white/90 shadow-sm hover:shadow-md transition-all duration-200"
          style={{ color: '#000000' }}
          onClick={onApply}
        >
          Open Account
        </Button>
      </div>
    </div>
  );
};
