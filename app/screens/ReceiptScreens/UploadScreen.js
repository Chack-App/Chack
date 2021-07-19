import React, { useState, useEffect, useContext } from "react"
import {
  Button,
  Image,
  View,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert
} from "react-native"
import colors from "../../config/colors"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { AuthContext } from "../../context/authContext"
import AppButton from "../../components/AppButton"
import { GOOGLE_CLOUD_VISION_API_KEY } from "../../../secrets"
import { parseData } from "../../calculations"
import { useMutation } from "@apollo/client"
import { ADD_ITEMS } from "../../client/queries/itemQueries"
import { GET_RECEIPT } from "../../client/queries/receiptQueries"

const UploadScreen = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [uploadingState, setUploadingState] = useState()
  const { currentReceiptId } = useContext(AuthContext)
  console.log(currentReceiptId)
  const [addItems] = useMutation(ADD_ITEMS, {
    refetchQueries: [
      {
        query: GET_RECEIPT,
        variables: { id: currentReceiptId }
      }
    ]
  })

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

    // console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const handleScan = async () => {
    if (!image) {
      Alert.alert("No image uploaded", "Please select image from library"),
        [
          {
            text: "OK"
          }
        ]
      return
    }

    let stringbase64 = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64
    })

    submitToGoogle(stringbase64)
  }

  const submitToGoogle = async img => {
    try {
      // this.setState({ uploading: true })
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 }
            ],
            image: {
              content: `${img}`
            }
          }
        ]
      })
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          GOOGLE_CLOUD_VISION_API_KEY,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      )
      let responseJson = await response.json()
      //console.log("please", responseJson.responses[0].textAnnotations)
      const parsedData = parseData(responseJson.responses[0].textAnnotations)
      //console.log("Our result: ", parsedData)
      // const itemListIntegers = parsedData.map((item) => {
      //   return {name: item.name, price: Math.floor(Number(item.price) * 100)})
      addItems({
        variables: {
          items: parsedData,
          receiptId: currentReceiptId
        }
      })
      navigation.navigate("SingleReceipt")
      // this.setState({
      //   googleResponse: responseJson,
      //   uploading: false
      // })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <AppButton title="Upload Receipt" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <AppButton title="Scan Image" onPress={handleScan} />
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

  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  }
})

export default UploadScreen
