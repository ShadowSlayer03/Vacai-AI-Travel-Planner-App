import { View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Radar, { Autocomplete } from 'react-native-radar';

Radar.initialize(process.env.EXPO_PUBLIC_RADAR_API_KEY);

const SearchPlace = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 60,
        backgroundColor: Colors.white,
        height: '100%',
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="return-up-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <Autocomplete
          onSelection={(address) => {
            console.log(address);
          }}
        />
      </View>
    </View>
  );
};

export default SearchPlace;
