import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const Login = () => {
    const router = useRouter();
    return (
        <View>
            <Image source={require("./../assets/images/login.jpg")} style={{
                width: "100%",
                height: 470,
            }} />
            <View style={styles.container}>
                <Text style={{ fontSize: 35, fontFamily: "nunito-bold", textAlign: "center", marginTop: 20 }}>Vacai</Text>
                <Text style={{ fontSize: 20, fontFamily: "nunito-bold", textAlign: "center", marginTop: 10 }}>AI Travel Planner</Text>
                <Text style={{ fontFamily: "nunito", textAlign: "center", fontSize: 17, color: Colors.gray, marginTop: 20 }}>Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>router.push("auth/sign-in")} style={styles.button}>
                    <Text style={{ color: Colors.white, textAlign: "center", fontFamily: "nunito", fontSize: 17 }}>Sign In With Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginTop: -20,
        height: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25
    },
    button: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 99,
        marginTop: "20%"
    }
})


export default Login