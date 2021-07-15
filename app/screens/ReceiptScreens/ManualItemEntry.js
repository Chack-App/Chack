import React, { useState, useContext } from "react"
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Button
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

  const handleChange = (text, index, type) => {
    const updatedItemList = [...itemList];
    updatedItemList[index][type] = text;
    setItemList(updatedItemList);
  }

  const handleDelete = (index) => {
    const updatedItemList = [...itemList];
    updatedItemList.splice(index, 1)
    setItemList(updatedItemList);
  }

  const handleSubmit = () => {
    //Verify Inputs
    for (let i = 0; i < itemList.length; i++) {
      //console.log(itemList[i])
      if (!itemList[i].name) {
        Alert.alert(
          "Item Name Missing",
          "Please enter a name for all items"
        ),
        [{
          text: "OK"
        }]
        return;
      } else if (!Number(itemList[i].price)) {
        Alert.alert(
          "Invalid Price",
          "Please enter a valid price for all items"
        ),
        [{
          text: "OK"
        }]
        return;
      }
    }
    const itemListIntegers = itemList.map((item) => {
      return {name: item.name, price: Math.floor(Number(item.price) * 100)}
    });
    addItems({variables: {
      items: itemListIntegers,
      receiptId: currentReceiptId
    }});
    navigation.navigate("SingleReceipt");
  }
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.itemEntryContainer}>
          <AppTextInput
            value={itemName}
            icon="shopping-outline"
            placeholder="Item Name"
            onChangeText={text => setItemName(text)}/>
          <AppTextInput
            value={itemPrice}
            icon="cash"
            placeholder="Item Price"
            keyboardType="numeric"
            // onChangeText={text => setItemPrice(Number(text).toFixed(2))}
            onChangeText={text => setItemPrice(text)}
            />
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
            <AppButton
              title="DELETE"
              onPress={(text) => {
                handleDelete(index)
              }}
            />
          </View>
        ) : <Text style={styles.text}>No Items</Text>}
        </ScrollView>
        <AppButton
          title="Confirm All"
          onPress={handleSubmit}
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
    height: 200,
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
