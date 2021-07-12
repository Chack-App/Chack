import { gql } from "@apollo/client";

export const ADD_ITEMS = gql`
  mutation AddItems($items: [ItemInput], $receiptId: ID) {
    addItems(items: $items, receiptId: $receiptId) {
      id
      name
      price
    }
  }
`
