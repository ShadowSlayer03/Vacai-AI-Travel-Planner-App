import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { SelectBudgetOptions } from "../../constants/Options"
import OptionCard from "../../components/CreateTrip/OptionCard"
import { Colors } from '../../constants/Colors'
import { CreateTripContext } from "../../context/CreateTripContext"

const SelectBudget = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null)
  const { tripData, setTripData } = useContext(CreateTripContext)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  useEffect(() => {
    selectedOption && setTripData(({
      ...tripData,
      budget: selectedOption.title
    }))
  }, [selectedOption]);

  const onClickContinue = () => {
    if (!selectedOption) {
      ToastAndroid.show("Select Your Budget!", ToastAndroid.LONG)
      return;
    }
    router.push("/create-trip/review-trip");
  }

  return (
    <View style={{
      padding: 25,
      paddingTop: 70,
      height: "100%",
      backgroundColor: Colors.white
    }}>
      <TouchableOpacity style={{
        marginBottom: 10
      }} activeOpacity={0.7} onPress={() => router.back()}>
        <Ionicons name="return-up-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{
        fontFamily: "nunito-bold",
        fontSize: 35,
        marginTop: 5
      }}>
        Expense
      </Text>

      <View style={{
        marginTop: 10
      }}>
        <Text style={{
          fontFamily: "nunito-semibold",
          fontSize: 20,
          marginBottom: 15
        }}>Choose expenditure for your trip</Text>

        <FlatList
          data={SelectBudgetOptions}
          renderItem={({ item }) => (
            <TouchableOpacity style={{
              marginVertical: 10,
            }} key={item.id}
              onPress={() => setSelectedOption(item)}>
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )} />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          padding: 15,
          backgroundColor: Colors.primary,
          borderRadius: 15,
          marginTop: 20,
          width: "100%",
        }}
        onPress={onClickContinue}
      >
        <Text style={{
          textAlign: "center",
          color: Colors.white,
          fontFamily: "nunito-medium",
          fontSize: 20
        }}>
          Continue
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export default SelectBudget