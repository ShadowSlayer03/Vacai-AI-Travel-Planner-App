import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from "../../../constants/Colors.ts";
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from "../../../configs/FirebaseConfig.js"
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [fullName,setFullName] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const onCreateAccount = () => {
    if(!email || !password && !fullName){
      ToastAndroid.show("Please enter all details!",ToastAndroid.BOTTOM);
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { 
        const user = userCredential.user;
        console.log("User from Firebase Auth:",user);
        router.replace("/sign-in");
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
        marginTop: 15
      }}>
        Create Your Account
      </Text>
      <Text style={{
        fontSize: 22,
        fontFamily: "nunito",
        color: Colors.gray,
        marginTop: 10
      }}>
        Join Us Today!
      </Text>
      <Text style={{
        fontSize: 17,
        fontFamily: "nunito-medium",
        color: Colors.gray,
        marginTop: 10
      }}>
        Start planning your next adventure with Vacai
      </Text>

      <View style={{
        marginTop: 20,
        flexDirection: "column",
        gap: 5
      }}>
        <Text style={{
          fontFamily: "nunito-semibold",
          fontSize: 20,
        }}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" onChangeText={(value)=>setFullName(value)} />
      </View>

      <View style={{
        marginTop: 20,
        flexDirection: "column",
        gap: 5
      }}>
        <Text style={{
          fontFamily: "nunito-semibold",
          fontSize: 20,
        }}>Email</Text>
        <TextInput style={styles.input} placeholder="Enter your email" onChangeText={(value)=>setEmail(value)} />
      </View>

      <View style={{
        marginTop: 20,
        flexDirection: "column",
        gap: 5
      }}>
        <Text style={{
          fontFamily: "nunito-semibold",
          fontSize: 20
        }}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} placeholder="Enter your password" onChangeText={(value)=>setPassword(value)} />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity activeOpacity={0.7}  style={{
        padding: 18,
        backgroundColor: Colors.primary,
        borderRadius: 99,
        marginTop: 30
      }}>
        <Text onPress={onCreateAccount} style={{
          color: Colors.white,
          fontSize: 15,
          textAlign: "center",
          fontFamily: "nunito"
        }}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already Have Account Button */}
      <TouchableOpacity onPress={() => router.replace("/auth/sign-in")} style={{
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
        }}>Already Have an Account? Sign In</Text>
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

export default SignUp;
