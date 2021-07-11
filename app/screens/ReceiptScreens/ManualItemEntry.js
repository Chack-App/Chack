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

// How many characters should each passcode be?

const ManualItemEntry = () => {
  const { currentReceiptId } = useContext(AuthContext)
  console.log(currentReceiptId);
  const [itemList, setItemList] = useState([])
  const [itemName, setItemName] = useState()
  const [itemPrice, setItemPrice] = useState()
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
              console.log('current receipt:', currentReceiptId)
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
        <AppButton title="Confirm All" />
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
