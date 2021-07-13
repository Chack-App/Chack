import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import colors from "../config/colors"

function AppButton({ title, onPress, width = "95%"}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
      width: width,
      marginVertical: 10
    },
    text: {
      color: colors.white,
      fontSize: 20,
      textTransform: "uppercase",
      fontWeight: "bold"
    }
  })
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}


export default AppButton
