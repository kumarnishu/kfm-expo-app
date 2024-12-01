import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput, ActivityIndicator, Snackbar } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { UserContext } from '@/contexts/UserContext';
import { SendMailForResetPasswordLink } from '@/services/UserServices';
import { router } from 'expo-router';


function ResetPasswordSendMailForm() {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState<string | undefined>()

  const { mutate, isSuccess, isLoading, isError, error } = useMutation<
    { data: string },
    { response: { data: { message: string } } },
    { email: string }
  >(SendMailForResetPasswordLink, {
    onError: ((error) => {
      error && setMessage(error.response.data.message || "")
    })
  });

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required field'),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });


  useEffect(() => {
    if (isSuccess) {
      setMessage(`Password reset link has been sent to ${formik.values.email}`)
      setTimeout(() => {
        {
          formik.resetForm()
          router.replace('/login');
        }
      }, 3000);
    }

  }, [isSuccess]);
  return (
    <View style={styles.container}>
      <TextInput
        label="Your Email"
        mode="outlined"
        keyboardType="email-address"
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        error={formik.touched.email && !!formik.errors.email}
      />
      <HelperText type="error" visible={formik.touched.email && !!formik.errors.email}>
        {formik.errors.email}
      </HelperText>
      <HelperText type="info" visible>
        This will mail you a password reset link in your inbox! If not found, please check your spam folder.
      </HelperText>


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
      <Button
        mode="contained"
        loading={isLoading}
        onPress={() => formik.handleSubmit()}
        disabled={isLoading}
        style={styles.button}
      >
        {isLoading ? <ActivityIndicator /> : 'Send'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default ResetPasswordSendMailForm;
