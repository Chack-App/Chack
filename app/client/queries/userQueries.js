import { gql } from "@apollo/client"

export const GET_USER = gql`
  query User {
    user {
      id
      email
    }
  }
`
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`

// const [id, setId] = useState(1)
// const { loading, error, data } = useQuery(GET_USER, {variables: {id}} );
// if (loading) {
//   return <Text>Loading</Text>
// }
// if (error) {
//   return <Text>Error</Text>
// }

export const GET_USER_EVENTS = gql`
  query UserEvents($id: ID!) {
    userEvents(id: $id) {
      id
      eventName
      description
    }
  }
`

export const GET_ACTIVE_USER_EVENTS = gql`
  query ActiveUserEvents($id: ID!) {
    activeUserEvents(id: $id) {
      id
      eventName
      description
    }
  }
`
export const GET_PAST_USER_EVENTS = gql`
  query PastUserEvents($id: ID!) {
    pastUserEvents(id: $id) {
      id
      eventName
      description
    }
  }
`
