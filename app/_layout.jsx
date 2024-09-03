import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { useState } from "react";
import { CreateTripContext } from "@/context/CreateTripContext"


export default function RootLayout() {
  const [tripData, setTripData] = useState([]);

  const [fontsLoaded] = useFonts({
    "nunito": require("../assets/fonts/Nunito-Regular.ttf"),
    "nunito-light": require("../assets/fonts/Nunito-Light.ttf"),
    "nunito-medium": require("../assets/fonts/Nunito-Medium.ttf"),
    "nunito-semibold": require("../assets/fonts/Nunito-SemiBold.ttf"),
    "nunito-bold": require("../assets/fonts/Nunito-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CreateTripContext.Provider>
  );
}
