import React, { useContext, useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ScrollView
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
  const { setCurrentReceiptName } = useContext(AuthContext)
  const { setCurrentEventUsers } = useContext(AuthContext)

  const [receiptName, setReceiptName] = useState("")

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id: currentEventId },
    fetchPolicy: "cache-and-network"
  })

  // console.log(data)

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

  const handleCreate = () => {
    if (!receiptName) {
      Alert.alert(
        "Receipt Name Missing",
        "Please enter a name for your receipt"
        ),
        [
          {
            text: "OK"
          }
        ]
        return
      }
      addReceipt({
        variables: {
        name: receiptName,
        eventId: Number(currentEventId),
        cardDownId: Number(user)
      }
    })
    setCurrentReceiptName(receiptName)
    setReceiptName("")
    navigation.navigate("SelectCamera")
  }
  //console.log(data)

  let numActiveReceipts = data.event.receipts.filter(receipt => receipt.isPaid===false).length
  let eventIsActive = !data.event.isComplete
  // console.log(data.event)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {eventIsActive && 
        <>
        <View style={styles.createReceiptContainer}>
          <Text style={{ ...styles.text, textAlign: "center" }}>
            NEW RECEIPT
          </Text>
          <View style={{ justifyContent: "center", textAlign: "center" }}>
            <AppTextInput
              keyboardTyp="default"
              placeholder="Name"
              onChangeText={receiptName => setReceiptName(receiptName)}
            />
          </View>
          <AppButton
            title="CREATE"
            onPress={handleCreate}
          />
        </View>
        <View style={styles.receiptContainer}>
          <Text style={{ ...styles.text, textAlign: "center" }}>
            ACTIVE RECEIPTS
          </Text>
          <ScrollView contentContainerStyle={{alignItems: "center"}}>
            {data.event.receipts &&
              data.event.receipts.map(receipt => {
                if (!receipt.isPaid) {
                  return (
                    <ReceiptButton
                      key={receipt.id}
                      title={receipt.name}
                      onPress={() => {
                        setCurrentReceiptId(receipt.id)
                        setCurrentReceiptName(receipt.name)
                        setCurrentEventUsers(data.event.users)
                        navigation.navigate("SingleReceipt")
                      }}
                    />
                  )
                }
              })}
          </ScrollView>
        </View></>}
        <View style={styles.receiptContainer}>
          <Text style={{ ...styles.text, textAlign: "center" }}>
            PAST RECEIPTS
          </Text>
          <ScrollView contentContainerStyle={{alignItems: "center"}}>
            {data.event.receipts &&
              data.event.receipts.map(receipt => {
                if (receipt.isPaid) {
                  return (
                    <ReceiptButton
                      key={receipt.id}
                      title={receipt.name}
                      onPress={() => {
                        setCurrentReceiptId(receipt.id)
                        setCurrentReceiptName(receipt.name)
                        setCurrentEventUsers(data.event.users)
                        navigation.navigate("SummaryScreen")
                      }}
                    />
                  )
                }
              })}
          </ScrollView>
        </View>
        {eventIsActive&&<AppButton title="Close Event" onPress={()=>{
          if(numActiveReceipts>0){
            Alert.alert(
              "Cannot close event with active receipts",
              "Please close all active receipts before attempting to close this event"
              ),
              [
                {
                  text: "OK"
                }
              ]
              return
            }
            else {
              navigation.navigate("CloseEvent")
            }}
          }/>}
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
    flexDirection: "column",
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
    flexDirection: "column",
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 15,
    flex:1,
    width: "95%",
    marginVertical: 10
  }
})

export default SingleEvent
