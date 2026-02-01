import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const GET_SHIPMENTS = gql`
  query GetShipments(
    $page: Float!
    $limit: Float!
    $sortField: String
    $sortDirection: String
    $status: String
    $carrierName: String
    $pickupLocation: String
  ) {
    shipments(
      page: $page
      limit: $limit
      sortField: $sortField
      sortDirection: $sortDirection
      status: $status
      carrierName: $carrierName
      pickupLocation: $pickupLocation
    )
  }
`;

export const GET_SHIPMENT = gql`
  query GetShipment($id: String!) {
    shipment(id: $id)
  }
`;

export const ADD_SHIPMENT = gql`
  mutation AddShipment($input: String!) {
    addShipment(input: $input)
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($input: String!) {
    updateShipment(input: $input)
  }
`;

export const DELETE_SHIPMENT = gql`
  mutation DeleteShipment($id: String!) {
    deleteShipment(id: $id)
  }
`;
