import { View, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

const UserTripList = ({ userTrips }) => {
    const router = useRouter();
    const [parsedTripData, setParsedTripData] = useState(null);
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        if (userTrips?.length > 0) {
            const parsed = JSON.parse(userTrips[0]?.tripData);
            setParsedTripData(parsed);
        }
    }, [userTrips]);

    useEffect(() => {
        if (parsedTripData) {
            const photoRef = parsedTripData?.locationInfo?.photoRef;
            if (photoRef) {
                const placesImageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1500&photoreference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
                setImgUrl(placesImageURL);
            }
        }
    }, [parsedTripData]);

    if (!parsedTripData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <View style={{ marginTop: 20 }}>
                {imgUrl ? (
                    <Image
                        style={{
                            width: "100%",
                            height: 240,
                            borderRadius: 15
                        }}
                        source={{ uri: imgUrl }}
                    />
                ) : (
                    <Image
                        source={require("../../assets/images/vacation.jpg")}
                        style={{
                            width: "100%",
                            height: 240,
                            borderRadius: 15
                        }}
                    />
                )}
                <View style={{
                    marginTop: 10
                }}>
                    <Text style={{
                        fontFamily: "nunito-semibold",
                        fontSize: 20
                    }}>
                        {parsedTripData?.locationInfo?.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {parsedTripData?.traveller?.icon === "/images/family.png" ? (
                            <Image
                                style={{ width: 24, height: 24, marginRight: 10 }}  // Adjust size and spacing as needed
                                source={require('../../assets/images/family.png')}
                            />
                        ) : (
                            <Text style={{ fontSize: 20 }}>{parsedTripData?.traveller?.icon}</Text>
                        )}
                        <Text style={{
                            fontFamily: "nunito-semibold",
                            fontSize: 20
                        }}>
                            {parsedTripData?.traveller?.title}
                        </Text>
                    </View>
                </View>


                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        fontFamily: "nunito-medium",
                        fontSize: 15,
                        color: Colors.gray
                    }}>{moment(parsedTripData?.startDate).format("DD MMM yyyy")}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.push({ pathname: "/trip-details", params: { trip: JSON.stringify(userTrips[0]) } })}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: Colors.primary,
                        padding: 15,
                        borderRadius: 15,
                        marginVertical: 18
                    }}
                >
                    <Text style={{
                        color: Colors.white,
                        textAlign: "center",
                        fontFamily: "nunito",
                        fontSize: 15
                    }}>See Your Plan</Text>
                </TouchableOpacity>

                {userTrips.map((trip, index) => (
                    <UserTripCard key={index} trip={trip} />
                ))}
            </View>
        </View>
    );
};

export default UserTripList;
