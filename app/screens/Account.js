import React, { useState, useContext } from "react"
import { Text, SafeAreaView, StyleSheet, View } from "react-native"
import colors from "../config/colors"
import { GET_USER } from "../client/queries/userQueries"
import { useMutation, useQuery } from "@apollo/client"
import AppButton from "../components/AppButton"
import { AuthContext } from "../context/authContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AppTextInput from "../components/AppTextInput"
import AuthButton from "../components/AuthButton"
import { UPDATE_USER } from "../client/queries/userQueries"

const Account = ({ navigation }) => {
  const { token, setToken } = useContext(AuthContext)
  const { user, setUser } = useContext(AuthContext)
  const [id, setId] = useState(user)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [payPalMe, setPayPalMe] = useState("")
  const [update] = useMutation(UPDATE_USER)
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
    onCompleted(data) {
      setFirstName(data.user.firstName)
      setLastName(data.user.lastName)
      setEmail(data.user.email)
      setPayPalMe(data.user.payPalMe)
    }
  })
  if (loading) {
    return <Text>Loading</Text>
  }
  if (error) {
    return <Text>Error</Text>
  }
  if (!data || !user) {
    return <Text>No Data</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>ACCOUNT INFORMATION</Text>
        <Text style={styles.text}>{email}</Text>
        <AppTextInput
          icon="account"
          placeholder="First Name"
          autoCapitalize="words"
          onChangeText={text => setFirstName(text)}
          placeholderTextColor={colors.placeholderColor}
          value={firstName}
        />
        <AppTextInput
          icon="account"
          placeholder="Last Name"
          autoCapitalize="words"
          onChangeText={text => setLastName(text)}
          placeholderTextColor={colors.placeholderColor}
          value={lastName}
        />
        <AppTextInput
          icon="onepassword"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setPayPalMe(text)}
          placeholder="PayPal.me"
          placeholderTextColor={colors.placeholderColor}
          value={payPalMe}
        />
        <AuthButton
          title="Update"
          onPress={async () => {
            const { data } = await update({
              variables: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                payPalMe: payPalMe
              }
            })
          }}
        />
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
  },
  text: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold"
  }
})

export default Account
