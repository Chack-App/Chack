import React from "react"
import colors from "../config/colors"
import { createStackNavigator } from "@react-navigation/stack"
import SingleReceipt from "../screens/ReceiptScreens/SingleReceipt"
import ManualItemEntry from "../screens/ReceiptScreens/ManualItemEntry"

const Stack = createStackNavigator()

const ReceiptNavigator = () => (
  <Stack.Navigator initialRouteName="SingleReceipt">
    <Stack.Screen
      name="SingleReceipt"
      component={SingleReceipt}
      options={{ ...gatewayHeaderStyles, headerTitle: "Your Receipt" }}
    />

    <Stack.Screen
      name="ManualItemEntry"
      component={ManualItemEntry}
      options={{ ...gatewayHeaderStyles, headerTitle: "Manual Item Entry" }}
    />
  </Stack.Navigator>
)

const gatewayHeaderStyles = {
  headerTransparent: false,
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTitle: ""
}

export default ReceiptNavigator
