import React from "react"
import { StyleSheet, Text, TouchableOpacity,View } from "react-native"
import colors from "../config/colors"

export default function ReceiptButton({ title, price, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View>
      <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "95%",
    marginVertical: 10,
    borderWidth: 1
  },
  text: {
    color: colors.white,
    fontSize: 20,
    // textTransform: "uppercase",
    fontWeight: "bold"
  }
})