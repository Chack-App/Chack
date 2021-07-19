import React, { useContext } from "react"
import colors from "../config/colors"
import Events from "../screens/EventScreens/Events"
import CreateEvent from "../screens/EventScreens/CreateEvent"
import { createStackNavigator } from "@react-navigation/stack"
import SingleEvent from "../screens/EventScreens/SingleEvent"
// Added Receipt components to event navigator:
import SelectCamera from "../screens/ReceiptScreens/SelectCamera"
import ManualItemEntry from "../screens/ReceiptScreens/ManualItemEntry"
import SingleReceipt from "../screens/ReceiptScreens/SingleReceipt"
import CameraScreen from "../screens/ReceiptScreens/CameraScreen"
import SummaryScreen from "../screens/ReceiptScreens/SummaryScreen"
import UploadScreen from "../screens/ReceiptScreens/UploadScreen"
import EditReceiptScreen from "../screens/ReceiptScreens/EditReceiptScreen"
import PayPal from "../screens/ReceiptScreens/PayPal"
import CloseReceipt from "../screens/ReceiptScreens/CloseReceipt"
import CloseEvent from "../screens/EventScreens/CloseEvent"
import { AuthContext } from "../context/authContext"

const Stack = createStackNavigator()

const EventNavigator = () => {
  const { currentEventName } = useContext(AuthContext)
  const { currentEventCode } = useContext(AuthContext)
  const { currentReceiptName } = useContext(AuthContext)

  return (
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
        options={{
          ...gatewayHeaderStyles,
          headerTitle: `${currentEventName} (code: ${currentEventCode})`
        }}
      />
      {/* Moved receipt navigation to event navigator below */}
      <Stack.Screen
        name="SingleReceipt"
        component={SingleReceipt}
        // component={SummaryScreen}
        options={{
          ...gatewayHeaderStyles,
          headerTitle: `${currentReceiptName}`
        }}
      />
      <Stack.Screen
        name="SummaryScreen"
        component={SummaryScreen}
        options={{
          ...gatewayHeaderStyles,
          headerTitle: `${currentReceiptName} Summary`
        }}
      />
      <Stack.Screen
        name="SelectCamera"
        component={SelectCamera}
        options={{
          ...gatewayHeaderStyles,
          headerTitle: `${currentReceiptName}`
        }}
      />
      <Stack.Screen
        name="ManualItemEntry"
        component={ManualItemEntry}
        options={{ ...gatewayHeaderStyles, headerTitle: "Manual Item Entry" }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ ...gatewayHeaderStyles, headerTitle: "Scan Receipt" }}
      />
      <Stack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{ ...gatewayHeaderStyles, headerTitle: "Upload Receipt" }}
      />
      <Stack.Screen
        name="PayPal"
        component={PayPal}
        options={{ ...gatewayHeaderStyles, headerTitle: "PayPal" }}
      />
      <Stack.Screen
        name="CloseReceipt"
        component={CloseReceipt}
        options={{ ...gatewayHeaderStyles, headerTitle: "Close Receipt" }}
      />
      <Stack.Screen
        name="CloseEvent"
        component={CloseEvent}
        options={{ ...gatewayHeaderStyles, headerTitle: "Close Event" }}
      />
      <Stack.Screen
        name="EditReceiptScreen"
        component={EditReceiptScreen}
        options={{ ...gatewayHeaderStyles, headerTitle: "EditReceiptScreen" }}
      />
    </Stack.Navigator>
  )
}

const gatewayHeaderStyles = {
  headerTransparent: false,
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTitle: ""
}

export default EventNavigator
