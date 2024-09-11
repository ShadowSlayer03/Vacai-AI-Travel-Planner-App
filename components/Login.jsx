import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const Login = () => {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={require("./../assets/images/login.jpg")}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.title}>Vacai</Text>
                <Text style={styles.subtitle}>AI Travel Planner</Text>
                <Text style={styles.description}>
                    Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push("auth/sign-in")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 470,
    },
    container: {
        backgroundColor: Colors.white,
        marginTop: -20,
        height: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        fontFamily: "nunito-bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "nunito-bold",
        textAlign: "center",
        marginTop: 20,
    },
    description: {
        fontFamily: "nunito",
        textAlign: "center",
        fontSize: 17,
        color: Colors.gray,
        marginTop: 20,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 99,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        textAlign: "center",
        fontFamily: "nunito",
        fontSize: 17,
    },
    googleButton: {
        padding: 15,
        backgroundColor: Colors.gray,
        borderRadius: 99,
        marginTop: 10,
        alignItems: 'center',
    },
    googleButtonText: {
        color: Colors.white,
        textAlign: "center",
        fontFamily: "nunito",
        fontSize: 17,
    },
});

export default Login;
