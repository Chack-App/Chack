import React, { useContext } from "react"
import colors from "../config/colors"
import { createStackNavigator } from "@react-navigation/stack"
import Activity from "../screens/Activity"



const Stack = createStackNavigator()

const ActivityNavigator = () => {


  return(
  <Stack.Navigator initialRouteName="Activity">
    <Stack.Screen
      name="Activity"
      component={Activity}
      options={{ ...gatewayHeaderStyles, headerTitle: "Activity" }}
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
