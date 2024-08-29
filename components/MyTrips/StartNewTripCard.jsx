import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

const StartNewTripCard = () => {
    const router = useRouter();
    return (
        <View style={{
            padding: 20,
            marginTop: 50,
            alignItems: "center",
            gap: 30
        }}>
            <FontAwesome6 name="location-dot" size={30} color="black" />
            <Text style={{
                fontSize: 25,
                fontFamily: "nunito-semibold"
            }}>
                No Trips Planned Yet
            </Text>
            <Text style={{
                fontSize: 15,
                fontFamily: "nunito-light",
                textAlign: "center",
                color: Colors.gray
            }}>
                Looks like it's a perfect time to plan a new travel experience! Get Started Now!
            </Text>

            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/create-trip/search-place")} style={{
                padding: 15,
                backgroundColor: Colors.primary,
                borderRadius: 20,
                paddingHorizontal: 30
            }}>
                <Text style={{
                    color: Colors.white,
                    fontFamily: "nunito"
                }}>
                    Start a New Trip!
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default StartNewTripCard