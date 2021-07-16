import React, { useState, useEffect, useMemo } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../client/queries/userQueries"

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("")
  const [user, setUser] = useState("")
  const [currentEventId, setCurrentEventId] = useState("")
  const [currentEventName, setCurrentEventName] = useState("")
  const [currentEventCode, setCurrentEventCode] = useState("")
  const [currentReceiptId, setCurrentReceiptId] = useState("")
  const [currentReceiptName, setCurrentReceiptName] = useState("")
  const [currentEventUsers, setCurrentEventUsers] = useState([])
  const [currentReceiptPaypalHandle, setCurrentReceiptPaypalHandle] =
    useState("")
  const [currentReceiptUserTotal, setCurrentReceiptUserTotal] = useState("")

  useEffect(() => {
    let isMounted = true

    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("TOKEN")
        const user = await AsyncStorage.getItem("USER")
        setUser(user)
        setToken(token)
      } catch (err) {
        console.error(err)
      }
    }
    if (isMounted) getToken()
    return () => {
      isMounted = false
    }
  }, [])

  const providerValue = useMemo(() => {
    return {
      token,
      setToken,
      user,
      setUser,
      currentEventId,
      setCurrentEventId,
      currentEventName,
      setCurrentEventName,
      currentEventCode, 
      setCurrentEventCode,
      currentReceiptId,
      setCurrentReceiptId,
      currentReceiptName,
      setCurrentReceiptName,
      currentEventUsers,
      setCurrentEventUsers,
      currentReceiptPaypalHandle,
      setCurrentReceiptPaypalHandle,
      currentReceiptUserTotal,
      setCurrentReceiptUserTotal
    }
  }, [
    token,
    user,
    currentEventId,
    currentEventName,
    currentEventCode, 
    currentReceiptId,
    currentReceiptName,
    currentEventUsers,
    currentReceiptPaypalHandle,
    currentReceiptUserTotal
  ])

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
