import { Check, LucideIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface PermissionItemProps {
  icon: LucideIcon;
  label: string;
  granted: boolean;
  isChecking: boolean;
}

const PermissionItem = ({ icon: Icon, label, granted, isChecking }: PermissionItemProps) => {
  return (
    <div className="flex items-center gap-3 py-4">
      <Checkbox
        checked={granted}
        disabled
        className={cn(
          "w-5 h-5 rounded border-2 data-[state=checked]:bg-success data-[state=checked]:border-success",
          isChecking && "opacity-50"
        )}
      />
      <div className="flex items-center gap-3 flex-1">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
          granted ? "bg-success/10" : "bg-muted"
        )}>
          <Icon className={cn(
            "w-5 h-5 transition-colors",
            granted ? "text-success" : "text-muted-foreground"
          )} />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {isChecking && (
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
};

export default PermissionItem;
