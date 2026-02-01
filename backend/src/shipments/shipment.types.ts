export interface Shipment {
  id: string;
  shipperName: string;
  carrierName: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  deliveryDate: string;
  status: ShipmentStatus;
  rate: number;
  currency: string;
  trackingNumber: string;
  createdAt: string;
  updatedAt: string;
}

export enum ShipmentStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface PaginationInput {
  page: number;
  limit: number;
}

export interface SortInput {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface FilterInput {
  status?: ShipmentStatus;
  carrierName?: string;
  pickupLocation?: string;
}

export interface ShipmentsResponse {
  shipments: Shipment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateShipmentInput {
  shipperName: string;
  carrierName: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  deliveryDate: string;
  status: ShipmentStatus;
  rate: number;
  currency: string;
  trackingNumber: string;
}

export interface UpdateShipmentInput {
  id: string;
  shipperName?: string;
  carrierName?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  pickupDate?: string;
  deliveryDate?: string;
  status?: ShipmentStatus;
  rate?: number;
  currency?: string;
  trackingNumber?: string;
}
