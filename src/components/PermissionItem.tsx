import { LucideIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface PermissionItemProps {
  icon: LucideIcon;
  label: string;
  granted: boolean;
  isChecking: boolean;
  onToggle: () => void;
}

const PermissionItem = ({ icon: Icon, label, granted, isChecking, onToggle }: PermissionItemProps) => {
  return (
    <div className="flex items-center gap-3 py-4">
      <Checkbox
        checked={granted}
        onCheckedChange={onToggle}
        disabled={isChecking}
        className={cn(
          "w-5 h-5 rounded border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary",
          isChecking && "opacity-50"
        )}
      />
      <div className="flex items-center gap-3 flex-1">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
          granted ? "bg-primary/10" : "bg-muted"
        )}>
          <Icon className={cn(
            "w-5 h-5 transition-colors",
            granted ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        <span className="text-sm font-medium text-black">{label}</span>
      </div>
      {isChecking && (
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
};

export default PermissionItem;
