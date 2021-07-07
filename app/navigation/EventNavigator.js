import React from "react"
import colors from "../config/colors"
import Events from "../screens/EventScreens/Events"
import ManualItemEntry from "../screens/EventScreens/ManualItemEntry"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

const EventNavigator = () => (
  <Stack.Navigator initialRouteName="Events">
    <Stack.Screen
      name="Events"
      component={Events}
      options={{ ...gatewayHeaderStyles, headerTitle: "Events" }}
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
