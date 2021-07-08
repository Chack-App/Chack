import React, { useState } from "react"
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
import { useMutation } from "@apollo/client"
import { LOGIN } from "../../client/queries/userQueries"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [login, response] = useMutation(LOGIN)

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
              // update: updateCache
            })
            await AsyncStorage.clear()
            await AsyncStorage.setItem("TOKEN", data.login.token)
          }}
          // navigation.navigate("Events")
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
