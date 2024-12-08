import React, { useContext } from 'react';
import { Href, Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '@/contexts/UserContext';
import { ActivityIndicator, Icon, Snackbar } from 'react-native-paper';
import { AlertContext } from '@/contexts/alertContext';
import Navbar from '@/components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';





export default function TabLayout() {
  const { alert, setAlert } = useContext(AlertContext);
  const { user, isLoading } = useContext(UserContext)

  const tabsData: { name: string, title: string, icon?: React.ComponentProps<typeof MaterialIcons>['name'], href: Href | null }[] = [
    {
      name: 'index',
      title: 'Home',
      icon: 'home',
      href: '/'
    },
    {
      name: 'explore',
      title: 'Explore',
      icon: 'search',
      href: '/(app)/explore'
    },
    {
      name: 'notifications',
      title: 'Notifications',
      icon: 'notification-important',
      href: null, // Optional property to handle special cases
    },
    {
      name: 'requests',
      title: 'My Requests',
      icon: 'forum',
      href: '/(app)/requests'
    },
    {
      name: 'products',
      title: 'Products',
      href: null
    },
    {
      name: 'spares',
      title: 'Spares',
      href: null
    },
    {
      name: 'engineer',
      title: 'Engineers',
      href: null
    },
    {
      name: 'customers',
      title: 'Customers',
      href: null
    },
    {
      name: 'machines',
      title: 'Machines',
      href: null
    },
  ];

  if (isLoading)
    return <ActivityIndicator />

  if (!isLoading && !user) {
    return <Redirect href={"/login"} />
  }
  if (!isLoading && user)
    return (
      <>
        <SafeAreaView>
          <StatusBar style='auto' />
          <Navbar />
          {
            alert && <Snackbar
              visible={alert ? true : false}
              onDismiss={() => setAlert(undefined)}
              action={{
                label: 'Close',
                onPress: () => {
                  setAlert(undefined)
                },
              }}
              duration={3000} // Optional: Snackbar duration (in milliseconds)
            >
              {alert?.message}
            </Snackbar>
          }
        </SafeAreaView>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#6200ea', // Active icon color (purple)
            tabBarInactiveTintColor: '#828282', // Inactive icon color (gray)
            tabBarActiveBackgroundColor: 'whitesmoke'
          }}>

          {tabsData.map((tab) => (
            <Tabs.Screen
              key={tab.name}
              name={tab.name}
              options={{
                title: tab.title,
                href: tab.href || null, // Dynamically set href if provided
                tabBarIcon: () => <MaterialIcons name={tab.icon} size={25} color="red" />, // Replace `source` with `name` for dynamic icons
              }}
            />
          ))}
        </Tabs>
      </>
    );


}
