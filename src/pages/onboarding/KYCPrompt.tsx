import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Camera, Wifi, Mic, CreditCard } from "lucide-react";

export const KYCPrompt = () => {
  const navigate = useNavigate();
  const { setCurrentStep } = useOnboarding();
  const [cameraChecked, setCameraChecked] = useState(false);
  const [micChecked, setMicChecked] = useState(false);
  const [internetChecked, setInternetChecked] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrentStep(8);
  }, [setCurrentStep]);

  const allChecked = cameraChecked && micChecked && internetChecked;

  const handleCameraAccess = async () => {
    if (cameraChecked) return; // Prevent multiple calls
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      setCameraStream(stream);
      setCameraChecked(true);
      
      // Wait for next tick to ensure video element is ready
      setTimeout(() => {
        if (videoRef.current && stream) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Camera access is required for KYC verification. Please allow camera access and try again.");
    }
  };

  const handleAllow = () => {
    if (allChecked) {
      // Stop camera stream
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      setIsVerified(true);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup camera stream on unmount
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {isVerified ? (
        <div className="w-full max-w-md space-y-8 text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-success/20 flex items-center justify-center">
              <svg className="h-12 w-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">KYC verified successfully</h1>
          <p className="text-muted-foreground leading-relaxed">
            Your KYC verification has been completed successfully. You can now proceed with your account setup.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/")} 
            className="w-full"
          >
            Continue to Dashboard
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-8 animate-slide-in pt-20">
        <div className="text-center space-y-3">
          {/* <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <CreditCard className="h-10 w-10 text-primary" />
            </div>
          </div> */}
          <h1 className="text-3xl font-bold text-foreground">Before we begin your KYC</h1>
          <p className="text-muted-foreground leading-relaxed">
            To complete your KYC verification, we'll need access to certain features on your device.
          </p>
        </div>

        {/* Camera Preview */}
        {cameraStream && (
          <div className="rounded-2xl overflow-hidden border-2 border-success bg-card animate-fade-in">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        {/* Permissions List */}
        <div className="space-y-4">
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

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            size="lg" 
            onClick={handleAllow} 
            className="w-full" 
            disabled={!allChecked}
          >
            Allow & Continue
          </Button>
          <Button size="lg" variant="ghost" onClick={() => navigate("/")} className="w-full">
            Cancel
          </Button>
        </div>
        </div>
      )}
    </div>
  );
};
