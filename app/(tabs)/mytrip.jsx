import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from "../../constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
import UserTripList from '../../components/MyTrips/UserTripList';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const MyTrip = () => {
  const router = useRouter();
  const user = auth.currentUser;

  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set to true initially

  useEffect(() => {
    if (user) {
      GetAllUserTrips();
    } else {
      setIsLoading(false); // Stop loading if no user is authenticated
      router.push("/")
    }
  }, [user]);

  const GetAllUserTrips = async () => {
    setIsLoading(true); // Set loading state before fetching

    try {
      const q = query(collection(db, "UserTrips"), where("userEmail", "==", user?.email), orderBy("docId", "desc"));
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map(doc => doc.data());
      setUserTrips(trips); // Update state with fetched trips
    } catch (error) {
      console.error("Error occurred while getting user trip documents from db.", error);
    } finally {
      setIsLoading(false); // Stop loading once data is fetched or an error occurs
    }
  };

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.white,
        height: "100%",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 100, // Adjust this value to match the height of your tab bar
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "nunito",
            fontSize: 30,
          }}
        >
          My Trips
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/create-trip/search-from-place")}>
          <FontAwesome name="plus-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 40 }} size={60} color={Colors.primary} />
      ) : userTrips.length === 0 ? (
        <StartNewTripCard />
      ) : (
        <UserTripList userTrips={userTrips} />
      )}
    </ScrollView>
  );
};

export default MyTrip;
