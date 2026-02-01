import { useQuery, useMutation } from '@apollo/client';
import {
  GET_SHIPMENTS,
  GET_SHIPMENT,
  ADD_SHIPMENT,
  UPDATE_SHIPMENT,
  DELETE_SHIPMENT,
} from '../graphql/queries';
import {
  ShipmentsResponse,
  Shipment,
  CreateShipmentInput,
  UpdateShipmentInput,
} from '../types';

interface UseShipmentsOptions {
  page: number;
  limit: number;
  sortField?: string;
  sortDirection?: string;
  status?: string;
  carrierName?: string;
  pickupLocation?: string;
}

export function useShipments(options: UseShipmentsOptions) {
  const { data, loading, error, refetch } = useQuery(GET_SHIPMENTS, {
    variables: options,
    fetchPolicy: 'network-only',
  });

  const shipmentsResponse: ShipmentsResponse | null = data?.shipments
    ? JSON.parse(data.shipments)
    : null;

  return { data: shipmentsResponse, loading, error, refetch };
}

export function useShipment(id: string) {
  const { data, loading, error } = useQuery(GET_SHIPMENT, {
    variables: { id },
    skip: !id,
  });

  const shipment: Shipment | null = data?.shipment ? JSON.parse(data.shipment) : null;

  return { data: shipment, loading, error };
}

export function useAddShipment() {
  const [addShipmentMutation, { loading, error }] = useMutation(ADD_SHIPMENT);

  const addShipment = async (input: CreateShipmentInput): Promise<Shipment> => {
    const result = await addShipmentMutation({
      variables: { input: JSON.stringify(input) },
    });
    return JSON.parse(result.data.addShipment);
  };

  return { addShipment, loading, error };
}

export function useUpdateShipment() {
  const [updateShipmentMutation, { loading, error }] = useMutation(UPDATE_SHIPMENT);

  const updateShipment = async (input: UpdateShipmentInput): Promise<Shipment> => {
    const result = await updateShipmentMutation({
      variables: { input: JSON.stringify(input) },
    });
    return JSON.parse(result.data.updateShipment);
  };

  return { updateShipment, loading, error };
}

export function useDeleteShipment() {
  const [deleteShipmentMutation, { loading, error }] = useMutation(DELETE_SHIPMENT);

  const deleteShipment = async (id: string): Promise<boolean> => {
    const result = await deleteShipmentMutation({
      variables: { id },
    });
    const response = JSON.parse(result.data.deleteShipment);
    return response.success;
  };

  return { deleteShipment, loading, error };
}
