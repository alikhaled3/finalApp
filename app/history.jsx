import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import prescriptionImage from '@/assets/images/prescription.jpeg';
const Prescription = () => {
  // Mock prescription data
  const prescription = {
    date: '20-1-2025',
    photo: prescriptionImage, 
    drugs: [
      {
        name: 'Paracetamol',
        dose: '15mg',
        notes: '3 times a day after meals',
      },
      {
        name: 'Ibuprofen',
        dose: '200mg',
        notes: 'Twice a day with food',
      },
    ],
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Prescription Card */}
      <View className="bg-white rounded-lg shadow-lg p-4">
        {/* Prescription Image and Date */}
        <View className="items-center justify-center mb-4">
          <Image source={prescription?.photo} className="w-20 h-20 rounded-lg" />
          <Text className="text-gray-500 text-sm mt-2">Date: {prescription.date}</Text>
        </View>

        {/* Drug List */}
        <ScrollView>
          {prescription.drugs.map((drug, index) => (
            <View key={index} className="mb-4 border-b pb-2 border-gray-300">
              <Text className="text-gray-500 text-sm">Drug Name</Text>
              <Text className="text-lg font-bold text-gray-800">{drug.name}</Text>

              <Text className="text-gray-500 text-sm">Dose</Text>
              <Text className="text-lg font-bold text-gray-800">{drug.dose}</Text>

              <Text className="text-gray-500 text-sm">Notes</Text>
              <Text className="text-lg font-bold text-gray-800">{drug.notes}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Prescription;
