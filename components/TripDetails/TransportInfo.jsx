import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

const TransportInfo = ({ transportData }) => {
    return transportData && (
        <View style={{
            marginTop: 20,
            backgroundColor: Colors.lightGray,
            padding: 15,
            borderRadius: 15
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    fontFamily: "nunito-bold",
                    fontSize: 23
                }}>Transport</Text>

            </View>
            <View style={{
                marginTop: 10
            }}>
                {transportData.map((data, index) => (
                    <View style={{
                        marginTop: 10
                    }} key={index}>
                        <Text style={{
                            fontFamily: "nunito",
                            fontSize: 15,
                        }}>{data.mode_of_transportation}</Text>
                        <Text style={{
                            fontFamily: "nunito-semibold",
                            fontSize: 15,
                            color: Colors.gray
                        }}>{data.price_estimate} {data.currency}</Text>
                    </View>
                ))}
            </View>

        </View>
    )
}

export default TransportInfo