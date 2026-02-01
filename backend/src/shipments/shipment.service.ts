import { Injectable } from '@nestjs/common';
import {
  Shipment,
  ShipmentStatus,
  PaginationInput,
  SortInput,
  FilterInput,
  ShipmentsResponse,
  CreateShipmentInput,
  UpdateShipmentInput,
} from './shipment.types';

@Injectable()
export class ShipmentService {
  private shipments: Shipment[] = [];
  private idCounter = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    const carriers = ['FedEx', 'UPS', 'DHL', 'USPS', 'BlueDart'];
    const shippers = [
      'Acme Corp',
      'Global Trade Inc',
      'Tech Solutions',
      'MegaMart',
      'Fashion Hub',
    ];
    const locations = [
      'New York, NY',
      'Los Angeles, CA',
      'Chicago, IL',
      'Houston, TX',
      'Phoenix, AZ',
      'Philadelphia, PA',
      'San Antonio, TX',
      'San Diego, CA',
      'Dallas, TX',
      'San Jose, CA',
    ];
    const statuses = Object.values(ShipmentStatus);

    for (let i = 0; i < 50; i++) {
      const pickupDate = new Date(2026, 0, Math.floor(Math.random() * 28) + 1);
      const deliveryDate = new Date(pickupDate);
      deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 7) + 1);

      this.shipments.push({
        id: String(this.idCounter++),
        shipperName: shippers[Math.floor(Math.random() * shippers.length)],
        carrierName: carriers[Math.floor(Math.random() * carriers.length)],
        pickupLocation: locations[Math.floor(Math.random() * locations.length)],
        deliveryLocation: locations[Math.floor(Math.random() * locations.length)],
        pickupDate: pickupDate.toISOString(),
        deliveryDate: deliveryDate.toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        rate: Math.floor(Math.random() * 5000) + 500,
        currency: 'USD',
        trackingNumber: `TRK${String(i + 1).padStart(8, '0')}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  async findAll(
    pagination: PaginationInput,
    sort?: SortInput,
    filter?: FilterInput,
  ): Promise<ShipmentsResponse> {
    let filtered = [...this.shipments];

    if (filter) {
      if (filter.status) {
        filtered = filtered.filter((s) => s.status === filter.status);
      }
      if (filter.carrierName) {
        filtered = filtered.filter((s) =>
          s.carrierName.toLowerCase().includes(filter.carrierName!.toLowerCase()),
        );
      }
      if (filter.pickupLocation) {
        filtered = filtered.filter((s) =>
          s.pickupLocation.toLowerCase().includes(filter.pickupLocation!.toLowerCase()),
        );
      }
    }

    if (sort) {
      filtered.sort((a, b) => {
        const aVal = a[sort.field as keyof Shipment];
        const bVal = b[sort.field as keyof Shipment];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sort.direction === 'ASC' ? aVal - bVal : bVal - aVal;
        }

        const aStr = String(aVal);
        const bStr = String(bVal);
        return sort.direction === 'ASC'
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.limit);
    const start = (pagination.page - 1) * pagination.limit;
    const shipments = filtered.slice(start, start + pagination.limit);

    return {
      shipments,
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages,
    };
  }

  async findById(id: string): Promise<Shipment | null> {
    return this.shipments.find((s) => s.id === id) || null;
  }

  async create(input: CreateShipmentInput): Promise<Shipment> {
    const shipment: Shipment = {
      id: String(this.idCounter++),
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.shipments.push(shipment);
    return shipment;
  }

  async update(input: UpdateShipmentInput): Promise<Shipment | null> {
    const index = this.shipments.findIndex((s) => s.id === input.id);
    if (index === -1) {
      return null;
    }

    const updated = {
      ...this.shipments[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };

    this.shipments[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.shipments.findIndex((s) => s.id === id);
    if (index === -1) {
      return false;
    }
    this.shipments.splice(index, 1);
    return true;
  }

  async findByIds(ids: string[]): Promise<Shipment[]> {
    return this.shipments.filter((s) => ids.includes(s.id));
  }
}
