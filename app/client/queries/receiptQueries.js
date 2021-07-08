import { gql } from '@apollo/client';

export const GET_RECEIPT = gql`
query GetReceipt($id: ID!) {
  receipt(id: $id) {
    id
    name
    isPaid
    cardDownId
  }
}
`

export const CREATE_RECEIPT = gql`
mutation AddReceipt($cardDownId: Int, $eventId: Int, $name: String) {
  addReceipt(cardDownId: $cardDownId, eventId: $eventId, name: $name) {
    cardDownId
    eventId
    name
  }
}
`
