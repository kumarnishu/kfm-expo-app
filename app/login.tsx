import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Login } from '../services/UserServices';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '..';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserDto } from '../dtos/user.dto';
import { Input,Button } from '@rneui/themed';


const LoginScreen = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const { mutate, data, isSuccess, isLoading, error } = useMutation<
    AxiosResponse<{ user: GetUserDto; token: string }>,
    BackendError,
    { username: string; password: string; multi_login_token?: string }
  >(Login);

  useEffect(() => {
    const retrieveCredentials = async () => {
      const savedUsername = await AsyncStorage.getItem('uname');
      const savedPassword = await AsyncStorage.getItem('passwd');
      setUsername(savedUsername || '');
      setPassword(savedPassword || '');
    };
    retrieveCredentials();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data.user);
      router.replace('/');
      AsyncStorage.setItem('uname', username || '');
      AsyncStorage.setItem('passwd', password || '');
    }
    if (error) {
      Alert.alert(error?.response?.data?.message || 'Unknown error occurred');
    }
  }, [isSuccess, error]);

  const handleSubmit = () => {
    if (username && password) {
      mutate({ username, password });
    } else {
      Alert.alert('Please enter both username and password.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="Username, Email, or Mobile"
          placeholder="Enter your username"
          value={username || ''}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password || ''}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          title="login"
          onPress={handleSubmit}
          loading={isLoading}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'whitesmoke',         // Light red border color
    borderRadius: 30,
    marginTop: 200,
    margin: 10,
    padding: 25,
    paddingVertical: 50,
    backgroundColor: '#f9f9f9',     // Light background color for better visibility

    // Shadow properties for iOS
    shadowColor: '#000',            // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
    shadowOpacity: 0.3,             // Shadow opacity
    shadowRadius: 2,                // Shadow blur radius

    // Elevation for Android
    elevation: 1,                   // Controls the shadow for Android
  },


  logo: {
    height: 130,
    width: 130,
    borderRadius: 85,              // Makes the logo circular
    borderWidth: 2,
    marginBottom: 25,
    shadowColor: '#000',           // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
    shadowOpacity: 0.3,            // Shadow opacity
    shadowRadius: 5,               // Shadow blur radius
    elevation: 5,                   // Elevation for Android
    alignSelf: 'center',            // Center the logo horizontally
  },
  button: {
    backgroundColor: '#FF4D4D',
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    minHeight: 50
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    letterSpacing: 1.5
  },
});

export default LoginScreen;