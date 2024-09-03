import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';

const UserTripCard = ({ trip }) => {
  const [parsedTripData, setParsedTripData] = useState();
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (trip && trip?.tripData) {
      const parsed = JSON.parse(trip.tripData);
      setParsedTripData(parsed);
    }
  }, [trip]);

  useEffect(() => {
    if (parsedTripData) {
      const photoRef = parsedTripData?.locationInfo?.photoRef;
      if (photoRef) {
        const placesImageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1500&photoreference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
        //console.log("Places Image URL:", placesImageURL);
        setImgUrl(placesImageURL);
      }
    }
  }, [parsedTripData]);

  return parsedTripData && (
    <View style={{
      marginTop: 20,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10
    }}>
      {imgUrl ? (
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 15
          }}
          source={{ uri: imgUrl }}
        />
      ) : (
        <Image
          source={require("../../assets/images/vacation.jpg")} // Fallback image
          style={{
            width: 100,
            height: 100,
            borderRadius: 15
          }}
        />
      )}

      <View>
        <Text style={{
          fontFamily: "nunito-semibold",
          fontSize: 20
        }}>{parsedTripData?.locationInfo?.name}</Text>
        <Text style={{
          fontFamily: "nunito",
          fontSize: 15,
          color: Colors.gray
        }}>{moment(parsedTripData?.startDate).format("DD MMM yyyy")}</Text>
        <Text style={{
          fontFamily: "nunito",
          fontSize: 15,
          color: Colors.gray
        }}>{parsedTripData?.traveller?.title}</Text>
      </View>
    </View>
  );
}

export default UserTripCard;
