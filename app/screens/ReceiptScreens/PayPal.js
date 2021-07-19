import React, { Component, useContext } from "react"
import { WebView } from "react-native-webview"
import { AuthContext } from "../../context/authContext"

const PayPal = () => {
  const { currentReceiptPaypalHandle } = useContext(AuthContext)
  const { currentReceiptUserTotal } = useContext(AuthContext)

  return <WebView source={{ uri: `https://www.paypal.com/paypalme/${currentReceiptPaypalHandle}/${currentReceiptUserTotal}` }} />
}

export default PayPal
