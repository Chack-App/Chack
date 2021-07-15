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
import { GET_RECEIPT, SET_APPROVED } from "../../client/queries/receiptQueries"
import { CLAIM_ITEM } from "../../client/queries/itemQueries"
import { AuthContext } from "../../context/authContext"
import AppTextInput from "../../components/AppTextInput"

const SingleReceipt = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const { currentReceiptId } = useContext(AuthContext)
  const [tax, setTax] = useState(0)
  const [tip, setTip] = useState(0)
  const [setApproved] = useMutation(SET_APPROVED, {
    refetchQueries: [
      { query: GET_RECEIPT, variables: { id: currentReceiptId } }
    ]
  })
  const [claimItem] = useMutation(CLAIM_ITEM, {
    refetchQueries: [
      { query: GET_RECEIPT, variables: { id: currentReceiptId } }
    ],
    onCompleted(data) {
      console.log(data)
    }
  })
  const { loading, error, data, refetch } = useQuery(GET_RECEIPT, {
    variables: { id: currentReceiptId },
    onCompleted(data) {
      setTip(data.receipt.tip)
      setTax(data.receipt.tax)
    }
  })
  if (loading) {
    return <Text>Loading</Text>
  }
  if (error) {
    return <Text>Error</Text>
  }
  let allItems = data.receipt.items
  // console.log(data)
  //Query resulted in Strict-Mode Array, needed to adjust to be able to sort properly
  let unstrictItems = JSON.parse(JSON.stringify(allItems))
  unstrictItems.sort((a, b) => {
    return Number(a.id) - Number(b.id)
  })

  let claimedItems = unstrictItems.filter(item => item.users[0]) // all claimed items
  let filteredItems = claimedItems.filter(item => item.users[0].id === user) // items that belong to user

  let isApproved = data.receipt.isApproved

  const handleApproved = () => {
    if (Number(tip) > 100 || Number(tip) < 0 || isNaN(Number(tip))) {
      Alert.alert("tip must be a number between 0 and 100")
      console.log("tip error")
    } else if (isNaN(Number(tax))) {
      Alert.alert("tax must be a number")
      console.log("tax error")
    } else if (claimedItems.length !== allItems.length) {
      Alert.alert("All Items must be claimed before Approval"),
        [
          {
            text: "OK"
          }
        ]
    } else {
      setApproved({
        variables: {
          id: currentReceiptId,
          tax: Number(tax * 100),
          tip: Number(tip)
        }
      })
      navigation.navigate("SummaryScreen")
    }
  }

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
                    isApproved={isApproved}
                    onPress={() =>{
                      claimItem({
                        variables: {
                          userId: user,
                          itemId: item.id
                        }
                      })}
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
            {isApproved ? (
              <AppButton
                title="Continue to Summary"
                onPress={() => {
                  navigation.navigate("SummaryScreen")
                }}
              />
            ) : (
              <AppButton title="Refresh List" onPress={() => refetch()} />
            )}
          </View>

          {!isApproved && Number(user) === data.receipt.cardDownId && (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.text}>You are the card down person</Text>
              <AppTextInput
                icon="account"
                placeholder="tax in $"
                autoCapitalize="words"
                onChangeText={text => setTax(text)}
                placeholderTextColor={colors.placeholderColor}
              />
              <AppTextInput
                icon="account"
                placeholder="tip as %"
                autoCapitalize="words"
                onChangeText={text => setTip(text)}
                placeholderTextColor={colors.placeholderColor}
              />
              <AppButton title="Approve Selections" onPress={handleApproved} />
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
    marginRight: 12
  }
})

export default SingleReceipt
