import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../../config/colors";
import ReceiptButton from "../../components/ReceiptButton";
import AppButton from "../../components/AppButton";
import { GET_EVENT } from "../../client/queries/eventQueries"
import { useQuery } from "@apollo/client"


const SingleEvent = () => {
  const {data, loading, error} = useQuery(GET_EVENT, {
    variables: { id: 4 } // need to use Event Id here
  })

  if (loading) {
    return <Text>Loading</Text>
  }
  if (error) {
    return <Text>Error</Text>
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}
      >
        <AppButton
          title="New Receipt"
        />
         <View style={styles.receiptContainer}>
          <Text style={styles.text}>ACTIVE RECEIPTS</Text>
          {data.event.receipts && data.event.receipts.map(receipt=>{
            if(!receipt.isPaid){
              return <ReceiptButton key={receipt.id} title={receipt.name} />
            }
          })}
          </View>
        <View style={styles.receiptContainer}>
          <Text style={styles.text}>PAST RECEIPTS</Text>
          {data.event.receipts && data.event.receipts.map(receipt=>{
            if(receipt.isPaid){
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
    backgroundColor: colors.secondary,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
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
});

export default SingleEvent;
