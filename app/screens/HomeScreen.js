import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import colors from '../config/colors'
import appConstants from '../config/appConstants'
import Constants from 'expo-constants'
import { AntDesign } from '@expo/vector-icons'; 


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{appConstants.appTitle}</Text>
      <View style={styles.newSplitContainer}>
        <Text style={styles.text}>New Split</Text>
        <View style={styles.newSplit}>
            <TouchableOpacity>
                <AntDesign name="pluscircleo" size={48} color="dodgerblue" />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.openSplitsContainer}>
        <Text style={styles.text}>Open Splits</Text>
        <View style={styles.openSplits}></View>
      </View>
      <View style={styles.previousSplitsContainer}>
        <Text style={styles.text}>Previous Splits</Text>
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
  newSplitContainer: {
    alignItems: "center",
    marginBottom: 25
  },
  newSplit: {
    width: 300,
    height: 100,
    borderWidth: 1,
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
