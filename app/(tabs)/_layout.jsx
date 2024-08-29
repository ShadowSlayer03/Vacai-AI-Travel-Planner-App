import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors'

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primary
    }}>
      <Tabs.Screen name="mytrip" options={{
        tabBarLabel: "My Trip",
        tabBarIcon: ({ color }) => <FontAwesome6 name="map-location-dot" size={24} color={color} />
      }} />
      <Tabs.Screen name="discover" options={{
        tabBarLabel: "Discover",
        tabBarIcon: ({ color }) => <Ionicons name="globe-outline" size={24} color={color} />
      }} />
      <Tabs.Screen name="profile" options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />
      }} />
    </Tabs>
  )
}

export default TabLayout