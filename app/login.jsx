import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import NavigationHead from './navigationHead';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      <NavigationHead />
      <View className="flex-1 justify-center items-center bg-gray-100 p-6">
        {/* Login Form Card */}
        <View className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          {/* Title */}
          <Text className="text-2xl font-bold text-center mb-6">Welcome Back</Text>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-sm text-gray-600 mb-1">Email</Text>
            <TextInput
              className="w-full h-12 border border-gray-300 rounded-lg px-4"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-sm text-gray-600 mb-1">Password</Text>
            <TextInput
              className="w-full h-12 border border-gray-300 rounded-lg px-4"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Login Button */}
          <Link href="/scan" asChild>
            <TouchableOpacity className="bg-blue-600 py-3 rounded-lg w-full items-center">
              <Text className="text-white text-lg font-bold">Login</Text>
            </TouchableOpacity>
          </Link>

          {/* Register Link */}
          <Text className="text-center mt-4 text-gray-600">
            New member?{' '}
            <Link href="/register" className="text-blue-600 font-bold">
              Register now
            </Link>
          </Text>
        </View>
      </View>
    </>
  );
};

export default Login;