import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, Wifi, Mic } from "lucide-react";

export const KYCPrompt = () => {
  const navigate = useNavigate();
  const [cameraChecked, setCameraChecked] = useState(false);
  const [micChecked, setMicChecked] = useState(false);
  const [internetChecked, setInternetChecked] = useState(false);

  const allChecked = cameraChecked && micChecked && internetChecked;

  const handleCameraAccess = async () => {
    if (cameraChecked) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      setCameraChecked(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Camera access is required for KYC verification. Please allow camera access and try again.");
    }
  };

  const handleAllow = () => {
    if (allChecked) {
      navigate("/loan/kyc-success");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto ">
        <div className="w-full max-w-md mx-auto pt-20 px-6 py-6">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Before we begin your KYC
              </h1>
              <p className="text-muted-foreground text-base">
                To complete your KYC verification, we'll need access to certain features on your device.
              </p>
            </div>

            {/* Permissions List */}
            <div className="space-y-3">
              <div 
                className="p-4 rounded-2xl bg-card border border-border flex items-start gap-4 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={handleCameraAccess}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Camera Access 📷</p>
                  <p className="text-sm text-muted-foreground">To capture your documents and selfie</p>
                </div>
                <Checkbox
                  checked={cameraChecked}
                  className="mt-1 pointer-events-none"
                />
              </div>

              <div 
                className="p-4 rounded-2xl bg-card border border-border flex items-start gap-4 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setMicChecked(!micChecked)}
              >
                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Mic className="h-6 w-6 text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Microphone Access 🎙️</p>
                  <p className="text-sm text-muted-foreground">For video verification process</p>
                </div>
                <Checkbox
                  checked={micChecked}
                  className="mt-1 pointer-events-none"
                />
              </div>

              <div 
                className="p-4 rounded-2xl bg-card border border-border flex items-start gap-4 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setInternetChecked(!internetChecked)}
              >
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Wifi className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Internet Speed Test</p>
                  <p className="text-sm text-muted-foreground">To verify your details securely</p>
                </div>
                <Checkbox
                  checked={internetChecked}
                  className="mt-1 pointer-events-none"
                />
              </div>
            </div>

            {/* Important Note */}
            <div className="p-4 rounded-2xl bg-muted/50 border border-border">
              <p className="text-sm text-center text-muted-foreground">
                ℹ️ Please keep your <span className="font-semibold text-foreground">PAN card</span> ready
                for the verification process
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <div className="w-full max-w-md mx-auto px-6">
          <Button 
            size="lg" 
            onClick={handleAllow} 
            className="w-full" 
            disabled={!allChecked}
          >
            Allow & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
