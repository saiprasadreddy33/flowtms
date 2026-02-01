import { ShipmentService } from './shipment.service';
export declare class ShipmentResolver {
    private shipmentService;
    private loader;
    constructor(shipmentService: ShipmentService);
    shipments(page: number, limit: number, sortField?: string, sortDirection?: string, status?: string, carrierName?: string, pickupLocation?: string, user?: any): Promise<string>;
    shipment(id: string, user?: any): Promise<string>;
    addShipment(inputStr: string, user?: any): Promise<string>;
    updateShipment(inputStr: string, user?: any): Promise<string>;
    deleteShipment(id: string, user?: any): Promise<string>;
}
