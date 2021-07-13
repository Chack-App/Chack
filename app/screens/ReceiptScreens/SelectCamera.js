import React from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import colors from "../../config/colors"

import AppButton from "../../components/AppButton"


const SelectCamera = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View />
        <AppButton
          title="Scan Receipt"
          onPress={navigation.navigate("CameraScreen")}
        />
        <AppButton
          title="Enter Items Manually"
          onPress={navigation.navigate("ManualItemEntry")}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.secondary
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  },
})

export default SelectCamera;
