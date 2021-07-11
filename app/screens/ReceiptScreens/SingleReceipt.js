import React, { useState, useContext } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Alert
} from "react-native"
import colors from "../../config/colors"
import ItemButton from "../../components/ItemButton"
import AppButton from "../../components/AppButton"
import { useQuery } from "@apollo/client"
import { GET_RECEIPT } from "../../client/queries/receiptQueries"
import { AuthContext } from "../../context/authContext"

const SingleReceipt = () => {
  const { user } = useContext(AuthContext)
  const { currentReceiptId } = useContext(AuthContext)

  const { loading, error, data } = useQuery(GET_RECEIPT, {
    variables: { id: currentReceiptId }
  })
  if (loading) {
    return <Text>Loading</Text>
  }

  if (error) {
    return <Text>Error</Text>
  }
  let subTotal = 0
  console.log(data)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.itemContainer}>
          {data.receipt.items &&
            data.receipt.items.map(item => {

              subTotal += item.price / 100
              return (
                <ItemButton
                  key={item.id}
                  title={item.name}
                  price={item.price / 100}
                  onPress={()=>{
                  }}
                />
              )
            })}
          <View style={styles.priceContainer}>
            <Text style={styles.text}>Subtotal: ${subTotal}</Text>
          </View>
        </View>
        {Number(user) === data.receipt.cardDownId ?
          (<View>
            <Text style={styles.text}>You are the card down person</Text>
            <AppButton
              title="Approve Selections"
            />
          </View>) : (
          <View></View>)}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: colors.secondary,
  },
  itemContainer: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  },
  priceContainer: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignSelf: "flex-end",
    padding: 15,
    //width: "95%",
    marginRight: 23.85
  }
})

export default SingleReceipt
