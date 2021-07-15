import React, {useContext} from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native'
import colors from '../../config/colors'
import AppButton from '../../components/AppButton'
import { CLOSE_RECEIPT } from '../../client/queries/receiptQueries'
import { useMutation } from "@apollo/client"
import {AuthContext} from '../../context/authContext'


export default function CloseReceipt({navigation}) {
    const { currentReceiptId } = useContext(AuthContext)
    console.log(navigation)
    const [closeReceipt] = useMutation(CLOSE_RECEIPT, {
        onCompleted(data) {
          console.log(data)
          navigation.popToTop()
        }
      })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.header}>WARNING</Text>
                <Text></Text>
                <Text style={styles.text}>You are about to permantly close this receipt. 
                Please make sure that you have received payment from all event members before continuing.
                Chack is not responsible for any uncollected payments.</Text>
                <Text></Text>
                <Text style={styles.text}>
                If you are not ready to close this receipt
                simply hit the back button at the top left of your screen.</Text>
                <Text></Text>
                <Text style={styles.text}>
                Press the button below if you understand and
                wish to close this receipt</Text>
            </View>
            <AppButton title="close receipt" onPress={() => closeReceipt({variables: { id: currentReceiptId }})}></AppButton>
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