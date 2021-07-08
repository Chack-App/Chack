import React from "react"
import { StyleSheet, Text, TouchableOpacity,View } from "react-native"
import colors from "../config/colors"

function ItemButton({ title, price, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View>
      <Text style={styles.text}>{title}</Text>
      {/* this is where the person who claimed the items name 
          or profile picture goes */}
      </View>
      <Text style={styles.text}>${price}</Text>
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
    marginVertical: 10
    
  },
  text: {
    color: colors.white,
    fontSize: 20,
    // textTransform: "uppercase",
    fontWeight: "bold"
  }
})

export default ItemButton
