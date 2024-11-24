import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function AppLayout() {
    const [user, setUser] = useState(false)
    return (
        <GestureHandlerRootView>
            <Tabs>
                {user ?
                    <>
                        <Tabs.Screen name="index" options={{ headerShown: false }} />
                    </>
                    :
                    <>
                        <Tabs.Screen name="login" options={{ headerShown: false }} />
                        <Tabs.Screen name="signup" options={{ headerShown: false }} />
                    </>
                }
                <Tabs.Screen name="+not-found" />
            </Tabs>
            <StatusBar style="auto" />
        </GestureHandlerRootView>
    );
}
