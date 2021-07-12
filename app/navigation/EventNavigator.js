import React from "react"
import colors from "../config/colors"
import Events from "../screens/EventScreens/Events"
import CreateEvent from "../screens/EventScreens/CreateEvent"
import { createStackNavigator } from "@react-navigation/stack";
import SingleEvent from "../screens/EventScreens/SingleEvent";
// Added Receipt components to event navigator:
import ManualItemEntry from "../screens/ReceiptScreens/ManualItemEntry";
import SingleReceipt from "../screens/ReceiptScreens/SingleReceipt";


const Stack = createStackNavigator()

const EventNavigator = () => (
  <Stack.Navigator initialRouteName="Events">
    <Stack.Screen
      name="Events"
      component={Events}
      options={{ ...gatewayHeaderStyles, headerTitle: "Events" }}
    />
    <Stack.Screen
      name="CreateEvent"
      component={CreateEvent}
      options={{ ...gatewayHeaderStyles, headerTitle: "Create Event" }}
    />
    <Stack.Screen
      name="SingleEvent"
      component={SingleEvent}
      options={{ ...gatewayHeaderStyles, headerTitle: "Your Event" }}
    />
    {/* Moved receipt navigation to event navigator below */}
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

export default EventNavigator
