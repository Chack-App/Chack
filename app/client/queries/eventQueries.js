import { gql } from '@apollo/client';

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
`
