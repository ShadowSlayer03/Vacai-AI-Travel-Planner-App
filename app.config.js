import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: "AI travel planner application",
  slug: "ai-travel-planner-application",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.jpg",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/vacai-bw.png",
      backgroundColor: "#ffffff",
    },
    package: "com.shadowslayer03.aitravelplannerapplication",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-build-properties",
      {
        android: {
          usesCleartextTraffic: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "34c34c3e-59f6-497b-8007-4bf882852b5c",
    },
    EXPO_PUBLIC_GOOGLE_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
    EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY,
    EXPO_PUBLIC_GOOGLE_CX_ID: process.env.EXPO_PUBLIC_GOOGLE_CX_ID,
  },
  owner: "shadowslayer03",
});
