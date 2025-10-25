import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check, Wifi, Camera, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import auLogo from "@/assets/au-logo.png";

const KYCPermissions = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    internet: false,
    camera: false,
    microphone: false,
  });
  const [checking, setChecking] = useState({
    internet: true,
    camera: true,
    microphone: true,
  });

  useEffect(() => {
    // Simulate permission checks
    const checkPermissions = async () => {
      // Check internet speed
      setTimeout(() => {
        setPermissions((prev) => ({ ...prev, internet: true }));
        setChecking((prev) => ({ ...prev, internet: false }));
      }, 1000);

      // Check camera access
      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          setPermissions((prev) => ({ ...prev, camera: true }));
        } catch (error) {
          setPermissions((prev) => ({ ...prev, camera: false }));
        }
        setChecking((prev) => ({ ...prev, camera: false }));
      }, 1500);

      // Check microphone access
      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(track => track.stop());
          setPermissions((prev) => ({ ...prev, microphone: true }));
        } catch (error) {
          setPermissions((prev) => ({ ...prev, microphone: false }));
        }
        setChecking((prev) => ({ ...prev, microphone: false }));
      }, 2000);
    };

    checkPermissions();
  }, []);

  const allPermissionsGranted = permissions.internet && permissions.camera && permissions.microphone;
  const allChecksComplete = !checking.internet && !checking.camera && !checking.microphone;

  const handleStartKYC = () => {
    if (allPermissionsGranted) {
      navigate("/kyc-verification");
    }
  };

  const PermissionItem = ({ 
    icon: Icon, 
    label, 
    granted, 
    isChecking 
  }: { 
    icon: any; 
    label: string; 
    granted: boolean; 
    isChecking: boolean;
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          granted ? "bg-success/10" : "bg-muted"
        )}>
          <Icon className={cn(
            "w-5 h-5",
            granted ? "text-success" : "text-muted-foreground"
          )} />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {isChecking ? (
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      ) : granted ? (
        <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full border-2 border-destructive flex items-center justify-center">
          <span className="text-destructive text-xs">✕</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <img src={auLogo} alt="AU Small Finance Bank" className="h-8" />
      </header>

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
                isChecking={checking.internet}
              />
              <PermissionItem
                icon={Camera}
                label="Camera Access"
                granted={permissions.camera}
                isChecking={checking.camera}
              />
              <PermissionItem
                icon={Mic}
                label="Microphone Access"
                granted={permissions.microphone}
                isChecking={checking.microphone}
              />
            </div>
          </div>

          {!allPermissionsGranted && allChecksComplete && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl">
              <p className="text-sm text-destructive">
                Please grant all required permissions to proceed with Video KYC verification.
              </p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          <Button
            onClick={handleStartKYC}
            disabled={!allPermissionsGranted || !allChecksComplete}
            className="w-full h-12 text-base font-semibold"
            variant="secondary"
          >
            {allChecksComplete 
              ? allPermissionsGranted 
                ? "Start Video KYC" 
                : "Grant Permissions"
              : "Checking Permissions..."
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KYCPermissions;
