import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import appConstants from '../config/appConstants'


const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{appConstants.appTitle}</Text>
      <View style={styles.inputContainer}>
        <AppTextInput
          icon="email"
          placeholder="Email"
          placeholderTextColor={colors.placeholderColor}
        />
        <AppTextInput
          icon="onepassword"
          placeholder="Password"
          placeholderTextColor={colors.placeholderColor}
        />
      </View>
      <AppButton title="Login" onPress={() => navigation.navigate('NewHome')}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 100,
  },
  inputContainer: {
    marginBottom: 60,
  },
});

export default LoginScreen;
