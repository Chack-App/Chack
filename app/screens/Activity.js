import React, { useContext } from "react"
import { Text, SafeAreaView, StyleSheet, View, ScrollView } from "react-native"
import { AuthContext } from "../context/authContext"
import { GET_PAST_USER_EVENTS } from "../client/queries/userQueries"
import { useQuery } from "@apollo/client"
import AppButton from "../components/AppButton"
import colors from "../config/colors"
import LoadingScreen from "../components/LoadingScreen"

const Activity = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const { setCurrentEventId } = useContext(AuthContext)
  const { setCurrentEventName } = useContext(AuthContext)
  const { setCurrentEventCode } = useContext(AuthContext)

  const { loading, error, data } = useQuery(GET_PAST_USER_EVENTS, {
    variables: { id: user },
    fetchPolicy: "cache-and-network"
  })
  // console.log(data)
  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    console.error(error)
    return <Text>Error</Text>
  }
  if (!data || !user) {
    return <Text>No Data</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.receiptContainer}>
        <Text style={{ ...styles.text, textAlign: "center" }}>PAST EVENTS</Text>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          {data.pastUserEvents.map(event => (
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
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  },
  receiptContainer: {
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

export default Activity
