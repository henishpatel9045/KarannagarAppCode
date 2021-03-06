import React from "react";
import LottieView from "lottie-react-native";

export default function LoadingSceen({ visible = true }) {
  if (!visible) return null;
  return (
    <LottieView
      source={require("../assets/animations/loading.json")}
      autoPlay
      loop
    />
  );
}
