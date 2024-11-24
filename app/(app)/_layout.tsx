import { Redirect, Tabs } from 'expo-router';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/elements/ThemedText';
import { ThemedView } from '@/components/elements/ThemedView';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '@/contexts/UserContext';
import { LoadingContext } from '@/contexts/LoadingContext';

export default function AppLayout() {
    const { user } = React.useContext(UserContext)
    const { loading } = React.useContext(LoadingContext)

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
                href: user.is_engineer || user.is_admin ? null : '/(app)/settings',
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
