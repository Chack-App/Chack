/* eslint-disable react/display-name */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Friends from "../screens/Friends";
import CreateTransaction from "../screens/CreateTransactionScreen";
import Activity from "../screens/Activity";
import Account from "../screens/Account";
import EventNavigator from "./EventNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator initialRouteName="Events" screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Events') iconName = focused ? 'calendar' : 'calendar-outline';
      else if (route.name === 'Friends') iconName = focused ? 'ios-people-circle' : 'ios-people-circle-outline';
      else if (route.name === 'New Transaction') iconName = focused ? 'add-circle' : 'add-circle-outline';
      else if (route.name === 'Activity') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
      else if (route.name === 'Account') iconName = focused ? 'person-circle' : 'person-circle-outline';

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  }}>
    <Tab.Screen name="Friends" component={Friends} />
    <Tab.Screen name="Events" component={EventNavigator}/>
    <Tab.Screen name="New Transaction" component={CreateTransaction} />
    <Tab.Screen name="Activity" component={Activity} />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

export default AppNavigator;
