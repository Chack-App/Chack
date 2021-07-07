import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateAnEvent($eventName: String, $description: String) {
    addEvent(eventName: $eventName, description: $description) {
      eventName,
      description
    }
  }
`;
