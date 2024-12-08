import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '@/contexts/UserContext';
import { StatusBar } from 'expo-status-bar';
import { AlertProvider } from '@/contexts/alertContext';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();
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

  //register app for firebase
  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    }
    else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }
  //send notification from local
  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "You've got mail from ishu! 📬",
  //       body: 'Here is the notification body',
  //       data: { data: 'goes here', test: { test1: 'more data' } },
  //     },
  //     //@ts-ignore
  //     trigger: { seconds: 2 }
  //   });
  // }

  // tmp comment
  // useEffect(() => {
  //   registerForPushNotificationsAsync()

  //   if (Platform.OS === 'android') {
  //     Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
  //   }
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(notificationListener.current);
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);


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

