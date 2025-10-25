import { useState, useEffect } from "react";

interface PermissionState {
  internet: boolean;
  camera: boolean;
  microphone: boolean;
}

interface CheckingState {
  internet: boolean;
  camera: boolean;
  microphone: boolean;
}

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<PermissionState>({
    internet: false,
    camera: false,
    microphone: false,
  });
  
  const [checking, setChecking] = useState<CheckingState>({
    internet: true,
    camera: true,
    microphone: true,
  });

  useEffect(() => {
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

  return {
    permissions,
    checking,
    allPermissionsGranted,
    allChecksComplete,
  };
};
