import React, { useContext, useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native"
import colors from "../../config/colors"
import ReceiptButton from "../../components/ReceiptButton"
import AppTextInput from "../../components/AppTextInput"
import AppButton from "../../components/AppButton"
import { GET_EVENT } from "../../client/queries/eventQueries"
import { CREATE_RECEIPT } from "../../client/queries/receiptQueries"
import { useQuery, useMutation } from "@apollo/client"
import { AuthContext } from "../../context/authContext"

const SingleEvent = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const { currentEventId } = useContext(AuthContext)
  const { setCurrentReceiptId } = useContext(AuthContext)
  const { setCurrentEventUsers } = useContext(AuthContext)

  const [receiptName, setReceiptName] = useState("")

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id: currentEventId },
    fetchPolicy: "cache-and-network"
  })

  console.log(data)

  const [addReceipt] = useMutation(CREATE_RECEIPT, {
    refetchQueries: [
      {
        query: GET_EVENT,
        variables: { id: currentEventId }
      }
    ],
    onCompleted(data) {
      setCurrentReceiptId(data.addReceipt.id)
    }
  })

  if (loading) {
    return <Text>Loading</Text>
  }
  if (error) {
    return <Text>Error</Text>
  }
  if (!data || !data.event) {
    return <Text>No Data</Text>
  }
  console.log(receiptName)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{data.event.eventName}</Text>
        <View style={styles.createReceiptContainer}>
          <Text style={styles.text}>New Receipt</Text>
          <AppTextInput
            keyboardTyp="default"
            placeholder="Name"
            onChangeText={receiptName => setReceiptName(receiptName)}
          />
          {/* <AppButton
            title="Create"
            onPress={() => {
              addReceipt({variables: {
                name: receiptName,
                eventId: Number(currentEventId),
                cardDownId: Number(user)
              }});
              setReceiptName("");
              navigation.navigate("ManualItemEntry")
          }}
          /> */}

          <AppButton
            title="Create"
            onPress={() => {
              addReceipt({
                variables: {
                  name: receiptName,
                  eventId: Number(currentEventId),
                  cardDownId: Number(user)
                }
              })
              setReceiptName("")
              navigation.navigate("CameraScreen")
            }}
          />
        </View>
        <View style={styles.receiptContainer}>
          <Text style={styles.text}>ACTIVE RECEIPTS</Text>
          {data.event.receipts &&
            data.event.receipts.map(receipt => {
              if (!receipt.isPaid) {
                return (
                  <ReceiptButton
                    key={receipt.id}
                    title={receipt.name}
                    onPress={() => {
                      setCurrentReceiptId(receipt.id)
                      setCurrentEventUsers(data.event.users)
                      navigation.navigate("SingleReceipt")
                    }}
                  />
                )
              }
            })}
        </View>
        <View style={styles.receiptContainer}>
          <Text style={styles.text}>PAST RECEIPTS</Text>
          {data.event.receipts &&
            data.event.receipts.map(receipt => {
              if (receipt.isPaid) {
                return <ReceiptButton key={receipt.id} title={receipt.name} />
              }
            })}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.secondary
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  },
  createReceiptContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 15,
    height: 180,
    width: "95%",
    marginVertical: 10
  },
  receiptContainer: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "95%",
    marginVertical: 10
  }
})

export default SingleEvent
