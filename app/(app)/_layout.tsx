import React, { useContext } from 'react';
import { Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '@/contexts/UserContext';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { AlertContext } from '@/contexts/alertContext';

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
        <StatusBar style='auto' />
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
        <Tabs
          screenOptions={{
            headerShown: false
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',

            }}
          />
          <Tabs.Screen
            name="machines"
            options={{
              title: 'Machines',

            }}
          />
        </Tabs>
      </>
    );


}
