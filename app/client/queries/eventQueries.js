import { gql } from '@apollo/client';

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
  }
}
`

export const GET_ACTIVE_EVENT_RECEIPTS = gql`
query ActiveEventReceipts($id: ID!){
  activeEventReceipts(id: $id){  
  	id
    name
    cardDownId
  	isPaid
  }
 }
 `

 export const GET_PAST_EVENT_RECEIPTS = gql`
 query PastEventReceipts($id: ID!){
  pastEventReceipts(id: $id){  
  	id
    name
    cardDownId
  	isPaid
  }
 }
 `

export const CREATE_EVENT = gql`
  mutation CreateAnEvent($eventName: String, $description: String) {
    addEvent(eventName: $eventName, description: $description) {
      eventName,
      description
    }
  }
`;

export const JOIN_EVENT = gql`
  mutation JoinAnEvent($passcode: String) {
    joinEvent(passcode: $passcode) {
      passcode
  }
}
`;
