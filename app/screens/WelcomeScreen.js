import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import colors from "../config/colors";
import appConstants from '../config/appConstants'
import AppButton from "../components/AppButton";

const WelcomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{appConstants.appTitle}</Text>
      <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
      <AppButton title="Register" onPress={() => navigation.navigate('Register')}/>
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

});

export default WelcomeScreen;
