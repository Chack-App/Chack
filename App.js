/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "./app/navigation/AuthNavigator"
import AppNavigator from "./app/navigation/AppNavigator"
import { ApolloProvider } from "@apollo/client"
import client from "./app/client"
import { GET_USER } from "./app/client/queries/userQueries"

export default function App() {
  const [user, setUser] = useState(false)

  useEffect(() => {
    const res = client.readQuery({
      query: GET_USER
    })
    console.log("res", res)
    if (res) {
      setUser(res.user)
    }
  }, [])
  console.log(user)
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* <AuthNavigator /> */}
        <AppNavigator />
      </NavigationContainer>
    </ApolloProvider>
  )
}
