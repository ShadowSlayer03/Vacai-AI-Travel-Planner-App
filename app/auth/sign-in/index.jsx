import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from "../../../constants/Colors.ts"
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig.js';

const SignIn = () => {
    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const handleLogin = () => {
        if (!email || !password) {
            ToastAndroid.show("Please enter email and password!", ToastAndroid.BOTTOM);
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User from Firebase Auth:",user);
                router.replace("/mytrip");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error occurred in Firebase Auth:",errorCode,errorMessage);
            });
    }

    return (
        <View style={{
            padding: 25,
            marginTop: 35,
            backgroundColor: Colors.white,
            height: "100%"
        }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="return-up-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{
                fontSize: 30,
                fontFamily: "nunito-bold",
                marginTop: 30
            }}>
                Let's Sign You In
            </Text>
            <Text style={{
                fontSize: 25,
                fontFamily: "nunito",
                color: Colors.gray,
                marginTop: 20
            }}>
                Welcome Back
            </Text>
            <Text style={{
                fontSize: 17,
                fontFamily: "nunito-medium",
                color: Colors.gray,
                marginTop: 20
            }}>
                It's time to make more travel plans
            </Text>

            <View style={{
                marginTop: 50,
                flexDirection: "column",
                gap: 10
            }}>
                <Text style={{
                    fontFamily: "nunito-semibold",
                    fontSize: 20,
                }}>Email</Text>
                <TextInput onChangeText={(value)=>setEmail(value)} style={styles.input} placeholder="Enter your email"></TextInput>
            </View>
            <View style={{
                marginTop: 30,
                flexDirection: "column",
                gap: 10
            }}>
                <Text style={{
                    fontFamily: "nunito-semibold",
                    fontSize: 20
                }}>Password</Text>
                <TextInput onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.input} placeholder="Enter your password"></TextInput>
            </View>
            {/* Sign In Button */}
            <TouchableOpacity activeOpacity={0.7} onPress={handleLogin} style={{
                padding: 20,
                backgroundColor: Colors.primary,
                borderRadius: 99,
                marginTop: 50
            }}>
                <Text style={{
                    color: Colors.white,
                    fontSize: 15,
                    textAlign: "center",
                    fontFamily: "nunito"
                }}>Sign In</Text>
            </TouchableOpacity>
            {/* Create Account Button */}
            <TouchableOpacity onPress={() => router.replace("/auth/sign-up")} style={{
                padding: 18,
                backgroundColor: Colors.white,
                borderRadius: 99,
                marginTop: 20,
                borderWidth: 1
            }}>
                <Text style={{
                    color: Colors.primary,
                    textAlign: "center",
                    fontFamily: "nunito",
                    fontSize: 15,
                }}>Create An Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontFamily: "nunito",
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.gray
    }
})

export default SignIn;