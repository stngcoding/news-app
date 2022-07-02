import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Details from "../screens/Details";

const Stack = createNativeStackNavigator();
const NewsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={()=>({
        headerShown:false
    })}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default NewsNavigation;
