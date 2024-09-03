import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
            if (!placesData || placesData.length === 0) {
                console.warn("placesData is undefined or empty");
                return;
            }

            try {
                const placeSearchPromises = placesData.map(async (place) => {
                    const placeSearchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(place?.name)}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
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
                data={placesData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    coordinates[index] ? (
                        <View style={styles.card}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => openMap(coordinates[index].latitude, coordinates[index].longitude)}>
                                <MapView
                                    style={styles.map}
                                    region={{
                                        latitude: coordinates[index].latitude,
                                        longitude: coordinates[index].longitude,
                                        latitudeDelta: 0.02,
                                        longitudeDelta: 0.02,
                                    }}
                                    showsUserLocation={false}
                                    loadingEnabled={true}
                                >
                                    <Marker
                                        coordinate={coordinates[index]}
                                        title={item.name}
                                        description={item.description}
                                    />
                                </MapView>
                            </TouchableOpacity>
                            <View style={styles.infoContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.bestTimes}>Best time to visit: {item.best_times_to_visit}</Text>
                                <Text style={styles.entryFee}>Entry fee: {item.entry_fees}</Text>
                                <Text style={styles.address}>Address: {item.address}</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.rating}>Rating: {item.rating} ({item.total_reviews} reviews)</Text>
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
