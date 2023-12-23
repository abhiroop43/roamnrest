import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Colors from "@/constants/Colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {
            fontFamily: 'cabin-semibold',
          },
          }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Explore',
            tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="magnify" color={color} size={size} />
            )
        }}
      />
        <Tabs.Screen
            name="wishlists"
            options={{
                tabBarLabel: 'Wishlists',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="heart-outline" color={color} size={size} />
                )
            }}
        />

        <Tabs.Screen
            name="trips"
            options={{
                tabBarLabel: 'Trips',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="airballoon-outline" color={color} size={size} />
                )
            }}
        />

        <Tabs.Screen
            name="inbox"
            options={{
                tabBarLabel: 'Inbox',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="message-outline" color={color} size={size} />
                )
            }}
        />

        <Tabs.Screen
            name="profile"
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
                )
            }}
        />
    </Tabs>
  );
};

export default Layout;
