/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "./app/navigation/AuthNavigator"
import AppNavigator from "./app/navigation/AppNavigator"
import { ApolloProvider } from "@apollo/client"
import client from "./app/client"
import { GET_USER } from "./app/client/queries/userQueries"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {
  const [user, setUser] = useState(false)
  const [token, setToken] = useState(false)

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("TOKEN")
      console.log(token)
      setToken(token)
    }
    getToken()
  })

  console.log(user)
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {token ? <AppNavigator /> : <AuthNavigator />}
        {/* <AuthNavigator />
        <AppNavigator /> */}
      </NavigationContainer>
    </ApolloProvider>
  )
}
