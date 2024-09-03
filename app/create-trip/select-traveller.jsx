import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { SelectTravellerList } from "../../constants/Options";
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

const SelectTraveller = () => {
    const navigation = useNavigation();
    const router = useRouter();

    const [selectedTraveller, setSelectedTraveller] = useState(null);
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    useEffect(() => {
        setTripData({ ...tripData, traveller: selectedTraveller });
    }, [selectedTraveller]);

    return (
        <View style={{
            padding: 25,
            paddingTop: 60,
            backgroundColor: Colors.white,
            height: '100%',
        }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
                <Ionicons name="return-up-back-outline" size={24} color="black" />
            </TouchableOpacity>

            <Text style={{
                fontSize: 35,
                fontFamily: "nunito-bold",
                marginTop: 20
            }}>Who's Travelling?</Text>

            <View style={{ marginTop: 20 }}>
                <Text style={{
                    fontFamily: "nunito-semibold",
                    fontSize: 20,
                }}>Choose your Traveller</Text>

                <FlatList
                    style={{ marginTop: 20 }}
                    data={SelectTravellerList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setSelectedTraveller(item)} style={{ marginVertical: 10 }}>
                                <OptionCard option={item} selectedOption={selectedTraveller} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 15,
                    marginTop: 20,
                    width: "100%",
                }}
                onPress={() => router.push("/create-trip/select-dates")}  // Handle routing here
            >
                <Text style={{
                    textAlign: "center",
                    color: Colors.white,
                    fontFamily: "nunito-medium",
                    fontSize: 20
                }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default SelectTraveller;
