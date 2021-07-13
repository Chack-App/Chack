import React, { useContext } from "react"
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

const SummaryScreen = () => {
  const { user } = useContext(AuthContext)
  const { currentReceiptId } = useContext(AuthContext)
  const { currentEventUsers } = useContext(AuthContext)

  const { loading, error, data } = useQuery(GET_RECEIPT, {
    variables: { id: currentReceiptId }
  })
  if (loading) {
    return <Text>Loading</Text>
  }
  if (error) {
    console.error(error)
    return <Text>Error</Text>
  }
  // console.log(data)
  // console.log(currentEventUsers)

  const isCardDownUser = user === data.receipt.cardDownId

  //need to set current user's subtotal
  let userSubtotal = 0
  let filteredItems = data.receipt.items.filter(
    item => item.users[0].id === user
  )
  // console.log(filteredItems)
  filteredItems.map(item => (userSubtotal += item.price / 100))

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.itemContainer}></View>
        {currentEventUsers &&
          currentEventUsers.map(user => {
            //need filtered list
            const itemList = data.receipt.items
            const filteredUserItems = itemList.filter(
              item => item.users[0].id === user.id
            )
            let subtotal = 0
            filteredUserItems.map(item => {
              subtotal += item.price / 100
            })
            return (
              <View key={user.id} style={styles.userContainer}>
                <Text style={styles.text}>
                  {user.firstName} {user.lastName}
                </Text>
                {filteredUserItems.map(item => {
                  return (
                    <View key={item.id}>
                      <Text style={styles.secondaryText}>
                        {item.name} {item.price / 100}
                      </Text>
                    </View>
                  )
                })}
                <Text style={styles.text}>Subtotal: ${subtotal}</Text>
              </View>
            )
          })}
        {isCardDownUser ? (
          <AppButton title={`They Should Pay`} />
        ) : (
          <AppButton title={`Pay $${userSubtotal} Now`} />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  },
  itemContainer: {
    // justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primary
  },
  userContainer: {
    justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: colors.primary,
    padding: "1em",
    margin: "1em"
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  },
  secondaryText: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "bold"
  },
  priceContainer: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignSelf: "flex-end",
    marginRight: 23.85
  }
})

export default SummaryScreen
