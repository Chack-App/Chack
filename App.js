/* eslint-disable no-unused-vars */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "./app/navigation/AuthNavigator"
import AppNavigator from "./app/navigation/AppNavigator"
import { ApolloProvider } from "@apollo/client"
import client from "./app/client"

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AuthNavigator />
        {/* <AppNavigator /> */}
      </NavigationContainer>
    </ApolloProvider>
  )
}
