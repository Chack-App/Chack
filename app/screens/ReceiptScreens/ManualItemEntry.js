import React, { useState, useContext } from "react"
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native"
import colors from "../../config/colors"
import AppButton from "../../components/AppButton"
import AppTextInput from "../../components/AppTextInput"
import { AuthContext } from "../../context/authContext"
import { ADD_ITEMS } from "../../client/queries/itemQueries"
import { GET_RECEIPT } from "../../client/queries/receiptQueries"
import { useMutation } from "@apollo/client"

// How many characters should each passcode be?

const ManualItemEntry = ({ navigation }) => {
  const { currentReceiptId } = useContext(AuthContext)

  const [itemList, setItemList] = useState([])
  const [itemName, setItemName] = useState()
  const [itemPrice, setItemPrice] = useState()

  const [addItems] = useMutation(ADD_ITEMS, {
    refetchQueries: [{
      query: GET_RECEIPT,
      variables: {id: currentReceiptId}
    }]
  })

  const handleChange = (event, index, type) => {
    console.log('event', event)
    const updatedItemList = [...itemList];
    updatedItemList[index][type] = event;
    setItemList(updatedItemList);
  }
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.itemEntryContainer}>
          <AppTextInput
            icon="shopping-outline"
            placeholder="Item Name"
            onChangeText={text => setItemName(text)}/>
          <AppTextInput
            icon="cash"
            placeholder="Item Price"
            keyboardType="numeric"
            onChangeText={text => setItemPrice(Number(text).toFixed(2))}/>
          <AppButton
            title="Add Item"
            onPress={() => {
              setItemList([{name: itemName, price: itemPrice}, ...itemList])
              setItemName("")
              setItemPrice("")
            }}
          />
        </View>
        <ScrollView>
        {itemList.length ? itemList.map((item, index) =>
          <View style={styles.itemContainer} key={index}>
            <AppTextInput
              value={itemList[index].name}
              placeholder="Item Name"
              onChangeText={(text) => handleChange(text, index, "name")}
            />
            <AppTextInput
              value={itemList[index].price}
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={(text) => handleChange(text, index, "price")}
          />
          </View>
        ) : <Text>No Items</Text>}
        </ScrollView>
        <AppButton
          title="Confirm All"
          onPress={() => {
            const itemListIntegers = itemList.map((item) => {
              return {name: item.name, price: Math.floor(Number(item.price) * 100)}
            });
            addItems({variables: {
              items: itemListIntegers,
              receiptId: currentReceiptId
            }});
            navigation.navigate("SingleReceipt");
        }}
        />
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
  itemEntryContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 10,
    height: 200,
    width: "95%",
    marginVertical: 5
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 5,
    height: 130,
    width: "95%",
    marginVertical: 5
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  },
  activeEventsList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default ManualItemEntry
