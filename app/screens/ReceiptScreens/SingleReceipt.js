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
import { useQuery, useMutation } from "@apollo/client"
import { GET_RECEIPT } from "../../client/queries/receiptQueries"
import { CLAIM_ITEM } from "../../client/queries/itemQueries"
import { AuthContext } from "../../context/authContext"

const SingleReceipt = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const { currentReceiptId } = useContext(AuthContext)
  const [toggle, setToggle] = useState(true)
  console.log(toggle)
  const [claimItem] = useMutation(CLAIM_ITEM, {
    refetchQueries: [
      { query: GET_RECEIPT, variables: { id: currentReceiptId } }
    ],
    onCompleted(data) {}
  })
  const { loading, error, data, refetch } = useQuery(GET_RECEIPT, {
    variables: { id: currentReceiptId }
  })
  if (loading) {
    return <Text>Loading</Text>
  }
  if (error) {
    return <Text>Error</Text>
  }
  let allItems = data.receipt.items
  //Query resulted in Strict-Mode Array, needed to adjust to be able to sort properly
  let unstrictItems = JSON.parse(JSON.stringify(allItems))
  unstrictItems.sort((a, b) => {
    return Number(a.id) - Number(b.id)
  })

  let claimedItems = unstrictItems.filter(item => item.users[0]) // all claimed items
  let filteredItems = claimedItems.filter(item => item.users[0].id === user) // items that belong to user

  let subTotal = 0
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.itemContainer}>
            {data.receipt.items &&
              unstrictItems.map(item => {
                subTotal += item.price / 100
                return (
                  <ItemButton
                    key={item.id}
                    title={item.name}
                    price={item.price / 100}
                    isClaimed={item.isClaimed}
                    isMine={filteredItems.includes(item)}
                    onPress={() =>
                      claimItem({
                        variables: {
                          userId: user,
                          itemId: item.id
                        }
                      })
                    }
                  />
                )
              })}
            <View style={styles.priceContainer}>
              <Text style={styles.text}>Subtotal: ${subTotal.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <View style={styles.buttonContainer}>
            {/* <AppButton title="Claim Items" width="47.5%" /> */}
            <AppButton title="Refresh List" onPress={() => refetch()} />
          </View>

          {Number(user) === data.receipt.cardDownId && (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.text}>You are the card down person</Text>
              <AppButton
                title="Approve Selections"
                onPress={() => navigation.navigate("SummaryScreen")}
              />
            </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
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
