import React from 'react';
import { View, Text, Image } from 'react-native';
import { Colors } from '../../constants/Colors';

const images = {
  family: require('../../assets/images/family.png'),
};

function OptionCard({ option, selectedOption }) {
  return (
    <View
      style={[
        {
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: Colors.lightGray,
          borderRadius: 15,
        },
        selectedOption?.id === option?.id && { borderWidth: 3, borderColor: Colors.primary },
      ]}
    >
      <View style={{
        width: "85%"
      }}>
        <Text style={{ fontSize: 20, fontFamily: 'nunito-bold', marginBottom: 5 }}>{option?.title}</Text>
        <Text style={{ fontSize: 15, fontFamily: 'nunito', color: Colors.gray }}>{option?.desc}</Text>
      </View>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
      }}>
        {option.title === 'Family' ? (
          <Image
            source={images.family}
            style={{ width: 35, height: 35 }}
          />
        ) : (
          <Text style={{ fontSize: 30 }}>{option.icon}</Text>
        )}
      </View>
    </View>
  );
}

export default OptionCard;
