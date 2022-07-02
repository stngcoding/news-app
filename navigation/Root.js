import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/FontAwesome5";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Saved from "../screens/Saved";
import Setting from "../screens/Setting";
import NewsNavigation from "./NewsNavigation";
const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "Saved") {
            iconName = focused ? "bookmark" : "bookmark";
          } else if (route.name === "Setting") {
            iconName = focused ? "cog" : "cog";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#fc8628",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: "#f5f7f8",
          },
          null,
        ],
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          paddingTop: 10,
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={NewsNavigation} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Saved" component={Saved} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default Root;
