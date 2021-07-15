import { gql } from "@apollo/client"

export const GET_USER = gql`
  query User($id: ID) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      payPalMe
    }
  }
`
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      firstName
      email
      lastName
      id
      payPalMe
    }
  }
`

export const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $payPalMe: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      payPalMe: $payPalMe
    ) {
      token
      email
      id
      firstName
      lastName
      payPalMe
    }
  }
`
export const UPDATE_USER = gql`
  mutation updateUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $payPalMe: String!
  ) {
    updateUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      payPalMe: $payPalMe
    ) {
      email
      firstName
      lastName
      payPalMe
    }
  }
`

// const [id, setId] = useState(1)
// const { loading, error, data } = useQuery(GET_USER, {variables: {id}} );
// if (loading) {
//   return null
// }
// if (error) {
//   return <Text>Error</Text>
// }

export const GET_USER_EVENTS = gql`
  query UserEvents($id: ID) {
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
      passcode
    }
  }
`
export const GET_PAST_USER_EVENTS = gql`
  query PastUserEvents($id: ID!) {
    pastUserEvents(id: $id) {
      id
      eventName
      description
      passcode
    }
  }
`
