import { gql } from "@apollo/client"

export const ADD_ITEMS = gql`
  mutation AddItems($items: [ItemInput], $receiptId: ID) {
    addItems(items: $items, receiptId: $receiptId) {
      id
      name
      price
    }
  }
`

export const CLAIM_ITEM = gql`
  mutation ClaimItem($itemId: ID, $userId: ID) {
    claimItem(itemId: $itemId, userId: $userId) {
      name
      isClaimed
    }
  }
`
