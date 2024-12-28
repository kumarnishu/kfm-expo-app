import React, { useEffect, useState } from 'react';
import { SendOtp } from '../services/UserServices';
import {
  Image,
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
  const [message, setMessage] = useState<string | undefined>()
  const { mutate, isSuccess, isLoading, error } = useMutation<
    AxiosResponse<{ user: GetUserDto; token: string }>,
    BackendError,
    { mobile: string }
  >(SendOtp, {
    onError: ((error) => {
      error && setMessage(error.response.data.message || "")
    })
  });

  const formik = useFormik({
    initialValues: {
      mobile: '',
    },
    validationSchema: Yup.object({
      mobile: Yup.string().required('mobile is required').min(10, 'mobile must be 10 digits').max(10, 'mobile must be 10 digits').matches(/^[0-9]+$/, 'mobile must be a number'),
    }),
    onSubmit: async (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    const retrieveCredentials = async () => {
      const savedmobile = await AsyncStorage.getItem('uname');
      if (savedmobile) {
        formik.setValues({ mobile: savedmobile });
      }
    };
    retrieveCredentials();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      //@ts-ignore
      router.replace(`/otpverify/?mobile=${formik.values.mobile}`);
      AsyncStorage.setItem('uname', formik.values.mobile);
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
      <View style={{ flex: 1, padding: 20, flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
        <Image style={{ width: 300, height: 70, marginLeft: 30 }} source={require('../assets/img/icon.png')} />
        <TextInput
          label="Enter your mobile"
          placeholder="Enter your mobile"
          autoFocus
          value={formik.values.mobile}
          onChangeText={formik.handleChange('mobile')}
          onBlur={formik.handleBlur('mobile')}
          keyboardType='numeric'
          mode="outlined"
          style={{ backgroundColor: 'white', paddingTop: 10, borderRadius: 10 }}
          error={formik.touched.mobile && !!formik.errors.mobile}
        />
        {formik.touched.mobile && formik.errors.mobile && <Text style={{ color: 'red' }}>{formik.errors.mobile}</Text>} <Divider />
        <Button
          mode="contained"
          onPress={() => formik.handleSubmit()}
          loading={isLoading}
          buttonColor='red'
          style={{ padding: 5, borderRadius: 10 }}
        >
          {' Send OTP '}
        </Button>

        <Button
          mode="text"
          disabled={isLoading}
        >
          <Text >
            <Link style={{ textAlign: 'center', fontSize: 14, marginTop: 30 }} href="/register">I donot have an Account ? Register </Link>
          </Text>
        </Button>
      </View >
    </>
  );
};


export default LoginScreen;
