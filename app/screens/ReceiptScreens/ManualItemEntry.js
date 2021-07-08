import React, { useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native"
import colors from "../../config/colors"
import AppButton from "../../components/AppButton"
import AppTextInput from "../../components/AppTextInput"

// How many characters should each passcode be?

const ManualItemEntry = () => {
  const [itemName, setItemName] = useState()
  const [itemPrice, setItemPrice] = useState()
  
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.itemEntryContainer}>
          <AppTextInput
            icon="shopping-outline"
            placeholder="Item Name"
            onChangeText={text => setItemName(text)}/>
          <AppTextInput
            icon="cash"
            placeholder="Item Price"
            keyboardType="numeric"
            onChangeText={text => setItemPrice(Number(text).toFixed(2))}/>
        </View>
        <AppButton title="Enter Item" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary
  },
  itemEntryContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 15,
    height: "200",
    width: "95%",
    marginVertical: 10
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  },
  activeEventsList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default ManualItemEntry
