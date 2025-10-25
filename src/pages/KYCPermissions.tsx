import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, Camera, Mic } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PermissionItem from "@/components/PermissionItem";
import { usePermissions } from "@/hooks/usePermissions";

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

      {/* Content */}
      <div className="px-6 py-6 flex flex-col min-h-[calc(100vh-72px)]">
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Video KYC Verification
            </h1>
            <p className="text-sm text-muted-foreground">
              We need to verify a few permissions before we proceed with your Video KYC.
            </p>
          </div>

          {/* Permissions Card */}
          <div className="bg-card rounded-3xl p-6 shadow-card">
            <h2 className="text-base font-semibold text-foreground mb-4">
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
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl">
              <p className="text-sm text-destructive">
                Please grant all required permissions to proceed with Video KYC verification.
              </p>
            </div>
          )}

          {/* PAN Card Message */}
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
            <p className="text-sm text-primary font-medium">
              Please keep your PAN Card with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCPermissions;
