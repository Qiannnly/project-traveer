import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import UserProvider from "@/context/UserProvider";
import * as Location from "expo-location";
import { UserLocationContext } from "@/context/UserLocationContext";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";

export type CoordinatesTypes = {
  lat: number;
  lng: number;
};
export default function RootLayout() {
  const [userLocation, setUserLocation] = useState<CoordinatesTypes>({
    lat: 0,
    lng: 0,
  });

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "green" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),

    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "red" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),
  };

  useFonts({
    poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    "poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  const getUserCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      distanceInterval: 1,
    });
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;

    setUserLocation({ lat, lng });
  };

  return (
    <>
      <UserLocationContext.Provider value={{ userLocation }}>
        <UserProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(routes)/onboarding/index" />
            <Stack.Screen name="(routes)/login/index" />
            <Stack.Screen name="(routes)/register/index" />
          </Stack>
          <Toast config={toastConfig} />
        </UserProvider>
      </UserLocationContext.Provider>
    </>
  );
}
