import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { AppState, Linking, Platform, Alert } from 'react-native';
import { LocationEmergencyAlertModal } from '@/components/Modals/LocationEmergencyAlertModal';

const LOCATION_TASK_NAME = 'background-location-task';

// Define the task in the global scope
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Location task error:", error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    // Log locations for now as we simulate tracking
    console.log('[Background Location Update]:', locations[0]);
  }
});

interface LocationContextType {
  location: Location.LocationObject | null;
  permissionStatus: Location.PermissionStatus | 'undetermined';
  isLocationEnabled: boolean;
  requestPermissions: () => Promise<void>;
  checkLocationServices: () => Promise<boolean>;
}

const LocationContext = createContext<LocationContextType>({} as any);

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | 'undetermined'>('undetermined');
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Check if location services (GPS) are enabled
  const checkLocationServices = async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    setIsLocationEnabled(enabled);
    setShowLocationModal(!enabled);
    return enabled;
  };

  // Start background tracking
  const startLocationTracking = async () => {
    try {
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      if (!hasStarted) {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000,
          distanceInterval: 50,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: "Track Fleet Pro",
            notificationBody: "Tracking delivery location",
            notificationColor: "#1D92ED",
          },
        });
        console.log("Background location tracking started");
      }
    } catch (e: any) {
      console.log("Background location tracking failed to start (expected in Expo Go without Custom Dev Client):", e.message);
    }
  };

  // Request Permissions Flow
  const requestPermissions = async () => {
    try {
      // 1. Request Foreground
      try {
        const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
        if (fgStatus !== Location.PermissionStatus.GRANTED) {
          setPermissionStatus(fgStatus);
          Alert.alert(
            "Permission Required", 
            "Location permission is required to track deliveries.",
            [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
          );
          return;
        }
      } catch (err: any) {
         console.error("Error requesting foreground permissions:", err);
         return;
      }

      // 2. Request Background
      try {
        const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
        setPermissionStatus(bgStatus);

        if (bgStatus === Location.PermissionStatus.GRANTED) {
          await startLocationTracking();
        } else {
          console.log("Background permission not granted or not supported in this client.");
        }
      } catch (err: any) {
        console.log("Error requesting background permissions (expected in Expo Go):", err.message);
      }
    } catch (e) {
      console.error("Error requesting permissions (general)", e);
    }
  };

  // Initial Check
  useEffect(() => {
    const init = async () => {
      try {
        const enabled = await checkLocationServices();
        if (enabled) {
          const { status: fgStatus } = await Location.getForegroundPermissionsAsync();
          
          if (fgStatus === Location.PermissionStatus.GRANTED) {
            setPermissionStatus(Location.PermissionStatus.GRANTED);
            const { status: bgStatus } = await Location.getBackgroundPermissionsAsync();
            if (bgStatus === Location.PermissionStatus.GRANTED) {
              startLocationTracking();
            } else {
              requestPermissions();
            }
          } else {
            requestPermissions();
          }
        }
      } catch (error) {
        console.log("Error during location init:", error);
      }
    };
    init();

    // AppState listener to re-check when returning to app
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        await checkLocationServices();
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status === Location.PermissionStatus.GRANTED) {
          setPermissionStatus(Location.PermissionStatus.GRANTED);
          const { status: bgStatus } = await Location.getBackgroundPermissionsAsync();
          if (bgStatus === Location.PermissionStatus.GRANTED) {
            startLocationTracking();
          }
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Foreground Subscription
  useEffect(() => {
    let subscriber: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      if (permissionStatus === Location.PermissionStatus.GRANTED && isLocationEnabled) {
        try {
          subscriber = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
            (loc) => {
              setLocation(loc);
            }
          );
        } catch (e) {
          console.log("Error watching position", e);
        }
      }
    };

    startWatching();

    return () => {
      if (subscriber) subscriber.remove();
    };
  }, [permissionStatus, isLocationEnabled]);

  const handleEnableLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        await Location.enableNetworkProviderAsync();
        // Re-check immediately
        checkLocationServices();
      } catch (e) {
        Linking.openSettings();
      }
    } else {
      Linking.openSettings();
    }
  };

  return (
    <LocationContext.Provider value={{ location, permissionStatus, isLocationEnabled, requestPermissions, checkLocationServices }}>
      {children}
      <LocationEmergencyAlertModal 
        visible={showLocationModal} 
        onClose={() => {
          // Cannot close without enabling
          checkLocationServices();
        }} 
        onConfirm={handleEnableLocation}
      />
    </LocationContext.Provider>
  );
};