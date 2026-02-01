import { Shipment, PaginationInput, SortInput, FilterInput, ShipmentsResponse, CreateShipmentInput, UpdateShipmentInput } from './shipment.types';
export declare class ShipmentService {
    private shipments;
    private idCounter;
    constructor();
    private seedData;
    findAll(pagination: PaginationInput, sort?: SortInput, filter?: FilterInput): Promise<ShipmentsResponse>;
    findById(id: string): Promise<Shipment | null>;
    create(input: CreateShipmentInput): Promise<Shipment>;
    update(input: UpdateShipmentInput): Promise<Shipment | null>;
    delete(id: string): Promise<boolean>;
    findByIds(ids: string[]): Promise<Shipment[]>;
}
