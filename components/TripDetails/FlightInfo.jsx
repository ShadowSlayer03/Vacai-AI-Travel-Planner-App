import { View, Text, Linking } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'

const FlightInfo = ({ flightData }) => {

    const handleExternalLink = (url) => {
        Linking.openURL(url).catch((err) => alert("Failed to open URL", err.message));
    };

    return (
        <View style={{
            marginTop: 20,
            backgroundColor: Colors.lightGray,
            padding: 15,
            borderRadius: 15
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    fontFamily: "nunito-bold",
                    fontSize: 23
                }}>Flights</Text>

            </View>

            {flightData && flightData.map((data, index) => (
                <View key={index} style={{
                    marginTop: 20
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 3
                    }} key={index}>

                        <View style={{
                            flexDirection: "column",
                            gap: 2
                        }}>
                            <Text style={{
                                fontFamily: "nunito",
                                fontSize: 15
                            }}>{data.airline} ✈️</Text>

                            <Text style={{
                                fontFamily: "nunito-semibold",
                                fontSize: 15,
                                color: Colors.gray
                            }}>Cost: {data.price}</Text>
                        </View>



                        <TouchableOpacity activeOpacity={0.7} onPress={() => handleExternalLink(data.booking_url)} style={{
                            backgroundColor: Colors.primary,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderRadius: 15,
                        }}>
                            <Text style={{
                                fontFamily: "nunito",
                                fontSize: 15,
                                color: Colors.white,
                                textAlign: "center"
                            }}>
                                Book Now
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            ))}
        </View>
    )
}

export default FlightInfo