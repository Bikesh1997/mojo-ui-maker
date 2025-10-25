import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import auLogo from "@/assets/au-logo.png";

const KYCVerification = () => {
  const navigate = useNavigate();
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Automatically start camera when component mounts
    startCamera();

    // Simulate verification completion after some time
    const timer = setTimeout(() => {
      setVerificationComplete(true);
      stopCamera();
    }, 5000);

    return () => {
      clearTimeout(timer);
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handleComplete = () => {
    navigate("/");
  };

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
        {!verificationComplete ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* PAN Card Message */}
            <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl w-[75%] max-w-md">
              <p className="text-sm text-primary font-medium text-center">
                Please keep your PAN Card with you while we complete your KYC.
              </p>
            </div>

            {/* Camera View */}
            <div className="w-[75%] max-w-md">
              <div className="relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-card">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Frame */}
                <div className="absolute inset-0 border-4 border-primary/30 rounded-3xl pointer-events-none" />
                
                {/* Instructions Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-sm text-center">
                    Position your face within the frame
                  </p>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Verification in Progress
              </h2>
              <p className="text-sm text-muted-foreground">
                Please follow the instructions on screen...
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center w-[75%] max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              KYC Verified Successfully!
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Your Video KYC has been completed successfully. Your account is now fully activated with all features unlocked.
            </p>
            <Button
              onClick={handleComplete}
              className="w-full h-12 text-base font-semibold rounded-xl"
              variant="secondary"
            >
              Continue to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerification;
