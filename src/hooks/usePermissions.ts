import { useState } from "react";

interface PermissionState {
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

  const togglePermission = (key: keyof PermissionState) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allPermissionsGranted = permissions.internet && permissions.camera && permissions.microphone;

  return {
    permissions,
    togglePermission,
    allPermissionsGranted,
  };
};
