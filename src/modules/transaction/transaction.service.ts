import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
  async createTransaction(req: any, files: any): Promise<any> {
    const fileImage = files.images;
    const fileVideos = files.videos;

    const data = {
      name: req.name,
      type: req.type,
      qty: Number(req.qty),
      minPrice: Number(req.minPrice),
      availableToBuy: JSON.parse(req.availableToBuy),
      thumbnail: files.thumbnail[0].originalname,
      coverImage: files.coverImage[0].originalname,
      updated_at: new Date().toISOString(),
      release_date: new Date().toISOString(),
      region: req.region,
      developer: req.developer,
      publisher: req.publisher,
      platform: req.platform,
      priceLimit: JSON.parse(req.priceLimit),
      requirements: JSON.parse(req.requirements),
      categories: JSON.parse(req.categories),
    };

    const transaction = this.transactionRepository.create(data);

    const images: any = [];
    for (const image of fileImage) {
      const imageRecord = new Image();
      imageRecord.url = image.originalname;
      imageRecord.transaction = transaction;
      images.push(imageRecord);
    }

    const videos: any = [];
    for (const video of fileVideos) {
      const type = this.getFileType(video.originalname);
      const videoRecord = new Video();
      videoRecord.type = type;
      videoRecord.url = video.originalname;
      videoRecord.transaction = transaction;
      videos.push(videoRecord);
    }

    const categoryNames = JSON.parse(req.categories);
    const categories: any = [];
    for (const categoryName of categoryNames) {
      const categoryRecord = new Category();
      categoryRecord.name = categoryName;
      categoryRecord.transaction = transaction;
      categories.push(categoryRecord);
    }

    await this.transactionRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(TransactionEntity, transaction);
        await transactionalEntityManager.save(Image, images);
        await transactionalEntityManager.save(Video, videos);
        await transactionalEntityManager.save(Category, categories);
      }
    );

    return transaction;
  }

  async getTransactions(pageOptionsDto: PageOptionsDto): Promise<any> {
    const queryBuilder =
      this.transactionRepository.createQueryBuilder("transactions");

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
    const queryBuilder =
      this.transactionRepository.createQueryBuilder("transactions");

    const totalRecords = await queryBuilder.getCount();
    if (totalRecords >= 1) {
      return totalRecords;
    } else {
      throw new HttpException("Record not found", HttpStatus.NOT_FOUND);
    }
  }

  private getFileType(filename: string): string {
    const extension = extname(filename).toLowerCase();
    if (extension === ".jpg" || extension === ".jpeg" || extension === ".png") {
      return "image";
    } else if (
      extension === ".mp4" ||
      extension === ".avi" ||
      extension === ".mov"
    ) {
      return "video";
    }
    return "unknown";
  }

  private uploadFiles(){
    
  }
}
