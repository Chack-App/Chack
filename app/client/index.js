import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink
} from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"

// create env variable for local IP instead of local host
const httpLink = createHttpLink({
  uri: "http://192.168.1.162:8000/graphql",
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
  uri: "http://192.168.1.162:8000/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
