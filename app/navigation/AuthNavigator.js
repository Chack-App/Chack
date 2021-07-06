import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/AuthScreens/WelcomeScreen";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";

import colors from "../config/colors";
import { Platform } from "react-native";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{...gatewayHeaderStyles, headerTitle: "Log In"}}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{...gatewayHeaderStyles, headerTitle: "Sign Up"}}
    />
  </Stack.Navigator>
);

const gatewayHeaderStyles = {
  headerTransparent: true,
  headerTintColor: colors.white,
  headerTitle: "",
  headerTitleStyle: {
    fontWeight: Platform.OS === "ios" ? "bold" : "normal"
  }
};

export default AuthNavigator;
