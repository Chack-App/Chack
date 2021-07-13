import React, { useState, useEffect, useMemo } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../client/queries/userQueries"

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("")
  const [user, setUser] = useState("")
  const [currentEventId, setCurrentEventId] = useState("")
  const [currentReceiptId, setCurrentReceiptId] = useState("")
  const [currentEventUsers, setCurrentEventUsers] = useState([])

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

    // if(token) {
    //   {loading, error, data} = useQuery(GET_USER)
    // }
    return () => {
      isMounted = false
    }
  }, [])

  // if (token) {
  //   const { loading, error, data } = useQuery(GET_USER)
  //   if (loading) {
  //     return console.log("loading")
  //   }
  //   if (error) {
  //     return console.error(error)
  //   }
  //   console.log(data, "data")
  //   return setUser(data || "NOTHING")
  // }

  const providerValue = useMemo(() => {
    return {
      token,
      setToken,
      user,
      setUser,
      currentEventId,
      setCurrentEventId,
      currentReceiptId,
      setCurrentReceiptId,
      currentEventUsers,
      setCurrentEventUsers
    }
  }, [token, user, currentEventId, currentReceiptId, currentEventUsers])

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
