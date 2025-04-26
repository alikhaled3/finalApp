import React from 'react';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import prescriptionImage from '@/assets/images/prescription.jpeg';

const Prescription = () => {
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
      {
        name: 'Amoxicillin',
        dose: '500mg',
        notes: 'Every 8 hours for 7 days',
      },
      {
        name: 'Loratadine',
        dose: '10mg',
        notes: 'Once daily for allergies',
      },
    ],
  };

  const renderCard = ({ item }) => (
    <View
      className="bg-white rounded-2xl w-[48%] m-1 h-72 px-5 py-5 "
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5, // for Android
      }}
    >
      {/* Image */}
      <Image
        source={prescription.photo}
        className="w-full h-24 rounded-xl mb-3"
        resizeMode="cover"
      />

      {/* Date */}
      <Text className="text-gray-400 text-xs mb-1">Date: {prescription.date}</Text>

      {/* Drug info */}
      <Text className="text-gray-800 text-base font-bold mb-1">{item.name}</Text>
      <Text className="text-gray-500 text-xs mb-0.5">Dose: {item.dose}</Text>
      <Text className="text-gray-500 text-xs mb-2">Notes: {item.notes}</Text>

      {/* Stars */}

    </View>
  );

  return (
    <LinearGradient
      colors={['#5c68d4', '#ffffff']}
      className="flex-1 p-4"
      style={{ minHeight: Dimensions.get('window').height }}
    >
      <FlatList
        data={prescription.drugs}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default Prescription;
