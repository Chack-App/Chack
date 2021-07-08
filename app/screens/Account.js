import React, { useState } from "react"
import { Text, SafeAreaView, StyleSheet, View } from "react-native"
import colors from "../config/colors"
import { GET_USER } from "../client/queries/userQueries"
import { useQuery } from "@apollo/client"

const Account = () => {
  const [id, setId] = useState(4)
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
