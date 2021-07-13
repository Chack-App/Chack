import React, { useState, useContext } from "react"
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native"
import AppTextInput from "../../components/AppTextInput"
import AuthButton from "../../components/AuthButton"
import colors from "../../config/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthContext } from "../../context/authContext"
import { SIGNUP } from "../../client/queries/userQueries"
import { useMutation } from "@apollo/client"

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [payPalMe, setPayPalMe] = useState()
  const { token, setToken } = useContext(AuthContext)
  const { user, setUser } = useContext(AuthContext)
  const [signup] = useMutation(SIGNUP)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <AppTextInput
            icon="account"
            placeholder="First Name"
            autoCapitalize="words"
            onChangeText={text => setFirstName(text)}
            placeholderTextColor={colors.placeholderColor}
          />
          <AppTextInput
            icon="account"
            placeholder="Last Name"
            autoCapitalize="words"
            onChangeText={text => setLastName(text)}
            placeholderTextColor={colors.placeholderColor}
          />
          <AppTextInput
            icon="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            placeholderTextColor={colors.placeholderColor}
            textContentType="emailAddress"
          />
          <AppTextInput
            icon="onepassword"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setPassword(text)}
            placeholder="Password"
            placeholderTextColor={colors.placeholderColor}
            secureTextEntry
            textContentType="password"
          />
          <AppTextInput
            icon="onepassword"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setPayPalMe(text)}
            placeholder="PayPal.me"
            placeholderTextColor={colors.placeholderColor}
            secureTextEntry
            textContentType="password"
          />
        </View>
        <AuthButton
          title="Sign Up"
          onPress={async () => {
            const { data } = await signup({
              variables: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                payPalMe: payPalMe
              }
            })
            await AsyncStorage.setItem("USER", data.signup.id)
            await AsyncStorage.setItem("TOKEN", data.signup.token)

            setToken(data.signup.token)
            setUser(data.signup.id)
            // console.log(data)
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 100
  },
  inputContainer: {
    marginBottom: 60
  }
})

export default SignUpScreen
