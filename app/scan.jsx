import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import TabLayout from './naivgationBar';
import axios from 'axios';
const Scan = () => {
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi! Please upload your prescription image to begin.' }
  ]);

  const addMessage = (type, text, imageUri = null) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, type, text, image: imageUri },
    ]);
  };

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert('Permission Denied', 'Camera & gallery permissions are required.');
      return false;
    }
    return true;
  };

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
      const uri = result.assets[0].uri;
      setImage(uri);
      addMessage('user', 'Picked image from gallery.', uri);
    }
  };

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
      const uri = result.assets[0].uri;
      setImage(uri);
      addMessage('user', 'Captured image from camera.', uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    addMessage('bot', 'Uploading image...');
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post('http://localhost:5000/process/extract_text', formData);

      const result = await response.json();
      addMessage('bot', 'Image uploaded successfully! Ready to analyze.');
    } catch (error) {
      addMessage('bot', 'Failed to upload image. Please try again.');
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        className="flex-1 bg-blue-50"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView className="p-4 pt-6 mt-7 flex-1">
          {messages.map((msg) => (
            <View
              key={msg.id}
              className={`my-2 max-w-[80%] px-4 py-2 rounded-2xl ${
                msg.type === 'user' ? 'bg-blue-500 self-end' : 'bg-white self-start'
              }`}
              style={{ elevation: 3 }}
            >
              {msg.image && (
                <Image
                  source={{ uri: msg.image }}
                  className="w-40 h-40 rounded-lg mb-2"
                  resizeMode="cover"
                />
              )}
              <Text className={`${msg.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Action Buttons */}
        <View className="p-4 space-y-3 mb-6">
          <TouchableOpacity
            className="flex-row bg-blue-500 py-3 px-5 mb-3 rounded-full justify-center items-center"
            onPress={pickImage}
          >
            <AntDesign name="picture" size={20} color="white" />
            <Text className="text-white text-sm font-bold ml-2">Pick Image from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row bg-blue-500 py-3 px-5 rounded-full mb-3 justify-center items-center"
            onPress={takePhoto}
          >
            <Feather name="camera" size={20} color="white" />
            <Text className="text-white text-sm font-bold ml-2">Take a Photo</Text>
          </TouchableOpacity>

          {image && (
            <TouchableOpacity
              className="flex-row bg-green-500 py-3 px-5 rounded-full justify-center items-center"
              onPress={uploadImage}
            >
              <Entypo name="upload" size={20} color="white" />
              <Text className="text-white text-sm font-bold ml-2">Read Prescription</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      <TabLayout />
    </>
  );
};

export default Scan;
