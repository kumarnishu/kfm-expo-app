import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '@/contexts/UserContext';
import { StatusBar } from 'expo-status-bar';
import { AlertContext, AlertProvider } from '@/contexts/alertContext';

SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 200
    }
  }
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });

  const paperTheme = colorScheme === 'light'
    ? {
      ...MD3LightTheme,
      colors: {
        ...MD3LightTheme.colors,
        primary: '#FF0000', // Bright red
        onPrimary: '#FFFFFF', // White text on red
        background: '#FFFFFF', // White background
        surface: '#FFFFFF', // Card background
        onSurface: '#FF0000', // Red text on white
        accent: '#FF6666', // Softer red for accents
      },
    }
    : {
      ...MD3DarkTheme,
      colors: {
        ...MD3DarkTheme.colors,
        primary: '#FF6666', // Softer red for dark theme
        onPrimary: '#FFFFFF', // White text on red
        background: '#1A1A1A', // Dark background
        surface: '#333333', // Surface background for dark mode
        onSurface: '#FFFFFF', // White text on dark
        accent: '#FF0000', // Bright red for accents
      },
    };


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }



  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SafeAreaProvider>
          <PaperProvider theme={paperTheme}>
            <AlertProvider>
              <>
                <StatusBar style='auto' />
                <Slot />
              </>
            </AlertProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}

