import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from '../screens/RegisterScreen';
import NewHomeScreen from "../screens/NewHomeScreen";

import colors from '../config/colors'

const Stack = createStackNavigator()

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}}/>
    <Stack.Screen name='Login' component={LoginScreen} options = {gatewayHeaderStyles} />
    <Stack.Screen name='Register' component={RegisterScreen} options = {gatewayHeaderStyles}/>
    <Stack.Screen name='NewHome' component={NewHomeScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
)

const gatewayHeaderStyles = {
    headerTransparent: true,
    headerTintColor: colors.secondary,
    headerTitle: ''
}

export default AuthNavigator