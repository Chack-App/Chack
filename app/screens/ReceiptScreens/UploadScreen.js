import React, { useState, useEffect, useContext } from "react"
import {
  Button,
  Image,
  View,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from "react-native"
import colors from "../../config/colors"
import * as ImagePicker from "expo-image-picker"

import { AuthContext } from "../../context/authContext"

const UploadScreen = () => {
  const [image, setImage] = useState(null)
  const { currentReceiptId } = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
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
    padding: 10,
    height: 200,
    width: "95%",
    marginVertical: 5
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 5,
    height: 200,
    width: "95%",
    marginVertical: 5
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  }
})

export default UploadScreen
