import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppSearchInput from "../components/AppSearchInput";

// How many characters should each passcode be?

const Events = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.eventPasscodeContainer}>
          <Text style={styles.text}>Event Passcode</Text>
          <AppSearchInput
            autoCapitalize="characters"
            keyboardTyp="default"
            icon="search"
            color="black"
            returnKeyType="search"
          />
          {/* <AppTextInput/> */}
        </View>
        <AppButton title="Create Event"/>
        <Text>___________________________________________________</Text>
        <View style={styles.activeEventList}>
            <Text>ACTIVE EVENTS LIST</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
  eventPasscodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 15,
    height: 100,
    width: "95%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  activeEventsList: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'

  }
});

export default Events;
