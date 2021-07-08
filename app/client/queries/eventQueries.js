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
