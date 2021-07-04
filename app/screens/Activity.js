import React from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import colors from "../config/colors";

const Activity = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>ACTIVITY</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
});

export default Activity;
