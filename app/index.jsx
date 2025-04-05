import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'expo-router';
import NavigationHead from './navigationHead';
import coffeImage from '@/assets/images/3d-medical-prescription-pills-healthcare-medicine-concept_313242-1229.jpg';

const Home = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in effect
  const slideUpAnim = useRef(new Animated.Value(100)).current; // For slide-up effect

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Slide-up animation
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 1000,
      delay: 500, // Delay to start after fade-in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideUpAnim]);

  return (
    <>
      <NavigationHead />
      <View className="flex-1 justify-center items-center bg-white p-10">
        {/* Fade-in animation for the image */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image source={coffeImage} className="w-72 h-72  mb-8" />
        </Animated.View>

        {/* Slide-up animation for the title */}
        <Animated.View
          style={{
            transform: [{ translateY: slideUpAnim }],
            opacity: fadeAnim,
          }}
        >
          <Text className="text-2xl font-bold mb-4 text-center">
            Welcome to Pharmacology
          </Text>
        </Animated.View>

        {/* Slide-up animation for the description */}
        <Animated.View
          style={{
            transform: [{ translateY: slideUpAnim }],
            opacity: fadeAnim,
          }}
        >
          <Text className="text-base text-center text-gray-600 mb-8">
            Our OCR on prescription tool lets you quickly read your poorly handwritten prescription.
          </Text>
        </Animated.View>

        {/* Slide-up animation for the button */}
        <Animated.View
          style={{
            transform: [{ translateY: slideUpAnim }],
            opacity: fadeAnim,
          }}
        >
          <Link href="/login" asChild>
            <TouchableOpacity className="bg-blue-500 py-3 px-6 rounded-full w-64 items-center">
              <Text className="text-white text-lg font-bold">Get Started</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </View>
    </>
  );
};

export default Home;