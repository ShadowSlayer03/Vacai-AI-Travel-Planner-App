import { View, TouchableOpacity, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from "../../context/CreateTripContext";

const SearchPlace = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);

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
        zIndex: 1, 
      }}
    >
      <TouchableOpacity onPress={() => router.push("/mytrip")}>
        <Ionicons name="return-up-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ marginTop: 10, flex: 1 }}>
        <Text style={{
          fontFamily: "nunito-bold",
          fontSize: 35
        }}>
          Travel From: 
        </Text>
        <GooglePlacesAutocomplete
          placeholder='Search Source Location'
          minLength={2}
          debounce={200}
          fetchDetails={true}
          onFail={error => console.log(error)}
          onPress={(data, details = null) => {
            console.log("data from autocomplete", data);
            setTripData({
              srcLocationInfo: {
                name: data.description,
              }
            });

            router.push("/create-trip/search-to-place");
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer:{
              borderWidth: 1,
              borderColor: Colors.black, 
              borderRadius: 5,
              marginTop: 25,
            },
            textInput: {
              marginBottom: 0
            },
            listView: {
              position: 'absolute',
              top: 80,  
              left: -10,
              zIndex: 2,  // Bring the dropdown in front of other components
              backgroundColor: Colors.white,  // Ensure it's not transparent
            }
          }}
          
        />
      </View>
    </View>
  );
};

export default SearchPlace;
