import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import auLogo from "@/assets/au-logo.png";
import bankRepresentative from "@/assets/bank-representative.jpg";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PermissionItem from "@/components/PermissionItem";
import { Wifi, Camera, Mic } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";

const AccountDetails = () => {
  const navigate = useNavigate();
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const { permissions, togglePermission, allPermissionsGranted } = usePermissions();
  const [checkingPermission, setCheckingPermission] = useState<string | null>(null);

  // Show permissions modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPermissionsModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-navigate to vKYC when all permissions are granted
  useEffect(() => {
    if (allPermissionsGranted && showPermissionsModal) {
      // Small delay for smooth transition
      setTimeout(() => {
        navigate("/kyc-verification");
      }, 800);
    }
  }, [allPermissionsGranted, showPermissionsModal, navigate]);

  const handlePermissionToggle = async (key: keyof typeof permissions) => {
    setCheckingPermission(key);
    // Simulate permission check
    await new Promise(resolve => setTimeout(resolve, 500));
    togglePermission(key);
    setCheckingPermission(null);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate("/")} className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <img src={auLogo} alt="AU Small Finance Bank" className="h-8" />
      </header>

      {/* Content */}
      <div className="px-6 py-6 space-y-4">
        {/* Success Card */}
        <div className="bg-primary rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-white mb-2">
            Congratulations!
          </h1>
          <p className="text-sm text-white/90 mb-4">
            Your savings account has been opened
          </p>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-white/80 mb-1">Customer ID</p>
              <p className="text-base font-semibold text-white">563387272</p>
            </div>
            <div>
              <p className="text-xs text-white/80 mb-1">Account Number</p>
              <p className="text-base font-semibold text-white">123465789654</p>
            </div>
          </div>
        </div>

        {/* KYC Pending Card */}
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <p className="text-sm text-foreground font-medium text-center">
            Your KYC is pending. Complete it using the vKYC option below.
          </p>
        </div>
      </div>

      {/* Permissions Modal */}
      <Dialog open={showPermissionsModal} onOpenChange={setShowPermissionsModal}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-lg border-primary/20">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Permissions Required
              </h2>
              <p className="text-sm text-muted-foreground">
                Please grant the following permissions to continue with vKYC
              </p>
            </div>

            <div className="space-y-2">
              <PermissionItem
                icon={Wifi}
                label="Internet Access"
                granted={permissions.internet}
                isChecking={checkingPermission === 'internet'}
                onToggle={() => handlePermissionToggle('internet')}
              />
              <PermissionItem
                icon={Camera}
                label="Camera Access"
                granted={permissions.camera}
                isChecking={checkingPermission === 'camera'}
                onToggle={() => handlePermissionToggle('camera')}
              />
              <PermissionItem
                icon={Mic}
                label="Microphone Access"
                granted={permissions.microphone}
                isChecking={checkingPermission === 'microphone'}
                onToggle={() => handlePermissionToggle('microphone')}
              />
            </div>

            {allPermissionsGranted && (
              <div className="text-center">
                <p className="text-sm text-primary font-medium animate-fade-in">
                  Starting vKYC...
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountDetails;
