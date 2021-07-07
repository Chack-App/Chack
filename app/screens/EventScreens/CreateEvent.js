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
import AppTextInput from "../../components/AppTextInput";

const CreateEvent = () => {
  const [eventName, setEventName] = useState();
  const [eventDesc, setEventDesc] = useState();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Event Name</Text>
            <AppTextInput
              placeholder="Name"
              onChangeText={(name) => setEventName(name)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Event Description</Text>
            <AppTextInput
              placeholder="Description"
              multiline={true}
              numberOfLines={5}
              onChangeText={(name) => setEventName(name)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <AppButton title="Create Event" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
  inputContainer: {
    padding: 15,
    height: 100,
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    color: "black",
    fontSize: 20,
    padding: 5
  },
});

export default CreateEvent;
