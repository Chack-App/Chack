import React, { useState, useEffect, useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "./app/navigation/AuthNavigator"
import AppNavigator from "./app/navigation/AppNavigator"
import { ApolloProvider } from "@apollo/client"
import client from "./app/client"
import { GET_USER } from "./app/client/queries/userQueries"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AuthProvider from "./app/context/authContext"
import { AuthContext } from "./app/context/authContext"
import AppButton from "./app/components/AppButton"
import { View } from "react-native"

export default function Main() {
  const { token } = useContext(AuthContext)

  return (
    <NavigationContainer>
      {token ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
