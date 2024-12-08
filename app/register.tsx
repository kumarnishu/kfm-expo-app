import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, TextInput, HelperText, Text, Snackbar } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { Register } from '@/services/UserServices';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { AxiosResponse } from 'axios';
import { BackendError } from '..';

function register() {
  const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [message, setMessage] = useState<string | undefined>()
  const { mutate, isSuccess, isLoading, error } = useMutation<
    AxiosResponse<{ message: string }>,
    BackendError,
    FormData
  >(Register, {
    onError: ((error) => {
      error && setMessage(error.response.data.message || "")
    })
  });


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      mobile: "",
      dp: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required').min(4).max(30),
      email: Yup.string().required('Required').email('Invalid email'),
      password: Yup.string().required('Required').min(4).max(30),
      mobile: Yup.string().required('Required').length(10),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
      mutate(formData);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setMessage(`${formik.values.username} ThankYou for joining With us !!`)
      setTimeout(() => {
        {
          formik.resetForm()
          router.replace('/login');
        }
      }, 3000);
    }

  }, [isSuccess]);

  const handleImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setMessage('Permission required Please grant media access to pick an image.')
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      formik.setFieldValue('dp', {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType || 'image/*',
        name: result.assets[0].fileName + String(Number(new Date())),
      });
      setMessage('file selected')
    }
    else {
      setSelectedImage(null);
    }
  };
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
      <ScrollView>
        <View style={styles.form}>

          {selectedImage && <View style={styles.imageView}>
            <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
          </View>}
          <Text style={{ fontSize: 30, textAlign: 'center', padding: 20, fontWeight: 'bold' }}>Create Account</Text>
          <TextInput
            label="Username"
            mode="outlined"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
          />
          <HelperText type="error" visible={formik.touched.username && Boolean(formik.errors.username)}>
            {formik.errors.username}
          </HelperText>

          <TextInput
            label="Email"
            mode="outlined"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <HelperText type="error" visible={formik.touched.email && Boolean(formik.errors.email)}>
            {formik.errors.email}
          </HelperText>

          <TextInput
            label="Mobile"
            mode="outlined"
            keyboardType="number-pad"
            value={formik.values.mobile}
            onChangeText={formik.handleChange('mobile')}
            onBlur={formik.handleBlur('mobile')}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          />
          <HelperText type="error" visible={formik.touched.mobile && Boolean(formik.errors.mobile)}>
            {formik.errors.mobile}
          </HelperText>

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          <HelperText type="error" visible={formik.touched.password && Boolean(formik.errors.password)}>
            {formik.errors.password}
          </HelperText>

          <Button
            icon="file"
            mode="outlined"
            onPress={handleImagePicker}
            style={styles.imagePickerButton}
          >
            Choose Display Picture
          </Button>


          <HelperText type="error" visible={formik.touched.dp && Boolean(formik.errors.dp)}>
            {formik.errors.dp}
          </HelperText>

          <Button
            mode="contained"
            onPress={() => formik.handleSubmit()}
            loading={isLoading}
            disabled={isLoading}
          >
            Register
          </Button>

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({

  form: {
    gap: 1,
    paddingHorizontal: 10,
    marginTop: 30
  },
  imageView: {
    flex: 1, flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedImage: {
    width: 60,
    height: 60,
    borderRadius: 75,
    marginBottom: 16,
  },
  imagePickerButton: {
    marginBottom: 16,
    width: '100%',
  }
});

export default register;
