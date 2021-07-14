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

// const vision = require("@google-cloud/vision")

// async function readReceipt(imguri) {
//   // Creates a client
//   const client = new vision.ImageAnnotatorClient({
//     keyFilename: "../../../GoogleKey.json"
//   })

//   const fileName = imguri

//   // Performs text detection on the local file

//   const [result] = await client.textDetection(fileName)
//   const detections = result.textAnnotations
//   //return detections

//   // Creates array of objects for each detected piece of text
//   let textArr = []
//   detections.forEach(text => textArr.push(text))

//   // console.log("ORIGINAL ---->", textArr)

//   // for (let i = 0; i < textArr.length; i++) {
//   //   let currentObject = textArr[i]
//   //   returnObj[currentObject.description] = currentObject.boundingPoly.vertices
//   // }

//   function runThisThing(apiArray) {
//     let result = {}
//     apiArray.forEach(item => {
//       if (result.hasOwnProperty(`${item.description}`)) {
//         const test = Math.ceil(Math.random() * 100)
//         result[`${item.description}~~~~${test}`] = item.boundingPoly.vertices
//       } else {
//         result[item.description] = item.boundingPoly.vertices
//       }
//     })
//     return result
//     //
//     //   console.log(apiArray.length)
//   }

//   const resultData = runThisThing(detections)

//   console.log("for loop finished", resultData)
// }

const UploadScreen = () => {
  const [image, setImage] = useState(null)
  const [uploadingState, setUploadingState] = useState()
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
    // console.log("file path***", image)
    // let base64stringPlease = await FileSystem.writeAsStringAsync(image, , {
    //   encoding: FileSystem.EncodingType.Base64
    // })

    // // console.log(
    // //   "base 64 string===>",
    // //   "data:image/png;base64, " + base64stringPlease
    // // )

    // console.log(
    //   "hello",
    //   await FileSystem.readAsStringAsync(image, {
    //     encoding: FileSystem.EncodingType.Base64
    //   })
    // )
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
              // { type: "LABEL_DETECTION", maxResults: 10 },
              // { type: "LANDMARK_DETECTION", maxResults: 5 },
              // { type: "FACE_DETECTION", maxResults: 5 },
              // { type: "LOGO_DETECTION", maxResults: 5 },
              // { type: "TEXT_DETECTION", maxResults: 99 }
              { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 }
              // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
              // { type: "IMAGE_PROPERTIES", maxResults: 5 },
              // { type: "CROP_HINTS", maxResults: 5 },
              // { type: "WEB_DETECTION", maxResults: 5 }
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
      console.log("please", responseJson.responses[0].textAnnotations)

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
