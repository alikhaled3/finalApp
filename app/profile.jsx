import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import profileImage from '@/assets/images/splash-icon.png';

const Profile = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software Engineer | React Native Enthusiast',
    photo: profileImage, // Replace with actual user photo URL
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* User Photo */}
      <View className="items-center mt-8">
        <Image
          source={user.photo}
          className="w-32 h-32 rounded-full border-4 border-white"
        />
        <TouchableOpacity className="mt-2">
          <AntDesign name="camera" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* User Information */}
      <View className="mt-8">
        {/* Name */}
        <View className="bg-white p-4 rounded-lg mb-4">
          <Text className="text-gray-500 text-sm">Name</Text>
          <Text className="text-lg font-bold mt-1">{user.name}</Text>
        </View>

        {/* Email */}
        <View className="bg-white p-4 rounded-lg mb-4">
          <Text className="text-gray-500 text-sm">Email</Text>
          <Text className="text-lg font-bold mt-1">{user.email}</Text>
        </View>

        {/* Bio */}
        <View className="bg-white p-4 rounded-lg mb-4">
          <Text className="text-gray-500 text-sm">Bio</Text>
          <Text className="text-lg font-bold mt-1">{user.bio}</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity className="bg-blue-500 py-3 px-6 rounded-full items-center mt-8">
        <Text className="text-white text-lg font-bold">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;