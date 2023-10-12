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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_dto_1 = require("../../common/dto/page.dto");
const decorators_1 = require("../../decorators");
const transaction_service_1 = require("./transaction.service");
const path_1 = require("path");
const page_options_dto_1 = require("../../common/dto/page-options.dto");
const transaction_dto_1 = require("./transaction.dto");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async create(req, res) {
        const record = await this.transactionService.createTransaction(req.body);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: 'Records added',
            data: record,
        });
    }
    async getTransactions(pageOptionsDto, res) {
        const records = await this.transactionService.getTransactions(pageOptionsDto);
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Transactions record",
            data: records,
        });
    }
    async getTransactionsCount(res) {
        const records = await this.transactionService.getTransactionsCount();
        res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: "Total records",
            data: records,
        });
    }
    getFileType(filename) {
        const extension = (0, path_1.extname)(filename).toLowerCase();
        if (extension === ".jpg" || extension === ".jpeg" || extension === ".png") {
            return "image";
        }
        else if (extension === ".mp4" ||
            extension === ".avi" ||
            extension === ".mov") {
            return "video";
        }
        return "unknown";
    }
};
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Registration of Type',
        type: transaction_dto_1.TransactionDto,
    }),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiPageOkResponse)({
        type: page_dto_1.PageDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_options_dto_1.PageOptionsDto, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("/count"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.ApiPageOkResponse)({
        type: page_dto_1.PageDto,
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionsCount", null);
TransactionController = __decorate([
    (0, common_1.Controller)("transaction"),
    (0, swagger_1.ApiTags)("transaction"),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map