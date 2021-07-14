import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink
} from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { DEV_SERVER, PRODUCTION_SERVER } from "../../secrets"

const serverUri = (process.env.NODE_ENV === "development") ? DEV_SERVER : PRODUCTION_SERVER

// create env variable for local IP instead of local host
const httpLink = createHttpLink({
  uri: serverUri,
  credentials: "same-origin"
})

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await AsyncStorage.getItem("TOKEN")
  operation.setContext({
    headers: {
      authorization: token
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  uri: serverUri,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
