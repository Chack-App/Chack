import { gql } from "@apollo/client"

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
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
