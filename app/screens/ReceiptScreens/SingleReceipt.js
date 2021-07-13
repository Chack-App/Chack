import React, { useState, useContext } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
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
  const [myItems, setMyItems] = useState([])

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
 //console.log(data)

  const toggle = (item) => {
    const itemId = item.id
    const indexInState = myItems.indexOf(item)
    indexInState === -1 ? 
    setMyItems([...myItems, item]) : 
    setMyItems(myItems => myItems.filter(item => item.id!=itemId))
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.itemContainer}>
            {data.receipt.items &&
              data.receipt.items.map(item => {
                subTotal += item.price / 100
                return (
                  <ItemButton
                    key={item.id}
                    title={item.name}
                    price={item.price / 100}
                    isClaimed={item.isClaimed}
                    isToggled={myItems.indexOf(item)!=-1}
                    onPress={() => toggle(item)}
                  />
                )
              })}
            <View style={styles.priceContainer}>
              <Text style={styles.text}>Subtotal: ${subTotal.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={{alignItems: 'center'}}>
          <View >
        <AppButton title="Claim Items" /> 
        <AppButton title="Refresh List" /> 

        </View>
        {Number(user) === data.receipt.cardDownId && (
          <>
            <Text style={styles.text}>You are the card down person</Text>
            <AppButton title="Approve Selections" />
          </>
            )}
            </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

/*
  claim items button is used to
  call the mutation that will claim
  the item on behalf of the user
  item.setUser(user)

  Refresh List Button is used to 
  update the list to account for
  other peoples item claims

*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: colors.secondary
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
