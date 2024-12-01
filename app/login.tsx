import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Login } from '../services/UserServices';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '..';
import { Link, router } from 'expo-router';
import { GetUserDto } from '../dtos/user.dto';
import { TextInput, Button, Text, Divider, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginScreen = () => {
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState<string | undefined>()
  const { mutate, data, isSuccess, isLoading, error } = useMutation<
    AxiosResponse<{ user: GetUserDto; token: string }>,
    BackendError,
    { username: string; password: string; multi_login_token?: string }
  >(Login, {
    onError: ((error) => {
      error && setMessage(error.response.data.message || "")
    })
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    const retrieveCredentials = async () => {
      const savedUsername = await AsyncStorage.getItem('uname');
      const savedPassword = await AsyncStorage.getItem('passwd');
      if (savedUsername && savedPassword) {
        formik.setValues({ username: savedUsername, password: savedPassword });
      }
    };
    retrieveCredentials();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data.user);
      router.replace('/');
      AsyncStorage.setItem('uname', formik.values.username);
      AsyncStorage.setItem('passwd', formik.values.password);
      setMessage(undefined)
    }
    if (error) {
      setMessage(error?.response?.data?.message || 'Unknown error occurred');
    }
  }, [isSuccess, error]);

  return (
    <>
      {message && <Snackbar
        visible={message ? true : false}
        onDismiss={() => setMessage(undefined)}
        action={{
          label: 'Close',
          onPress: () => {
            setMessage(undefined)
          },
        }}
        duration={3000} // Optional: Snackbar duration (in milliseconds)
      >
        {message}
      </Snackbar>}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Image style={styles.logo} source={require('../assets/images/favicon.png')} />
          <Divider style={styles.divider} />
          <Text style={styles.header}>Welcome Back!</Text>

          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            autoCapitalize="none"
            style={styles.input}
            mode="outlined"
            error={formik.touched.username && !!formik.errors.username}
          />
          {formik.touched.username && formik.errors.username && (
            <Text style={styles.errorText}>{formik.errors.username}</Text>
          )}

          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
            mode="outlined"
            error={formik.touched.password && !!formik.errors.password}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}

          <Button
            mode="contained"
            onPress={() => formik.handleSubmit()}
            loading={isLoading}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Login
          </Button>

          <Button
            mode="text"
            style={styles.linkButton}
            disabled={isLoading}
          >
            <Text style={styles.linkText}>
              <Link style={styles.link} href="/register">Register</Link> or{' '}
              <Link style={styles.link} href="/forgot-password">Forgot Password?</Link>
            </Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  form: {
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 16,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    marginVertical: 16,
  },
  header: {
    fontSize: 24,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'SpaceMono-Regular',
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  linkText: {
    fontFamily: 'SpaceMono-Regular',
    textDecorationStyle: undefined,
    color: 'red',
  },
  link: {
    color: 'black',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    letterSpacing: 1.5,
    textDecorationLine: undefined
  },
  errorText: {
    color: 'red',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default LoginScreen;
