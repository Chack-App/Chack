import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import colors from '../config/colors'
import appConstants from '../config/appConstants'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'; 


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{appConstants.appTitle}</Text>

      <View style={styles.newPaymentContainer}>
        <View style={styles.newSplitContainer}>
          <Text style={styles.text}>Direct</Text>
          <TouchableOpacity style={styles.newSplit}>
            <Ionicons name="person" size={48} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.newSplitContainer}>
          <Text style={styles.text}>Split</Text>
              <TouchableOpacity style={styles.newSplit}>  
                  <Ionicons name="people-sharp" size={59} color={colors.primary} />
              </TouchableOpacity>
        </View>
      </View>

      <View style={styles.openSplitsContainer}>
        <Text style={styles.text}>Open Splits</Text>
        <View style={styles.openSplits}></View>
      </View>
      <View style={styles.previousSplitsContainer}>
        <Text style={styles.text}>Previous Activity</Text>
        <View style={styles.previousSplits}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingTop: Constants.statusBarHeight
  },
  title: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 45,
    marginTop: Platform.OS ==='ios' ? 24 : 0
  },
  text: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 25,
  },
  // NEW SPLITS

  newPaymentContainer:{
    width: '100%', // 300
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderWidth: 1, 
    // borderColor: 'purple'
  },
  newSplitContainer: {
    width: Platform.OS === 'android' ? 109 : 113,
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
    // justifyContent:'flex-start',
    marginBottom: 25
  },
  newSplit: {
    width: '100%',
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: colors.secondary,
    justifyContent:'center',
    alignItems: 'center'
  },
  // OPEN SPLITS
  openSplitsContainer: {
    alignItems: "center",
    marginBottom: 25
  },
  openSplits: {
    width: 300,
    height: 100,
    borderWidth: 1,
    backgroundColor: colors.secondary,
  },
  // PREVIOUS SPLITS
  previousSplitsContainer: {
    alignItems: "center",
  },
  previousSplits: {
    width: 300,
    height: 100,
    borderWidth: 1,
    backgroundColor: colors.secondary,
  },
});

export default HomeScreen;
