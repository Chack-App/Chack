import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppSearchInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={colors.black}
          style={styles.icon}
        />
      )}
      <TextInput style={styles.input} {...otherProps} />
    </View>
  );
}

export default AppSearchInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    width: "50%",
    borderRadius: 100,
    padding: 7,
    //marginVertical: 10
  },
  input: {
    color: colors.black,
    borderColor: colors.black,
    // borderBottomWidth: 1,
    width: '80%',
    fontSize: 20,
  },
  icon: {
    marginRight: 10,
  },
});
