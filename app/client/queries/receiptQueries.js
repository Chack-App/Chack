import { gql } from "@apollo/client"

export const GET_RECEIPT = gql`
  query GetReceipt($id: ID!) {
    receipt(id: $id) {
      id
      name
      isPaid
      isApproved
      cardDownId
      tax
      tip
      cardDownHandle
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
  mutation SetApproved($id: ID!, $tax: Int, $tip: Int) {
    setApproved(id: $id, tax: $tax, tip: $tip) {
      tax
      tip
      id
      isApproved
    }
  }
`

export const CLOSE_RECEIPT = gql`
mutation CloseReceipt($id: ID!){
  closeReceipt(id: $id){
    id
    name
    isPaid
  }
}
`
