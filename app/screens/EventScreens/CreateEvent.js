import React from "react";
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

const CreateEvent = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            label="Event Name"
            keyboardType="default"
          />

        </View>
        <AppButton title="Create Event" />
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
  eventNameField: {
    height: 10,
    width: 100
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CreateEvent;
