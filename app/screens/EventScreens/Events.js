import React, { useContext, useState } from "react"
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

  const [id, setId] = useState(user)
  const [passcode, setPasscode] = useState()

  const [joinEvent] = useMutation(JOIN_EVENT, {
    refetchQueries: [{
      query: GET_ACTIVE_USER_EVENTS,
      variables: {id: user}
    }],
    onCompleted(data) {
      console.log(data)
      setCurrentEventId(data.joinEvent.id)
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
          <AppButton
            title="Join"
            onPress={() => {
              joinEvent({
                variables: {
                  passcode,
                  userId: user
                }
              })
              navigation.navigate("SingleEvent")
            }}
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
        {
          data.activeUserEvents.map(event => (
            <AppButton
            key={event.id}
            title={event.eventName}
            eventId={event.id}
            onPress={() => {
              setCurrentEventId(event.id);
              navigation.navigate("SingleEvent");
            }
          }
            />
          ))
        }
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
