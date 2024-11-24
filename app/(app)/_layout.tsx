import { Redirect, Tabs } from 'expo-router';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/elements/ThemedText';
import { ThemedView } from '@/components/elements/ThemedView';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '@/components/headers/MainHeader';

export default function AppLayout() {
    const [loading, setLoading] = React.useState(true)
    const [user, setUser] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
            setUser(true)
        }, 1000)
    }, [])

    if (loading)
        return <ThemedView><ThemedText type='subtitle'>Loading user data...</ThemedText></ThemedView>

    if (!user)
        return <Redirect href="/login" />

    return (
        <SafeAreaView style={{ flex: 1, height: '100%' }}>
            <StatusBar style="auto" />
            <Tabs screenOptions={{ headerShown: true }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                        header: () => <MainHeader />,
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    }}
                />
            </Tabs>

        </SafeAreaView>
    )

}






