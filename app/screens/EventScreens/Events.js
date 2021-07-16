import React, { useContext, useState } from "react"
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ScrollView
} from "react-native"
import colors from "../../config/colors"
import AppButton from "../../components/AppButton"
import ReceiptButton from "../../components/AppButton"
import AppSearchInput from "../../components/AppSearchInput"
import { GET_ACTIVE_USER_EVENTS } from "../../client/queries/userQueries"
import { GET_USER_EVENTS } from "../../client/queries/userQueries"
import { JOIN_EVENT, GET_EVENT } from "../../client/queries/eventQueries"
import { useQuery, useMutation } from "@apollo/client"
import { AuthContext } from "../../context/authContext"

// How many characters should each passcode be?

const Events = ({ navigation }) => {
  // const { token } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const { setCurrentEventId } = useContext(AuthContext)
  const { setCurrentEventName } = useContext(AuthContext)
  const { setCurrentEventCode } = useContext(AuthContext)

  const [id, setId] = useState(user)
  const [passcode, setPasscode] = useState("")

  const [joinEvent] = useMutation(JOIN_EVENT, {
    refetchQueries: [
      {
        query: GET_ACTIVE_USER_EVENTS,
        variables: { id: user }
      }
    ],
    onCompleted(data) {
      setCurrentEventId(data.joinEvent.id)
      setCurrentEventName(data.joinEvent.eventName)
      setCurrentEventCode(data.joinEvent.passcode)
      navigation.navigate("SingleEvent")
    },
    onError() {
      Alert.alert("Invalid Passcode", "Please check your passcode"),
        [
          {
            text: "OK"
          }
        ]
    }
  })

  const { loading, error, data } = useQuery(GET_ACTIVE_USER_EVENTS, {
    variables: { id: user },
    fetchPolicy: "cache-and-network"
  })
  // console.log(data)
  if (loading) {
    return <Text>Loading</Text>
  }
  if (error) {
    console.error(error)
    return <Text>Error</Text>
  }
  if (!data || !user) {
    return <Text>No Data</Text>
  }

  const handleJoin = () => {
    if (passcode.length !== 4) {
      Alert.alert("Invalid Passcode", "Please enter 4 digit passcode"),
        [
          {
            text: "OK"
          }
        ]
    } else {
      joinEvent({
        variables: {
          passcode,
          userId: user
        }
      })
    }
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
            onChangeText={passcode => setPasscode(passcode)}
          />
          <AppButton title="Join" onPress={handleJoin} />
          {/* <AppTextInput/> */}
        </View>
        <AppButton
          title="Create Event"
          onPress={() => navigation.navigate("CreateEvent")}
        />
        <View style={styles.activeEventsList}>
          <Text style={{ ...styles.text, textAlign: "center" }}>
            ACTIVE EVENTS
          </Text>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            {data.activeUserEvents.map(event => {
              return (
                <AppButton
                  key={event.id}
                  title={event.eventName}
                  eventId={event.id}
                  borderWidth={1}
                  onPress={() => {
                    setCurrentEventId(event.id)
                    setCurrentEventName(event.eventName)
                    setCurrentEventCode(event.passcode)
                    navigation.navigate("SingleEvent")
                  }}
                />
              )
            })}
          </ScrollView>
        </View>
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
    flexDirection: "column",
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 15,
    flex: 1,
    width: "95%",
    marginVertical: 10
  }
})

export default Events
