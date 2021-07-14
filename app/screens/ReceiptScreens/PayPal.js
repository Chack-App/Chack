import React, { Component } from "react"
import { WebView } from "react-native-webview"
import { useContext } from "react/cjs/react.development"
import { AuthContext } from "../../context/authContext"

const PayPal = () => {
  const { currentReceiptPaypalHandle } = useContext(AuthContext)
  const { currentReceiptUserTotal } = useContext(AuthContext)

  return <WebView source={{ uri: "https://reactnative.dev/" }} />
}

export default PayPal
