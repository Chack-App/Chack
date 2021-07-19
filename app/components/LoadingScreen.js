import React from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native"
import colors from "../config/colors"

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Loading</Text>
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
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  },
})

export default LoadingScreen;
