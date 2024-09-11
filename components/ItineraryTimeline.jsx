import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import Timeline from "react-native-just-timeline";

const ItineraryTimeline = ({ singleParsedItinerary }) => {

    const [data, setData] = useState([]);

    const chooseIcon = (activity) => {
        switch (activity) {
            case "Travel":
                return "plane";
            case "Arrival":
                return "location-arrow";
            case "Transportation":
                return "cab";
            case "Check-in":
                return "check-square-o";
            case "Lunch":
                return "cutlery";
            case "Visit":
                return "location-arrow";
            case "Dinner":
                return "cutlery";
            case "Relax":
                return "hotel";
            case "Breakfast":
                return "coffee";
            default:
                return "question-circle";
        }
    }

    const changeBgColor = (activity) => {
        switch (activity) {
            case "Travel":
                return "#FFD700"; // Gold
            case "Arrival":
                return "#32CD32"; // LimeGreen
            case "Transportation":
                return "#00CED1"; // DarkTurquoise
            case "Check-in":
                return "#FF4500"; // OrangeRed
            case "Lunch":
                return "#FF6347"; // Tomato
            case "Visit":
                return "#4682B4"; // SteelBlue
            case "Dinner":
                return "#8A2BE2"; // BlueViolet
            case "Relax":
                return "#20B2AA"; // LightSeaGreen
            case "Breakfast":
                return "#FFA07A"; // LightSalmon
            default:
                return "#D3D3D3"; // LightGray for unknown activities
        }
    }

    useEffect(() => {
        if (singleParsedItinerary) {
            const newData = singleParsedItinerary?.timeline.map((timelineElem) => {
                return {
                    title: () => (
                        <View>
                            <Text style={{
                                ...styles.titleStyle,
                                color: changeBgColor(timelineElem.activity)
                            }}>
                                {timelineElem.activity}
                            </Text>
                        </View>
                    ),
                    description: {
                        content: timelineElem.details,
                        style: styles.descStyle
                    },
                    time: {
                        content: timelineElem.time,
                        style: styles.timeStyle,
                    },
                    icon: {
                        content: chooseIcon(timelineElem.activity),
                        style: {
                            ...styles.iconStyle,
                            backgroundColor: changeBgColor(timelineElem.activity)
                        },
                    },
                };
            });

            setData(newData);
        }
    }, [singleParsedItinerary]);

    return (
        <View style={styles.mainView}>
            <View style={styles.textView}>
                <Text style={styles.textStyle}>Day: {singleParsedItinerary.day}</Text>
                <Text style={styles.textStyle}>Date: {singleParsedItinerary.date}</Text>
            </View>
            <Timeline data={data} />
        </View>
    );
};

export default ItineraryTimeline;

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: Colors.lightGray,
        padding: 15,
        borderRadius: 15
    },
    textView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 10
    },
    textStyle: {
        fontFamily: "nunito-semibold",
        fontSize: 18,
    },
    titleStyle: {
        fontFamily: "nunito-semibold",
        fontSize: 15
    },
    timeStyle: {
        paddingTop: 8,
        fontSize: 15,
        color: Colors.gray
    },
    descStyle: {
        paddingTop: 8,
        fontFamily: "nunito",
        fontSize: 14,
        color: Colors.gray
    },
    iconStyle: {
        width: 40,
        height: 40,
        color: '#FFF',
        borderColor: '#FFF',
        fontSize: 19,
        paddingTop: 10,
        borderRadius: 20,
    }
});
