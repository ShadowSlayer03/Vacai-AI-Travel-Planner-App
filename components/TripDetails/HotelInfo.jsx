import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Dimensions, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import { Colors } from '../../constants/Colors';

const HotelInfo = ({ hotelData = [] }) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    const { width } = Dimensions.get('window');

    const fetchImages = async (query, index) => {
        const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
        const searchEngineId = process.env.EXPO_PUBLIC_GOOGLE_CX_ID;
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}&searchType=image&num=1`;

        try {
            const response = await axios.get(url);

            if (response.data && response.data.items && Array.isArray(response.data.items) && response.data.items.length > 0) {
                const imageUrl = response.data.items[0]?.link;

                if (imageUrl) {
                    setHotels((prevHotels) => {
                        if (!prevHotels || prevHotels.length <= index) {
                            console.error('Error prevHotel Not Found!');
                            return prevHotels;
                        }
                        const updatedHotels = [...prevHotels];
                        updatedHotels[index].img_url = imageUrl;
                        return updatedHotels;
                    });
                } else {
                    console.warn('No image link found in the API response.');
                }
            } else {
                console.warn('No items found in the API response.');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        if (hotelData && Array.isArray(hotelData) && hotelData.length > 0) {
            setHotels(hotelData);
            hotelData.forEach((hotel, index) => {
                fetchImages(hotel.name, index);
            });
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [hotelData]);


    const handleExternalLink = (url) => {
        Linking.openURL(url).catch((err) => alert("Failed to open URL", err.message));
    };

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.primary} />;
    }

    return hotels && Array.isArray(hotels) && hotels.length > 0 ? (
        <View style={{ marginTop: 20 }}>
            <Text style={{
                fontFamily: "nunito-bold",
                fontSize: 23,
                padding: 15
            }}>Hotels</Text>
            <Carousel
                width={width - 50}
                height={width * 0.8}
                autoPlay={true}
                autoPlayInterval={3000}
                data={hotels}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleExternalLink(item?.booking_url)}
                        style={{
                            flex: 1,
                            borderRadius: 15,
                            overflow: 'hidden',
                            marginHorizontal: 5,
                        }}
                    >
                        <Image
                            source={{ uri: item?.img_url }} // Use img_url from updated hotel data
                            style={{ width: '100%', height: '100%', borderRadius: 15 }}
                            resizeMode="cover"
                        />
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: 15,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}>
                            <Text style={{
                                color: Colors.white,
                                fontFamily: "nunito-bold",
                                fontSize: 20
                            }}>
                                {item.name} 🏢
                            </Text>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <Text style={{
                                    color: Colors.white,
                                    fontFamily: "nunito",
                                    fontSize: 16
                                }}>
                                    {item?.price_per_night} / night
                                </Text>

                                <Text style={{
                                    color: Colors.white,
                                    fontFamily: "nunito",
                                    fontSize: 16
                                }}>
                                    🧭 {item?.geo_coordinates?.latitude}, {item?.geo_coordinates?.longitude}
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <Text style={{
                                    color: Colors.white,
                                    fontFamily: "nunito-semibold",
                                    fontSize: 16
                                }}>
                                    Rating: {item?.rating} / 5
                                </Text>

                                <Text style={{
                                    color: Colors.white,
                                    fontFamily: "nunito",
                                    fontSize: 16
                                }}>
                                    Reviews: {item?.total_reviews || 100}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    ) : (
        <Text>No hotels available!!</Text>
    );
};

export default HotelInfo;
