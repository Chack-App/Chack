import { gql } from "@apollo/client"

export const GET_EVENT = gql`
  query FetchAnEvent($id: ID!) {
    event(id: $id) {
      id
      eventName
      description
      passcode
      receipts {
        id
        name
        isPaid
        eventId
        cardDownId
      }
      users {
        id
        firstName
        lastName
      }
    }
  }
`

export const GET_ACTIVE_EVENT_RECEIPTS = gql`
  query ActiveEventReceipts($id: ID) {
    activeEventReceipts(id: $id) {
      id
      name
      cardDownId
      isPaid
    }
  }
`

export const GET_PAST_EVENT_RECEIPTS = gql`
  query PastEventReceipts($id: ID!) {
    pastEventReceipts(id: $id) {
      id
      name
      cardDownId
      isPaid
    }
  }
`

export const CREATE_EVENT = gql`
  mutation CreateAnEvent($eventName: String, $description: String, $userId: ID!) {
    addEvent(eventName: $eventName, description: $description, userId: $userId) {
      id
      eventName
      description
    }
  }
`

export const JOIN_EVENT = gql`
  mutation JoinAnEvent($passcode: String, $userId: ID!) {
    joinEvent(passcode: $passcode, userId: $userId) {
      id
      passcode
    }
  }
`
