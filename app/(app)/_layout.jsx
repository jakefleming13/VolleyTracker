import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="seasons" options={{ headerShown: false }} />
      <Stack.Screen name="addSeason" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
