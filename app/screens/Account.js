import React, { useState, useContext } from "react"
import { Text, SafeAreaView, StyleSheet, View } from "react-native"
import colors from "../config/colors"
import { GET_USER } from "../client/queries/userQueries"
import { useQuery } from "@apollo/client"
import AppButton from "../components/AppButton"
import { AuthContext } from "../context/authContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Account = ({ navigation }) => {
  const { token, setToken } = useContext(AuthContext)
  const { user, setUser } = useContext(AuthContext)
  const [id, setId] = useState(user)
  const { loading, error, data } = useQuery(GET_USER, { variables: { id } })
  if (loading) {
    return <Text>Loading</Text>
  }
  if (error) {
    return <Text>Error</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>ACCOUNT</Text>
        <Text>{data.user.email}</Text>
        <AppButton
          title="Logout"
          onPress={async () => {
            await AsyncStorage.clear()
            setToken("")
            setUser("")
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary
  }
})

export default Account
