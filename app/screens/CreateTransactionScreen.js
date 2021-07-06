import React from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import colors from "../config/colors";

const CreateTransaction = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
      <Text>CREATE TRANSACTION</Text>     
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
  }
});

export default CreateTransaction;
