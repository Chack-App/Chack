import React, { useState, useContext } from "react"
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from "react-native"
import AuthButton from "../../components/AuthButton"
import AppTextInput from "../../components/AppTextInput"
import colors from "../../config/colors"
import { useMutation, useQuery } from "@apollo/client"
import { GET_USER, LOGIN } from "../../client/queries/userQueries"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthContext } from "../../context/authContext"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [login, response] = useMutation(LOGIN)
  const { token, setToken } = useContext(AuthContext)
  const { user, setUser } = useContext(AuthContext)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Text>{data}</Text> */}
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
        </View>
        <AuthButton
          title="Login"
          //the onpress should authenticate the login and if successful we need to figure
          //out how to connect it to the Events Screen in the AppNavigator

          onPress={async () => {
            const { data } = await login({
              variables: {
                email: email,
                password: password
              }
            })
            await AsyncStorage.clear()
            await AsyncStorage.setItem("USER", data.login.id)
            await AsyncStorage.setItem("TOKEN", data.login.token)
            console.log(data.login)
            setToken(data.login.token)
            setUser(data.login.id)
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

export default LoginScreen
