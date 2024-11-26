import { Redirect, Tabs } from 'expo-router';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../contexts/UserContext';
import { ActivityIndicator } from 'react-native';
import NavBar from '../../components/NavBar';

export default function AppLayout() {
    const { user, isLoading } = React.useContext(UserContext)

    if (isLoading)
        return (
            <ActivityIndicator />
        );


    if (user) {
        const screens = [
            <Tabs.Screen
                key="index"
                name="index"
                options={{
                    title: 'index',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />,

            <Tabs.Screen
                key="explore"
                name="explore"
                options={{
                    title: 'explore',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="expand" color={color} />,
                }}
            />
            ,

            <Tabs.Screen
                key="me"
                name="me"
                options={{
                    title: 'Me',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />

        ].filter(Boolean);
        return (
            <SafeAreaView style={{ flex: 1, height: '100%' }}>
                <StatusBar style="auto" />
                <NavBar />
                <Tabs screenOptions={{ headerShown: false, animation: 'fade' }}>{screens}</Tabs>
            </SafeAreaView>
        );
    }
    return <Redirect href="/login" />;
}
