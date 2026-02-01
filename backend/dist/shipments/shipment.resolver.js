"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const shipment_service_1 = require("./shipment.service");
const shipment_loader_1 = require("./shipment.loader");
const gql_auth_guard_1 = require("../common/guards/gql-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let ShipmentResolver = class ShipmentResolver {
    constructor(shipmentService) {
        this.shipmentService = shipmentService;
        this.loader = new shipment_loader_1.ShipmentLoader(shipmentService);
    }
    async shipments(page, limit, sortField, sortDirection, status, carrierName, pickupLocation, user) {
        const pagination = { page, limit };
        const sort = sortField
            ? { field: sortField, direction: sortDirection || 'ASC' }
            : undefined;
        const filter = status || carrierName || pickupLocation
            ? { status: status, carrierName, pickupLocation }
            : undefined;
        const result = await this.shipmentService.findAll(pagination, sort, filter);
        return JSON.stringify(result);
    }
    async shipment(id, user) {
        const shipment = await this.loader.load(id);
        return JSON.stringify(shipment);
    }
    async addShipment(inputStr, user) {
        const input = JSON.parse(inputStr);
        const shipment = await this.shipmentService.create(input);
        return JSON.stringify(shipment);
    }
    async updateShipment(inputStr, user) {
        const input = JSON.parse(inputStr);
        const shipment = await this.shipmentService.update(input);
        return JSON.stringify(shipment);
    }
    async deleteShipment(id, user) {
        const success = await this.shipmentService.delete(id);
        return JSON.stringify({ success });
    }
};
exports.ShipmentResolver = ShipmentResolver;
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('page', { type: () => Number, defaultValue: 1 })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => Number, defaultValue: 10 })),
    __param(2, (0, graphql_1.Args)('sortField', { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)('sortDirection', { type: () => String, nullable: true })),
    __param(4, (0, graphql_1.Args)('status', { type: () => String, nullable: true })),
    __param(5, (0, graphql_1.Args)('carrierName', { type: () => String, nullable: true })),
    __param(6, (0, graphql_1.Args)('pickupLocation', { type: () => String, nullable: true })),
    __param(7, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ShipmentResolver.prototype, "shipments", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShipmentResolver.prototype, "shipment", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShipmentResolver.prototype, "addShipment", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShipmentResolver.prototype, "updateShipment", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShipmentResolver.prototype, "deleteShipment", null);
exports.ShipmentResolver = ShipmentResolver = __decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [shipment_service_1.ShipmentService])
], ShipmentResolver);
//# sourceMappingURL=shipment.resolver.js.map