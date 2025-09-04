import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import axios from 'axios';

const PlacesInfo = ({ placesData }) => {
    const [coordinates, setCoordinates] = useState([]);

    const openMap = (latitude, longitude) => {
        const url = `https://www.google.com/maps/?q=${latitude},${longitude}`;
        Linking.openURL(url).catch(err => console.error("Error opening map:", err));
    };

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (Array.isArray(placesData) && placesData?.length > 0) {
                try {
                    const placeSearchPromises = placesData?.map(async (place) => {
                        const placeSearchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(place?.name)},${encodeURIComponent(place?.address)}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
                        const response = await axios.get(placeSearchURL);
                        const location = response?.data?.results?.[0]?.geometry?.location;

                        if (location) {
                            return { latitude: location.lat, longitude: location.lng };
                        } else {
                            console.error(`Place search failed for place: ${place?.name}`);
                            return null;
                        }
                    });

                    const resolvedCoordinates = await Promise.all(placeSearchPromises);
                    setCoordinates(resolvedCoordinates.filter(coord => coord !== null));
                } catch (error) {
                    console.error("An error occurred while fetching coordinates:", error);
                }
            }
        };

        fetchCoordinates();
    }, [placesData]);


    return (
        <View>
            <Text style={{
                fontFamily: "nunito-bold",
                fontSize: 23,
                marginVertical: 20,
                paddingLeft: 15
            }}>Places</Text>
            <FlatList
                nestedScrollEnabled
                data={placesData || []}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                removeClippedSubviews={false}
                ListHeaderComponent={
                    <Text
                        style={{
                            fontFamily: "nunito-bold",
                            fontSize: 20,
                            marginVertical: 20,
                            paddingLeft: 15,
                        }}
                    >
                        Some cool places to visit:
                    </Text>
                }
                renderItem={({ item, index }) => (
                    coordinates[index] ? (
                        <View style={styles.card}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => openMap(coordinates[index].latitude, coordinates[index].longitude)}
                            >
                                <Image
                                    style={{ height: 200, borderRadius: 10 }}
                                    source={{
                                        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates[index].latitude},${coordinates[index].longitude}&zoom=14&size=400x200&markers=color:red%7C${coordinates[index].latitude},${coordinates[index].longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
                                    }}
                                />

                            </TouchableOpacity>
                            <View style={styles.infoContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.bestTimes}>
                                    Best time to visit: {item.best_times_to_visit}
                                </Text>
                                <Text style={styles.entryFee}>Entry fee: {item.entry_fees}</Text>
                                <Text style={styles.address}>Address: {item.address}</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.rating}>
                                        Rating: {item.rating} ({item.total_reviews} reviews)
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <Text>Loading...</Text>
                    )
                )}
                contentContainerStyle={styles.listContent}
            />

        </View>

    );
};

export default PlacesInfo;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.lightGray,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
    },
    map: {
        height: 200,
        width: '100%',
        borderRadius: 10,
    },
    infoContainer: {
        marginTop: 10,
    },
    name: {
        fontSize: 20,
        marginBottom: 4,
        fontFamily: "nunito-bold",
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        fontFamily: "nunito-semibold",
    },
    bestTimes: {
        fontSize: 14,
        marginBottom: 4,
        fontFamily: "nunito-medium",
    },
    entryFee: {
        fontSize: 14,
        marginBottom: 4,
        fontFamily: "nunito-medium",
    },
    address: {
        fontSize: 14,
        marginBottom: 4,
        fontFamily: "nunito-medium",
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        fontFamily: "nunito-medium",
    },
});
