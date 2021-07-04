import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import colors from "../../config/colors";
import appConstants from "../../config/appConstants";
import AuthButton from "../../components/AuthButton";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{appConstants.appTitle}</Text>
      <AuthButton title="Login" onPress={() => navigation.navigate("Login")} />
      <AuthButton title="SignUp"onPress={() => navigation.navigate("SignUp")}/>
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
    color: colors.white,
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 100,
  },
});

export default WelcomeScreen;
