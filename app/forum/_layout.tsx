import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="selectBooks" />
      <Stack.Screen name="userForum" />
    </Stack>
  );
};

export default Layout;
