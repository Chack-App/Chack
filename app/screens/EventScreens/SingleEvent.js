import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";

const SingleEvent = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}
      >
        <AppButton
          title="New Receipt"
        />
        <AppButton
          title="Go To Active Receipt"
        />
        <AppButton
          title="Past Receipt"
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SingleEvent;
