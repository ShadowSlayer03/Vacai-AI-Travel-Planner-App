import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
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
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
