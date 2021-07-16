import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  TextInput
} from "react-native";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";
import AppTextInput from "../../components/AppTextInput";
import { CREATE_EVENT } from "../../client/queries/eventQueries"
import { GET_ACTIVE_USER_EVENTS } from "../../client/queries/userQueries"
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/authContext"


const CreateEvent = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const { setCurrentEventName } = useContext(AuthContext)
  const { setCurrentEventCode } = useContext(AuthContext)
  const { setCurrentEventId } = useContext(AuthContext)

  const [eventName, setEventName] = useState();
  const [eventDesc, setEventDesc] = useState();

  const [addEvent] = useMutation(CREATE_EVENT, {
      refetchQueries: [{
        query: GET_ACTIVE_USER_EVENTS,
        variables: {id: user}
      }],
      onCompleted(data) {
        setCurrentEventName(data.addEvent.eventName)
        setCurrentEventCode(data.addEvent.passcode)
        setCurrentEventId(data.addEvent.id)
      }
    }
    );

  const handleSubmit = () => {
    if (!eventName) {
      Alert.alert(
        "Event Name Missing",
        "Please enter a name for your event"
      ),
      [{
        text: "OK"
      }]
      return;
    }
    addEvent({variables: {
      eventName,
      eventDesc,
      userId: user
    }});    
    navigation.navigate("SingleEvent");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.text}>Event Name</Text>
            <AppTextInput
              placeholder="Name"
              onChangeText={(name) => setEventName(name)}
            />
          </View>
          <View>
            <Text style={styles.text}>Event Description</Text>
            <AppTextInput
              placeholder="Description"
              multiline={true}
              numberOfLines={4}
              onChangeText={(desc) => setEventDesc(desc)}
            />
          </View>
        </View>
          <AppButton
            title="Create Event"
            onPress={handleSubmit}
          />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.secondary,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 15,
    height: 300,
    width: "95%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CreateEvent;
