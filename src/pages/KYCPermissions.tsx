import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, Camera, Mic } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PermissionItem from "@/components/PermissionItem";
import { usePermissions } from "@/hooks/usePermissions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const KYCPermissions = () => {
  const navigate = useNavigate();
  const { permissions, togglePermission, allPermissionsGranted } = usePermissions();

  const handleStartKYC = () => {
    if (allPermissionsGranted) {
      navigate("/kyc-verification");
    }
  };

  // Auto-start video KYC when all permissions are granted
  if (allPermissionsGranted) {
    navigate("/kyc-verification");
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <Dialog open={true}>
        <DialogContent className="w-[75%] max-w-md mx-auto p-6 bg-white rounded-3xl shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold text-foreground">
              Video KYC Verification
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2">
              We need to verify a few permissions before we proceed with your Video KYC.
            </DialogDescription>
          </DialogHeader>

          {/* Permissions List */}
          <div className="mb-4">
            <h2 className="text-base font-semibold text-foreground mb-3">
              Required Permissions
            </h2>
            
            <div className="space-y-0">
              <PermissionItem
                icon={Wifi}
                label="Internet Speed Test"
                granted={permissions.internet}
                isChecking={false}
                onToggle={() => togglePermission('internet')}
              />
              <PermissionItem
                icon={Camera}
                label="Camera Access"
                granted={permissions.camera}
                isChecking={false}
                onToggle={() => togglePermission('camera')}
              />
              <PermissionItem
                icon={Mic}
                label="Microphone Access"
                granted={permissions.microphone}
                isChecking={false}
                onToggle={() => togglePermission('microphone')}
              />
            </div>
          </div>

          {!allPermissionsGranted && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
              <p className="text-xs text-destructive">
                Please grant all required permissions to proceed with Video KYC verification.
              </p>
            </div>
          )}

          {/* PAN Card Message */}
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="text-xs text-primary font-medium">
              Please keep your PAN Card with you.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KYCPermissions;
