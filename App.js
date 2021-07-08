/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import AuthNavigator from "./app/navigation/AuthNavigator"
import AppNavigator from "./app/navigation/AppNavigator"
import ReceiptNavigator from "./app/navigation/ReceiptNavigator"
import { ApolloProvider } from "@apollo/client"
import client from "./app/client"
import { GET_USER } from "./app/client/queries/userQueries"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AuthProvider from "./app/context/authContext"
import { AuthContext } from "./app/context/authContext"
import AppButton from "./app/components/AppButton"
import Main from "./Main"


export default function App() {
  const [user, setUser] = useState(false)
  // const { token } = useContext(AuthContext)
  // console.log(token)
  const [test, setTest] = useState(false)

  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = await AsyncStorage.getItem("TOKEN")
  //     // console.log(token)
  //     setTest(token)
  //   }
  //   getToken()
  // })

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </ApolloProvider>
  )
}
