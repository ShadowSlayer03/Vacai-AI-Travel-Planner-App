import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../configs/FirebaseConfig';

const Login = () => {
    const router = useRouter();

    // Google Sign-In setup
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;

            // Create a Firebase credential with the Google ID token
            const credential = GoogleAuthProvider.credential(id_token);

            // Sign in with the credential
            signInWithCredential(auth, credential)
                .then(userCredential => {
                    console.log('Google Sign-In Successful:', userCredential.user);
                    router.push("/mytrip");
                })
                .catch(error => {
                    console.error("Google Sign-In Error:", error);
                });
        }
    }, [response]);

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
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => promptAsync()}
                    style={styles.googleButton}
                    disabled={!request}
                >
                    <Text style={styles.googleButtonText}>Sign In With Google</Text>
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
        marginTop: 20,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "nunito-bold",
        textAlign: "center",
        marginTop: 10,
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
