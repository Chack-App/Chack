import React, {useContext} from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native'
import colors from '../../config/colors'
import AppButton from '../../components/AppButton'
import { CLOSE_EVENT } from '../../client/queries/eventQueries'
import { GET_ACTIVE_USER_EVENTS, GET_PAST_USER_EVENTS } from '../../client/queries/userQueries'
import { useMutation } from "@apollo/client"
import {AuthContext} from '../../context/authContext'


export default function CloseEvent({navigation}) {
    const { currentEventId } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const [closeEvent] = useMutation(CLOSE_EVENT, {    
      refetchQueries: [
      {
        query: GET_ACTIVE_USER_EVENTS,
        variables: { id: user }
      },
        {
          query: GET_PAST_USER_EVENTS,
          variables:{ id: user}
        }
    ],
        onCompleted(data) {
          // console.log(data)
          navigation.popToTop()
        }
      })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.header}>WARNING</Text>
                <Text></Text>
                <Text style={styles.text}>You are about to permantly close this event. 
                Please make sure that all members of your event are aware that you are about to close this event.
                Once an event is closed it cannot be reopened.</Text>
                <Text></Text>
                <Text style={styles.text}>
                If you are not ready to close this event
                simply hit the back button at the top left of your screen.</Text>
                <Text></Text>
                <Text style={styles.text}>
                Press the button below if you understand and
                wish to close this event</Text>
            </View>
            <AppButton title="close Event" onPress={() => closeEvent({variables: { id: currentEventId }})}></AppButton>
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
  header: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold"
  },
  messageContainer: {
    flexDirection: "column",
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 15,
    flex: 0.75,
    width: "95%",
    marginVertical: 10
  }
})