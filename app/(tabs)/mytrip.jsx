import { View, Text } from 'react-native'
import React, { useState } from 'react';
import { Colors } from "../../constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';

const MyTrip = () => {

  const [userTrips,setUserTrips] = useState([]);

  return (
    <View style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.white,
      height: "100%"
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Text style={{
          fontFamily: "nunito",
          fontSize: 30
        }}>
          My Trips
        </Text>
        <FontAwesome name="plus-circle" size={30} color="black" />
      </View>

      {userTrips?.length==0 ? <StartNewTripCard /> : null}
    </View>
  )
}

export default MyTrip