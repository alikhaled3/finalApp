import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TabLayout from './naivgationBar';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';




const scan = () => {
  const [image, setImage] = useState(null);

  // Request permissions for camera and gallery
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera and gallery permissions to make this work!'
      );
      return false;
    }
    return true;
  };

  // Open gallery to pick an image
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Open camera to take a photo
  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload image to a server (mock function)
  const uploadImage = async () => {
    if (!image) {
      Alert.alert('No Image', 'Please select or take a photo first.');
      return;
    }

    // Here you can implement the logic to upload the image to your server
    // For example, using fetch or axios
    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('https://your-server.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      Alert.alert('Success', 'Image uploaded successfully!');
      console.log(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image.');
      console.error(error);
    }
  };

  return  <>
      <View className="flex-1 justify-center items-center mt-12 p-5 bg-blue-50">
        {/* Title */}
        <Text className=" text-2xl font-bold mb-5 text-center">
          Upload Prescription
        </Text>

        {/* Display selected image or upload icon */}
        <View className="w-48 h-48 justify-center items-center border-2 border-blue-500 rounded-lg mb-5">
          {image ? (
            <Image source={{ uri: image }} className="w-full h-full rounded-lg" />
          ) : (
            <Entypo name="upload" size={50} color="#007BFF" />
          )}
        </View>

        {/* Buttons for picking image and taking photo */}

        {/* Upload button (commented out for now) */}
                  <TouchableOpacity
                    className="flex-row bg-blue-500 py-3 px-5 rounded-full mb-4 w-64 justify-center items-center"
                    onPress={pickImage}
                  >
                    <AntDesign name="picture" size={24} color="white" className="mr-2" />
                    <Text className="text-white text-lg font-bold">
                      Pick Image from Gallery
                    </Text>
                  </TouchableOpacity>
          
                  <TouchableOpacity
                    className="flex-row bg-blue-500 py-3 px-5 rounded-full mb-4 w-64 justify-center items-center"
                    onPress={takePhoto}
                    >
                    <Feather name="camera" size={24} color="white" className="mr-2" />
                    <Text className="text-white text-lg font-bold">
                      Take a Photo
                    </Text>
                  </TouchableOpacity>

                  {!image? '':
                    <TouchableOpacity
                      className="flex-row bg-green-500 py-3 px-5 rounded-full mb-4 w-64 justify-center items-center"
                      onPress={uploadImage}
                      >
                      <Text className="text-white text-lg font-bold">
                      Read Prescritpion
                      </Text>
                      </TouchableOpacity>

                  }

      </View >
                  <TabLayout/>
    </>

};

export default scan;

