import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from "../../context/CreateTripContext";
import moment from 'moment';

const ReviewTrip = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

        // console.log("tripdata from context:", tripData);
    }, []);

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 70,
                height: '100%',
                backgroundColor: Colors.white,
            }}
        >
            <TouchableOpacity
                style={{
                    marginBottom: 10,
                }}
                activeOpacity={0.7}
                onPress={() => router.back()}
            >
                <Ionicons name="return-up-back-outline" size={24} color="black" />
            </TouchableOpacity>

            <Text
                style={{
                    fontFamily: 'nunito-bold',
                    fontSize: 35,
                    marginTop: 10,
                }}
            >
                Review Your Trip
            </Text>

            <View
                style={{
                    marginTop: 20,
                }}
            >
                <Text
                    style={{
                        fontFamily: 'nunito-semibold',
                        fontSize: 18,
                    }}
                >
                    Before generating your trip, please review the details:
                </Text>

                {/* Source Details */}
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        gap: 30,
                        alignItems: "center"
                    }}
                >
                    {/* Icon should not be inside Text */}
                    <FontAwesome6 name="location-dot" size={36} color="#DFFF00" />
                    <View>
                        <Text
                            style={{
                                fontFamily: 'nunito',
                                fontSize: 20,
                                color: Colors.gray,
                            }}
                        >
                            Source
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'nunito-semibold',
                                fontSize: 20,
                            }}
                        >
                            {tripData?.srcLocationInfo?.name}
                        </Text>
                    </View>
                </View>

                {/* Destination Details */}
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        gap: 30,
                        alignItems: "center"
                    }}
                >
                    {/* Icon should not be inside Text */}
                    <FontAwesome6 name="location-dot" size={36} color="#D22B2B" />
                    <View>
                        <Text
                            style={{
                                fontFamily: 'nunito',
                                fontSize: 20,
                                color: Colors.gray,
                            }}
                        >
                            Destination
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'nunito-semibold',
                                fontSize: 20,
                            }}
                        >
                            {tripData?.locationInfo?.name}
                        </Text>
                    </View>
                </View>

                {/* Traveller Details */}
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        alignItems: "center",
                        gap: 25,
                    }}
                >
                    {/* Icon should not be inside Text */}
                    <FontAwesome6 name="person-walking-luggage" size={30} color="green" />
                    <View>
                        <Text
                            style={{
                                fontFamily: 'nunito',
                                fontSize: 20,
                                color: Colors.gray,
                            }}
                        >
                            Traveller(s)
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'nunito-semibold',
                                fontSize: 20,
                            }}
                        >
                            {tripData?.traveller?.title}
                        </Text>
                    </View>
                </View>

                {/* Date Details */}
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    {/* Icon should not be inside Text */}
                    <FontAwesome6 name="calendar-day" size={30} color="#7F00FF" />
                    <View>
                        <Text
                            style={{
                                fontFamily: 'nunito',
                                fontSize: 20,
                                color: Colors.gray,
                            }}
                        >
                            Travel Date
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'nunito-semibold',
                                fontSize: 20,
                            }}
                        >
                            {moment(tripData?.startDate).format('DD MMM') + " To " + moment(tripData?.endDate).format('DD MMM')} ({tripData?.totNoOfDays} days)
                        </Text>
                    </View>
                </View>

                {/* Budget Details */}
                <View
                    style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        alignItems: "center",
                        gap: 30,
                    }}
                >
                    {/* Icon should not be inside Text */}
                    <FontAwesome6 name="money-check-dollar" size={25} color="orange" />
                    <View>
                        <Text
                            style={{
                                fontFamily: 'nunito',
                                fontSize: 20,
                                color: Colors.gray,
                            }}
                        >
                            Budget
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'nunito-semibold',
                                fontSize: 20,
                            }}
                        >
                            {tripData?.budget}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => router.replace("/create-trip/generate-trip")}
                activeOpacity={0.7}
                style={{
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 15,
                    marginTop: 50,
                    width: "80%",
                    display: "flex",
                    alignSelf: "center"
                }}
            >
                <Text style={{
                    textAlign: "center",
                    color: Colors.white,
                    fontFamily: "nunito-medium",
                    fontSize: 20
                }}>
                    Create Trip
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ReviewTrip;
