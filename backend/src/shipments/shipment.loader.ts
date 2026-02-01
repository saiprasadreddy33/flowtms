import DataLoader from 'dataloader';
import { ShipmentService } from './shipment.service';
import { Shipment } from './shipment.types';

export class ShipmentLoader {
  private loader: DataLoader<string, Shipment | null>;

  constructor(private shipmentService: ShipmentService) {
    this.loader = new DataLoader<string, Shipment | null>(
      async (ids: readonly string[]) => {
        const shipments = await this.shipmentService.findByIds([...ids]);
        const shipmentMap = new Map(shipments.map((s) => [s.id, s]));
        return ids.map((id) => shipmentMap.get(id) || null);
      },
    );
  }

  load(id: string): Promise<Shipment | null> {
    return this.loader.load(id);
  }

  loadMany(ids: string[]): Promise<(Shipment | null)[]> {
    return this.loader.loadMany(ids) as Promise<(Shipment | null)[]>;
  }
}
