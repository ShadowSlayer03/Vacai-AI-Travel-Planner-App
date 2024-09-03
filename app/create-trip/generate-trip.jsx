import { View, Text, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import LoadingAnimation from "../../components/LoadingAnimation";
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';
import { chatSession, prompt } from '../../configs/GeminiResponse';
import { useRouter } from 'expo-router';
import { auth, db } from "../../configs/FirebaseConfig"
import { doc, setDoc } from 'firebase/firestore';

const GenerateTrip = () => {
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        if (!tripData || !tripData.locationInfo || !tripData.traveller || !tripData.startDate || !tripData.endDate) {
            console.error("Invalid trip data:", tripData);
            ToastAndroid.show("Incomplete trip data. Please go back and try again.");
            return;
        }
        GenerateAITrip();
    }, []);


    const GenerateAITrip = async () => {
        setIsLoading(true);
        const finalAIPrompt = prompt
            .replace("{source}", tripData?.srcLocationInfo?.name)
            .replace("{location}", tripData?.locationInfo?.name)
            .replace("{traveler}", tripData?.traveller?.title)
            .replace("{budget}", tripData?.budget)
            .replace("{startDate}", moment(tripData?.startDate).format('DD MMM'))
            .replace("{endDate}", moment(tripData?.endDate).format('DD MMM'))

        //console.log("Final AI prompt:", finalAIPrompt);

        try {
            const result = await chatSession.sendMessage(finalAIPrompt);
            if (!result) {
                ToastAndroid.show("Error Occurred! AI could not create trip.")
                return;
            }
            const jsonResponse = await JSON.parse(result.response.text());
            console.log("JSON format result from Gemini API:", jsonResponse);
            const docId = Date.now().toString();

            console.log("TripData From Context", tripData);

            await setDoc(doc(db, "UserTrips", docId), {
                docId,
                userEmail: user.email,
                tripDetails: jsonResponse,
                tripData: JSON.stringify(tripData) || ""
            });

            setIsLoading(false);
            router.push("/(tabs)/mytrip");
        } catch (error) {
            console.error("An error occurred in Gemini response/ Firebase save:", error);
        }
    }

    return (
        <View style={{
            padding: 20,
            marginTop: 30,
            backgroundColor: Colors.white,
            height: "100%",
            justifyContent: "center"
        }}>
            <Text style={{
                fontFamily: "nunito-bold",
                fontSize: 35,
                textAlign: "center"
            }}>Please Wait...</Text>
            <Text style={{
                fontFamily: "nunito-semibold",
                fontSize: 25,
                textAlign: "center",
                marginTop: 30
            }}>We're crafting your perfect trip!
            </Text>

            <LoadingAnimation />

            <Text style={{
                fontFamily: "nunito",
                fontSize: 18,
                textAlign: "center",
                color: Colors.gray,
                marginTop: 30
            }}>Hang tight and don't hit the back button!</Text>
            <Text style={{
                fontFamily: "nunito",
                fontSize: 18,
                textAlign: "center",
                color: Colors.gray,
                marginTop: 10
            }}>Your adventure is just around the corner.</Text>
        </View>
    );
};

export default GenerateTrip;
