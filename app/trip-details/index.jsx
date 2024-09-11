import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelInfo from "../../components/TripDetails/HotelInfo";
import TransportInfo from "../../components/TripDetails/TransportInfo";
import PlacesInfo from "../../components/TripDetails/PlacesInfo";
import RestaurantInfo from "../../components/TripDetails/RestaurantInfo";
import moment from "moment";

function TripDetails() {
    const navigation = useNavigation();
    const router = useRouter();
    const { trip } = useLocalSearchParams();

    const [imgUrl, setImgUrl] = useState("");
    const [parsedTrip, setParsedTrip] = useState(null);
    const [parsedTripData, setParsedTripData] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });

        if (trip) {
            try {
                const tripObject = typeof trip === "string" ? JSON.parse(trip) : trip;
                setParsedTrip(tripObject);

                if (tripObject?.tripData) {
                    const tripDataObject = typeof tripObject.tripData === "string"
                        ? JSON.parse(tripObject.tripData)
                        : tripObject.tripData;
                    setParsedTripData(tripDataObject);
                }
            } catch (error) {
                console.error("Error parsing trip or tripData:", error);
            }
        }
    }, [trip]);

    useEffect(() => {
        if (parsedTripData?.locationInfo?.photoRef) {
            const photoRef = parsedTripData.locationInfo.photoRef;
            const placesImageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1500&photoreference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
            setImgUrl(placesImageURL);
        }
    }, [parsedTripData]);

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContentContainer}
        >
            <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => router.back()}>
                <Ionicons name="return-up-back-outline" size={24} color="black" />
            </TouchableOpacity>

            {imgUrl ? (
                <Image style={styles.image} source={{ uri: imgUrl }} />
            ) : (
                <Image
                    source={require("../../assets/images/vacation.jpg")}
                    style={styles.defaultImage}
                />
            )}

            <View style={styles.infoContainer}>
                <Text style={styles.tripName}>{parsedTripData?.locationInfo?.name || "No Name Available"}</Text>
                <Text style={styles.tripDates}>{moment(parsedTripData?.startDate).format("DD MMM, yyyy") || "1st January 2024"} to {moment(parsedTripData?.endDate).format("DD MMM, yyyy") || "1st January 2024"}</Text>

                <View style={styles.travellerInfo}>
                    {parsedTripData?.traveller?.icon === "/images/family.png" ? (
                        <Image
                            style={styles.icon}
                            source={require('../../assets/images/family.png')}
                        />
                    ) : (
                        <Text style={styles.iconText}>{parsedTripData?.traveller?.icon}</Text>
                    )}
                    <Text style={styles.travellerCount}>{parsedTripData?.traveller?.people}</Text>
                </View>

                <Text style={styles.budget}>{parsedTripData?.budget} Package</Text>

                {/* Flight Info */}
                <FlightInfo flightData={parsedTrip?.tripDetails?.flights} />

                {/* Hotels Info */}
                <HotelInfo hotelData={parsedTrip?.tripDetails?.hotels} />

                {/* Transport Info */}
                <TransportInfo transportData={parsedTrip?.tripDetails?.local_transportation} />

                {/* Places Info */}
                <PlacesInfo placesData={parsedTrip?.tripDetails?.places_to_visit} />

                {/* Restaurant Info */}
                <RestaurantInfo restaurantData={parsedTrip?.tripDetails?.restaurants} />
            </View>
        </ScrollView>
    );
}

export default TripDetails;

const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 70,
        backgroundColor: Colors.white,
        height: "100%",
    },
    scrollContentContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    backButton: {
        marginBottom: 10,
        marginLeft: 20,
    },
    image: {
        width: "100%",
        height: 330,
    },
    defaultImage: {
        width: "100%",
        height: 240,
        borderRadius: 15
    },
    infoContainer: {
        padding: 20,
        backgroundColor: Colors.white,
        height: "100%",
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: "column",
        gap: 3
    },
    tripName: {
        fontFamily: "nunito-bold",
        fontSize: 30,
        color: Colors.primary
    },
    tripDates: {
        fontFamily: "nunito",
        fontSize: 15,
        color: Colors.gray
    },
    travellerInfo: {
        flexDirection: "row",
        gap: 20
    },
    icon: {
        width: 24,
        height: 24
    },
    iconText: {
        fontSize: 20
    },
    travellerCount: {
        fontFamily: "nunito",
        fontSize: 15,
        color: Colors.gray
    },
    budget: {
        fontFamily: "nunito",
        fontSize: 15,
        color: Colors.gray
    }
});
