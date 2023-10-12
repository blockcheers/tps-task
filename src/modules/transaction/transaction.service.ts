import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Transactional } from "typeorm-transactional";
import { TransactionEntity } from "./transaction.entity";
import { Image } from "../image/image.entity";
import { Category } from "../category/category.entity";
import { Video } from "../video/video.entity";
import { extname } from "path";
import { PageOptionsDto } from "../../common/dto/page-options.dto";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>
  ) {}

  @Transactional()
  async createTransaction(req: any): Promise<any> {
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

    await this.transactionRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        await Promise.all([
          transactionalEntityManager.save(TransactionEntity, transaction),
          transactionalEntityManager.save(Image, req.images),
          transactionalEntityManager.save(Video, req.videos),
          transactionalEntityManager.insert(Category, categories),
        ]);
      }
    );

    return transaction;
  }
  async getTransactions(pageOptionsDto: PageOptionsDto): Promise<any> {
    const queryBuilder = this.transactionRepository.createQueryBuilder(
      "transactions"
    );

    if (!!pageOptionsDto.order) {
      queryBuilder.orderBy("transactions.createdAt", pageOptionsDto.order);
    }

    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    if (items.length > 0) {
      return items.toPageDto(pageMetaDto);
    } else {
      throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
    }
  }

  async getTransactionsCount(): Promise<any> {
    const queryBuilder = this.transactionRepository.createQueryBuilder(
      "transactions"
    );

    const totalRecords = await queryBuilder.getCount();
    if (totalRecords >= 1) {
      return totalRecords;
    } else {
      throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
    }
  }
}
