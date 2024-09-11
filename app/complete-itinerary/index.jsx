import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ItineraryTimeline from '../../components/ItineraryTimeline';

const CompleteItinerary = () => {
    const [parsedItinerary, setParsedItinerary] = useState();
    const { itinerary } = useLocalSearchParams();
    const router = useRouter();


    useEffect(() => {
        if (itinerary) {
            const parsedItineraryObject = JSON.parse(itinerary);
            console.log("Parsed Itinerary Object:", parsedItineraryObject, typeof parsedItineraryObject);
            setParsedItinerary(parsedItineraryObject);
        }
    }, [itinerary])

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContentContainer}>
            <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => router.back()}>
                <Ionicons name="return-up-back-outline" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.mainView}>
                <Text style={styles.mainViewText}>Complete Itinerary</Text>

            <View style={styles.itineraryView}>
                {parsedItinerary?.map((itinerary,index)=>(
                    <ItineraryTimeline key={index} singleParsedItinerary={itinerary} />
                ))}
            </View>


            </View>

        </ScrollView>
    )
}

export default CompleteItinerary;

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
    mainView: {
        padding: 20, 
    },
    mainViewText: {
        fontFamily: "nunito-bold",
        fontSize: 25,
    },
    itineraryView:{
        marginTop: 35,
        display: "flex",
        flexDirection: "column",
        gap: 30
    }
})