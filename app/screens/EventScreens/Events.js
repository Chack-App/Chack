import React, { useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native"
import colors from "../../config/colors"
import AppButton from "../../components/AppButton"
import AppSearchInput from "../../components/AppSearchInput"
import { GET_USER_EVENTS } from "../../client/queries/userQueries"
import { JOIN_EVENT } from "../../client/queries/eventQueries";
import { useQuery, useMutation } from "@apollo/client"

// How many characters should each passcode be?

const Events = ({ navigation }) => {
  const [id, setId] = useState(2);
  const [passcode, setPasscode] = useState();
  const { loading, error, data } = useQuery(GET_USER_EVENTS, {
    variables: { id }
  })
  const [joinEvent] = useMutation(JOIN_EVENT);
  console.log(passcode)
  if (loading) {
    return <Text>Loading</Text>
  }
  if (error) {
    return <Text>Error</Text>
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.eventPasscodeContainer}>
          <Text style={styles.text}>Event Passcode</Text>
          <AppSearchInput
            autoCapitalize="characters"
            keyboardTyp="default"
            icon="search"
            color="black"
            returnKeyType="search"
            onChangeText={(passcode)=>setPasscode(passcode)}
          />
          <AppButton
            title="Join"
            onPress={() => joinEvent({
                variables: {passcode}
            })}
          />
          {/* <AppTextInput/> */}
        </View>
        <AppButton
          title="Create Event"
          onPress={() => navigation.navigate("CreateEvent")}
        />
        <Text>___________________________________________________</Text>
        <View style={styles.activeEventList}>
          <Text>ACTIVE EVENTS</Text>
        </View>
        {data.userEvents.map(event => (
          <AppButton key={event.id} title={event.eventName} />
        ))}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.secondary
  },
  eventPasscodeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 15,
    height: 120,
    width: "95%",
    marginVertical: 10
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

export default Events
