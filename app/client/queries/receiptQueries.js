import { gql } from '@apollo/client';

export const GET_RECEIPT = gql`
query GetReceipt($id: ID!) {
  receipt(id: $id) {
    id
    name
    isPaid
    cardDownId
    items{
      name
      price
      isClaimed
      splitBetween
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
