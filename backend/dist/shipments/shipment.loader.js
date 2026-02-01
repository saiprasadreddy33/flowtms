"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
class ShipmentLoader {
    constructor(shipmentService) {
        this.shipmentService = shipmentService;
        this.loader = new dataloader_1.default(async (ids) => {
            const shipments = await this.shipmentService.findByIds([...ids]);
            const shipmentMap = new Map(shipments.map((s) => [s.id, s]));
            return ids.map((id) => shipmentMap.get(id) || null);
        });
    }
    load(id) {
        return this.loader.load(id);
    }
    loadMany(ids) {
        return this.loader.loadMany(ids);
    }
}
exports.ShipmentLoader = ShipmentLoader;
//# sourceMappingURL=shipment.loader.js.map