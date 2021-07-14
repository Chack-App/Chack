import { gql } from "@apollo/client"

export const GET_RECEIPT = gql`
  query GetReceipt($id: ID!) {
    receipt(id: $id) {
      id
      name
      isPaid
      isApproved
      cardDownId
      items {
        id
        name
        price
        isClaimed
        splitBetween
        users {
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

export const SET_APPROVED = gql`
  mutation SetApproved($id: ID!) {
    setApproved(id: $id) {
      id
      isApproved
    }
  }
`
