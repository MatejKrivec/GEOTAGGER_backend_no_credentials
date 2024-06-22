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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuessService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../PRISMA/prisma.service");
let GuessService = class GuessService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.guess.create({ data });
    }
    async findAll() {
        return this.prisma.guess.findMany();
    }
    async findByLocation(id) {
        return this.prisma.guess.findMany({ where: { LocationID: id } });
    }
    async findByUser(id) {
        return this.prisma.guess.findMany({ where: { UserID: id } });
    }
    async findOne(id) {
        return this.prisma.guess.findUnique({ where: { id } });
    }
    async update(id, data) {
        return this.prisma.guess.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.guess.delete({ where: { id } });
    }
    async countGuesses(userId, locationId) {
        return this.prisma.guess.count({
            where: {
                UserID: userId,
                LocationID: locationId,
            },
        });
    }
};
exports.GuessService = GuessService;
exports.GuessService = GuessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GuessService);
//# sourceMappingURL=guess.service.js.map