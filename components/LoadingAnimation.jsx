import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingAnimation = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/images/trip_generating_animation.json')} // Replace with your Lottie JSON file path
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 20
    },
    animation: {
        width: 300,
        height: 300,
    },
});

export default LoadingAnimation;
