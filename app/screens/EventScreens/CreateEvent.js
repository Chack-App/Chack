import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
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
  const [eventName, setEventName] = useState();
  const [eventDesc, setEventDesc] = useState();
  const [addEvent] = useMutation(CREATE_EVENT, {
      refetchQueries: [{
        query: GET_ACTIVE_USER_EVENTS,
        variables: {id: user}
      }]
    }
    // {
    //   update (cache, { data }) {
    //     const newEvent = data?.addEvent;
    //     const existingEvents = cache.readQuery({
    //       query: GET_ACTIVE_USER_EVENTS,
    //     });
    //     console.log(existingEvents);
    //     console.log(newEvent)
    //     cache.writeQuery({
    //       query: GET_ACTIVE_USER_EVENTS,
    //       data: {
    //         activeUserEvents: existingEvents?.activeUserEvents.concat({name: "Hello World"})
    //       }
    //     });
    //   }
    // }
    );
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
            onPress={() => {
              addEvent({variables: {eventName, eventDesc}});
              navigation.navigate("SingleEvent");
            }}
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
