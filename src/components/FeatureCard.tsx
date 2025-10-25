import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  onApply?: () => void;
  onKnowMore?: () => void;
}

export const FeatureCard = ({ title, icon: Icon, onApply, onKnowMore }: FeatureCardProps) => {
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
        <div className="flex gap-2 w-full">
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1 h-8 text-xs rounded-lg"
            onClick={onApply}
          >
            Apply
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 h-8 text-xs rounded-lg bg-white/40 hover:bg-white/60 border-primary/20"
            onClick={onKnowMore}
          >
            Know More
          </Button>
        </div>
      </div>
    </div>
  );
};
