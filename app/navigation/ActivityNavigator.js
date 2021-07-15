import React, { useContext } from "react"
import colors from "../config/colors"
import { createStackNavigator } from "@react-navigation/stack"
import Activity from "../screens/Activity"
import SingleEvent from "../screens/EventScreens/SingleEvent"
import SummaryScreen from "../screens/ReceiptScreens/SummaryScreen"
import SingleReceipt from "../screens/ReceiptScreens/SingleReceipt"
import {AuthContext} from "../context/authContext"

const Stack = createStackNavigator()

const ActivityNavigator = () => {
  const {currentEventName} = useContext(AuthContext)
  const {currentReceiptName} = useContext(AuthContext)

  return(
  <Stack.Navigator initialRouteName="Activity">
    <Stack.Screen
      name="Activity"
      component={Activity}
      options={{ ...gatewayHeaderStyles, headerTitle: "Activity" }}
    />
        <Stack.Screen
      name="SingleEvent"
      component={SingleEvent}
      options={{ ...gatewayHeaderStyles, headerTitle: `${currentEventName}` }}
    />
        <Stack.Screen
      name="SingleReceipt"
      component={SingleReceipt}
      // component={SummaryScreen}
      options={{ ...gatewayHeaderStyles, headerTitle: `${currentReceiptName}` }}
    />
        <Stack.Screen
      name="SummaryScreen"
      component={SummaryScreen}
      options={{ ...gatewayHeaderStyles, headerTitle: `${currentReceiptName} Summary` }}
    />
  </Stack.Navigator>
)}

const gatewayHeaderStyles = {
  headerTransparent: false,
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTitle: ""
}

export default ActivityNavigator
