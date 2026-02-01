import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentLoader } from './shipment.loader';
import {
  Shipment,
  ShipmentsResponse,
  PaginationInput,
  SortInput,
  FilterInput,
  CreateShipmentInput,
  UpdateShipmentInput,
} from './shipment.types';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
export class ShipmentResolver {
  private loader: ShipmentLoader;

  constructor(private shipmentService: ShipmentService) {
    this.loader = new ShipmentLoader(shipmentService);
  }

  @Query(() => String)
  async shipments(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @Args('sortField', { type: () => String, nullable: true }) sortField?: string,
    @Args('sortDirection', { type: () => String, nullable: true }) sortDirection?: string,
    @Args('status', { type: () => String, nullable: true }) status?: string,
    @Args('carrierName', { type: () => String, nullable: true }) carrierName?: string,
    @Args('pickupLocation', { type: () => String, nullable: true }) pickupLocation?: string,
    @CurrentUser() user?: any,
  ): Promise<string> {
    const pagination: PaginationInput = { page, limit };

    const sort: SortInput | undefined = sortField
      ? { field: sortField, direction: (sortDirection as 'ASC' | 'DESC') || 'ASC' }
      : undefined;

    const filter: FilterInput | undefined =
      status || carrierName || pickupLocation
        ? { status: status as any, carrierName, pickupLocation }
        : undefined;

    const result = await this.shipmentService.findAll(pagination, sort, filter);
    return JSON.stringify(result);
  }

  @Query(() => String)
  async shipment(
    @Args('id') id: string,
    @CurrentUser() user?: any,
  ): Promise<string> {
    const shipment = await this.loader.load(id);
    return JSON.stringify(shipment);
  }

  @Mutation(() => String)
  @Roles('admin')
  async addShipment(
    @Args('input') inputStr: string,
    @CurrentUser() user?: any,
  ): Promise<string> {
    const input: CreateShipmentInput = JSON.parse(inputStr);
    const shipment = await this.shipmentService.create(input);
    return JSON.stringify(shipment);
  }

  @Mutation(() => String)
  @Roles('admin')
  async updateShipment(
    @Args('input') inputStr: string,
    @CurrentUser() user?: any,
  ): Promise<string> {
    const input: UpdateShipmentInput = JSON.parse(inputStr);
    const shipment = await this.shipmentService.update(input);
    return JSON.stringify(shipment);
  }

  @Mutation(() => String)
  @Roles('admin')
  async deleteShipment(
    @Args('id') id: string,
    @CurrentUser() user?: any,
  ): Promise<string> {
    const success = await this.shipmentService.delete(id);
    return JSON.stringify({ success });
  }
}
