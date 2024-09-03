import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import CalendarPicker from 'react-native-calendar-picker';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

const SelectDates = () => {
    const navigation = useNavigation();
    const router = useRouter();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const onDateChange = (date, type) => {
        console.log(date, type);
        if (type === "START_DATE") {
            setStartDate(moment(date));
        } else {
            setEndDate(moment(date))
        }
    }

    const onDateSelectionContinue = () => {
        if (!startDate) {
            ToastAndroid.show("Please Choose a Start Date!", ToastAndroid.LONG);
            return;
        }
        if (!endDate) {
            ToastAndroid.show("Please Choose an End Date!", ToastAndroid.LONG);
            return;
        }
        const totNoOfDays = endDate.diff(startDate, "days") + 1;
        console.log(totNoOfDays);
        setTripData({
            ...tripData,
            startDate,
            endDate,
            totNoOfDays
        });

        router.push("/create-trip/select-budget");
    }

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 75,
                backgroundColor: Colors.white,
                height: "100%"
            }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="return-up-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{
                fontFamily: "nunito-bold",
                fontSize: 35,
                marginTop: 20
            }}>Travel Dates</Text>

            <View style={{
                marginTop: 50
            }}>
                <CalendarPicker
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={5}
                    todayBackgroundColor='black'
                    todayTextStyle={{
                        fontFamily: "nunito-bold"
                    }}
                    textStyle={{
                        fontFamily: "nunito-medium",
                    }}
                    selectedRangeStyle={{
                        backgroundColor: Colors.primary
                    }}
                    selectedDayTextStyle={{
                        color: Colors.white
                    }} />
            </View>

            <TouchableOpacity
                onPress={onDateSelectionContinue}
                activeOpacity={0.7}
                style={{
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 15,
                    marginTop: 25,
                    width: "50%",
                    display: "flex",
                    alignSelf: "center"
                }}
            >
                <Text style={{
                    textAlign: "center",
                    color: Colors.white,
                    fontFamily: "nunito-medium",
                    fontSize: 15
                }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectDates;