import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'; // Make sure to replace this path with your actual path
import { auth } from '../../configs/FirebaseConfig';
import { signOut } from "firebase/auth";
import moment from 'moment';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();
  const user = auth.currentUser;

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      console.log('User signed out!');
      router.push("/")
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  }

  // Check if user data is available
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        {/* Placeholder for profile image if photoURL is not available */}
        <Image
          style={styles.profileImage}
          source={{ uri: user?.photoURL || 'https://avatar.iran.liara.run/public/boy?username=Ash' }} // Replace with default profile image URL if photoURL is missing
        />
        <Text style={styles.username}>{user?.displayName || "Vacai User"}</Text>
        <Text style={styles.email}>{user?.email || "No email available"}</Text>
        <Text style={styles.email}>Email Verified: {user?.emailVerified? "True" : "False"}</Text>
        <Text style={styles.email}>Phone Number: {user?.phoneNumber || "123456789"}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor lorem sit amet mauris facilisis, id auctor odio aliquet.
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Other Details:</Text>
        <Text style={styles.bio}>
          ID: {user?.uid}
        </Text>
        <Text style={styles.bio}>
          User Created At: {moment(user?.createdAt).format("DD/MM/yyyy")}
        </Text>
        <Text style={styles.bio}>
          User Last Login: {moment(user?.lastLoginAt).format("DD/MM/yyyy")}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => alert('Edit Profile')}>
          <Ionicons name="pencil" size={20} color={Colors.white} />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Ionicons name="log-out" size={20} color={Colors.white} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    padding: 45,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontFamily: 'nunito-bold',
    color: Colors.primary,
  },
  email: {
    fontSize: 16,
    fontFamily: 'nunito',
    color: Colors.gray,
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    fontFamily: 'nunito',
    color: Colors.gray,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    width: 120,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    marginLeft: 10,
    fontFamily: 'nunito-semibold',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'nunito',
    color: Colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
