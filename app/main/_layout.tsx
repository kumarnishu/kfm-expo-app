import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ title: 'profile' }} />
    </Stack>
  );
}
