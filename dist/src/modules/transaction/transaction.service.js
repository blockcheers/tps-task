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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_transactional_1 = require("typeorm-transactional");
const transaction_entity_1 = require("./transaction.entity");
const image_entity_1 = require("../image/image.entity");
const category_entity_1 = require("../category/category.entity");
const video_entity_1 = require("../video/video.entity");
let TransactionService = class TransactionService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async createTransaction(req) {
        const data = {
            name: req.name,
            type: req.type,
            qty: Number(req.qty),
            minPrice: Number(req.minPrice),
            availableToBuy: JSON.parse(req.availableToBuy),
            thumbnail: req.thumbnail,
            coverImage: req.coverImage,
            updated_at: new Date().toISOString(),
            release_date: new Date().toISOString(),
            region: req.region,
            developer: req.developer,
            publisher: req.publisher,
            platform: req.platform,
            priceLimit: req.priceLimit,
            requirements: req.requirements,
            categories: req.categories,
        };
        const transaction = this.transactionRepository.create(data);
        const categoryNames = req.categories;
        const categories = categoryNames.map((categoryName) => ({
            name: categoryName,
            transaction,
        }));
        await this.transactionRepository.manager.transaction(async (transactionalEntityManager) => {
            await Promise.all([
                transactionalEntityManager.save(transaction_entity_1.TransactionEntity, transaction),
                transactionalEntityManager.save(image_entity_1.Image, req.images),
                transactionalEntityManager.save(video_entity_1.Video, req.videos),
                transactionalEntityManager.insert(category_entity_1.Category, categories),
            ]);
        });
        return transaction;
    }
    async getTransactions(pageOptionsDto) {
        const queryBuilder = this.transactionRepository.createQueryBuilder("transactions");
        if (!!pageOptionsDto.order) {
            queryBuilder.orderBy("transactions.createdAt", pageOptionsDto.order);
        }
        const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
        if (items.length > 0) {
            return items.toPageDto(pageMetaDto);
        }
        else {
            throw new common_1.HttpException("Record not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getTransactionsCount() {
        const queryBuilder = this.transactionRepository.createQueryBuilder("transactions");
        const totalRecords = await queryBuilder.getCount();
        if (totalRecords >= 1) {
            return totalRecords;
        }
        else {
            throw new common_1.HttpException("Record not found", common_1.HttpStatus.NOT_FOUND);
        }
    }
};
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionService.prototype, "createTransaction", null);
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map