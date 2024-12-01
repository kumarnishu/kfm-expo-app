import React, { useContext } from 'react';
import { Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '@/contexts/UserContext';
import { ActivityIndicator, Icon, Snackbar } from 'react-native-paper';
import { AlertContext } from '@/contexts/alertContext';
import Navbar from '@/components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { alert, setAlert } = useContext(AlertContext);
  const { user, isLoading } = useContext(UserContext)

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
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: () => <Icon
                source="home"
                size={25}
              />
            }}
          />
          <Tabs.Screen
            name="services"
            options={{
              title: 'Services',
              tabBarIcon: () => <Icon
                source="file-tree-outline"
                size={25}
              />
            }}
          />
          <Tabs.Screen
            name="notifications"
            options={{
              title: 'Notifications',
              href: null,
              tabBarIcon: () => <Icon
                source="bell"
                size={25}
              />
            }}
          />
          <Tabs.Screen
            name="requests"
            options={{
              title: 'My Requests',
              tabBarIcon: () => <Icon
                source="forum"
                size={25}
              />
            }}
          />
        </Tabs >
      </>
    );


}
