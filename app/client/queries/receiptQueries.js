import { gql } from "@apollo/client"

export const GET_RECEIPT = gql`
  query GetReceipt($id: ID!) {
    receipt(id: $id) {
      id
      name
      isPaid
      cardDownId
      items {
        id
        name
        price
        isClaimed
        splitBetween
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const CREATE_RECEIPT = gql`
  mutation AddReceipt($cardDownId: Int, $eventId: Int, $name: String) {
    addReceipt(cardDownId: $cardDownId, eventId: $eventId, name: $name) {
      id
      cardDownId
      eventId
      name
    }
  }
`
