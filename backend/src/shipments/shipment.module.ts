import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentResolver } from './shipment.resolver';

@Module({
  providers: [ShipmentService, ShipmentResolver],
  exports: [ShipmentService],
})
export class ShipmentModule {}
