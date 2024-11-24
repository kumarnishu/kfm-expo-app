import { Redirect, Tabs } from 'expo-router';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/elements/ThemedText';
import { ThemedView } from '@/components/elements/ThemedView';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppLayout() {
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(false);
    const [isCustomer, setIsCustomer] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setUser(true);
        }, 1000);
    }, []);

    if (loading)
        return (
            <ThemedView>
                <ThemedText type="subtitle">Loading user data...</ThemedText>
            </ThemedView>
        );

    if (!user) return <Redirect href="/login" />;

    const screens = [
        <Tabs.Screen
            key="machines"
            name="index"
            options={{
                title: 'Machines',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="amazon" color={color} />,
            }}
        />,

        <Tabs.Screen
            key="spares"
            name="spares"
            options={{
                title: 'Spares',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="ambulance" color={color} />,
            }}
        />
        ,

        <Tabs.Screen
            key="settings"
            name="settings"
            options={{
                title: 'Settings',
                href: isCustomer ? null : '/(app)/settings',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
            }}
        />

    ].filter(Boolean); // Filter out `false` or `null` entries

    return (
        <SafeAreaView style={{ flex: 1, height: '100%' }}>
            <StatusBar style="auto" />
            <Tabs screenOptions={{ headerShown: false, animation: 'fade' }}>{screens}</Tabs>
        </SafeAreaView>
    );
}
