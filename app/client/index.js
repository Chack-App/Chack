import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink
} from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
  credentials: "same-origin"
})

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await AsyncStorage.getItem("TOKEN")
  console.log(token, "TOKEN")
  operation.setContext({
    headers: {
      authorization: token
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
