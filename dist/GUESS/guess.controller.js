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
exports.GuessController = void 0;
const common_1 = require("@nestjs/common");
const guess_service_1 = require("./guess.service");
const swagger_1 = require("@nestjs/swagger");
const createGuess_dto_1 = require("./createGuess.dto");
const jwt_auth_guard_1 = require("../JWT/jwt-auth.guard");
let GuessController = class GuessController {
    constructor(guessService) {
        this.guessService = guessService;
    }
    create(data) {
        return this.guessService.create(data);
    }
    findOne(id) {
        return this.guessService.findOne(+id);
    }
    findByUser(id) {
        return this.guessService.findByUser(parseInt(id));
    }
    findByLocation(id) {
        return this.guessService.findByLocation(parseInt(id));
    }
    countGuesses(userId, locationId) {
        return this.guessService.countGuesses(parseInt(userId), parseInt(locationId));
    }
    update(id, data) {
        return this.guessService.update(+id, data);
    }
    remove(id) {
        return this.guessService.remove(+id);
    }
};
exports.GuessController = GuessController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBody)({ type: createGuess_dto_1.CreateGuessDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createGuess_dto_1.CreateGuessDto]),
    __metadata("design:returntype", Promise)
], GuessController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuessController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuessController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('location/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuessController.prototype, "findByLocation", null);
__decorate([
    (0, common_1.Get)('count/:userId/:locationId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('locationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GuessController.prototype, "countGuesses", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GuessController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuessController.prototype, "remove", null);
exports.GuessController = GuessController = __decorate([
    (0, swagger_1.ApiTags)('Guess'),
    (0, common_1.Controller)('guesses'),
    __metadata("design:paramtypes", [guess_service_1.GuessService])
], GuessController);
//# sourceMappingURL=guess.controller.js.map