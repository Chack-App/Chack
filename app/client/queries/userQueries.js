import { gql } from '@apollo/client';

export const GET_USER = gql`
query User($id: ID!) {
  user(id: $id) {
      username
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
