import { Link } from 'expo-router'; // Import Link
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function CustomTabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View className="flex justify-end mb-6 ">
      {/* Custom Tab Bar */}
      <View className="flex-row justify-around items-center bg-blue-100 border-t border-gray-300 py-3">
        <Link href="/history" asChild>
          <TouchableOpacity className="items-center">
          <FontAwesome5 name="history" size={24} color="black" />
            <Text className="text-sm mt-1 text-black">History</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/scan" asChild>
          <TouchableOpacity className="items-center ">
            <Ionicons
              name="scan"
              size={24}
              
            />
            <Text className="text-sm mt-1 text-black">Scan</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/profile" asChild>
          <TouchableOpacity className="items-center">
          <Ionicons name="person-circle-outline" size={24} color="black" />
            <Text className="text-sm mt-1 text-black">Profile</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}