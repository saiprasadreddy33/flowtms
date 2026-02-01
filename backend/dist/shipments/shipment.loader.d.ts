import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment.types';
export declare class ShipmentLoader {
    private shipmentService;
    private loader;
    constructor(shipmentService: ShipmentService);
    load(id: string): Promise<Shipment | null>;
    loadMany(ids: string[]): Promise<(Shipment | null)[]>;
}
