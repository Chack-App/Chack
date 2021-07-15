import React, { useContext } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  ScrollView
} from "react-native"
import colors from "../../config/colors"
import ItemButton from "../../components/ItemButton"
import AppButton from "../../components/AppButton"
import { useQuery } from "@apollo/client"
import { GET_RECEIPT } from "../../client/queries/receiptQueries"
import { AuthContext } from "../../context/authContext"
import { GET_USER } from "../../client/queries/userQueries"

const SummaryScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const { currentReceiptId } = useContext(AuthContext)
  const { currentEventUsers } = useContext(AuthContext)
  const { setCurrentReceiptPaypalHandle } = useContext(AuthContext)
  const { setCurrentReceiptUserTotal } = useContext(AuthContext)

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
  if (!data) {
    return <Text>No Data</Text>
  }

  //console.log("data...", data)
  // console.log(currentEventUsers)
  const tip = data.receipt.tip / 100
  const tax = data.receipt.tax / 100

  const isCardDownUser = Number(user) === data.receipt.cardDownId

  //need to set current user's subtotal
  let userSubtotal = 0
  let claimedItems = data.receipt.items.filter(item => item.users[0])
  let filteredItems = claimedItems.filter(item => item.users[0].id === user)
  // console.log(filteredItems)
  filteredItems.map(item => (userSubtotal += item.price / 100))

  let billTotal = 0
  claimedItems.map(item => (billTotal += item.price / 100))

  let userGrandTotal = (
    (userSubtotal / billTotal) * tax +
    userSubtotal * tip +
    userSubtotal
  ).toFixed(2)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback>
          <View>
            {currentEventUsers &&
              currentEventUsers.map(user => {
                //need filtered list
                const itemList = claimedItems
                const filteredUserItems = itemList.filter(
                  item => item.users[0].id === user.id
                )
                let subtotal = 0
                filteredUserItems.forEach(item => {
                  subtotal += item.price / 100
                })
                return (
                  <View key={user.id} style={styles.userContainer}>
                    <Text style={styles.text}>
                      {user.firstName} {user.lastName}
                    </Text>
                    {filteredUserItems.map(item => {
                      return (
                        <View key={item.id} style={styles.itemLine}>
                          <Text style={styles.secondaryText}>{item.name}</Text>
                          <Text style={styles.secondaryText}>
                            ${item.price / 100}
                          </Text>
                        </View>
                      )
                    })}
                    <View style={styles.itemLine}>
                      <Text style={styles.text}>Subtotal:</Text>
                      <Text style={styles.text}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.itemLine}>
                      <Text style={styles.text}>Tip:</Text>
                      <Text style={styles.text}>
                        ${(subtotal * tip).toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.itemLine}>
                      <Text style={styles.text}>Tax:</Text>
                      <Text style={styles.text}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.itemLine}>
                      <Text style={styles.text}>Total:</Text>
                      <Text style={styles.text}>
                        $
                        {(
                          (subtotal / billTotal) * tax +
                          subtotal * tip +
                          subtotal
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                )
              })}
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              {isCardDownUser ? (
                <AppButton title={`They Should Pay`} />
              ) : (
                <AppButton
                  title={`Pay $${userGrandTotal} Now`}
                  onPress={() => {
                    setCurrentReceiptUserTotal(userGrandTotal)
                    setCurrentReceiptPaypalHandle(data.receipt.cardDownHandle)
                    navigation.navigate("PayPal")
                  }}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
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
    padding: 10,
    margin: 10
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
  itemLine: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  priceContainer: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignSelf: "flex-end",
    marginRight: 23.85
  }
})

export default SummaryScreen
