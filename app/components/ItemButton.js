import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../config/colors"

function ItemButton({ title, price, onPress, isClaimed, isMine, disabled }) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor:
        isClaimed && isMine
          ? colors.isSelected
          : isClaimed
          ? "gray"
          : colors.primary,
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
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <View>
        <Text style={styles.text}>{title}</Text>
        {/* this is where the person who claimed the items name
          or profile picture goes */}
      </View>
      <Text style={styles.text}>${price}</Text>
    </TouchableOpacity>
  )
}

export default ItemButton

// calamari
// steak
