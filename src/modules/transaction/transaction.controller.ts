import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  ValidationPipe,
  Request,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiOperation,
} from "@nestjs/swagger";

import { PageDto } from "../../common/dto/page.dto";
import { IFile } from "../../interfaces";
import { ApiPageOkResponse, ApiFile } from "../../decorators";
import { TransactionService } from "./transaction.service";
import { Multer } from "multer";
import { extname } from "path";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";

@Controller("transaction")
@ApiTags("transaction")
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post("/")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "images", maxCount: 5 },
      { name: "videos", maxCount: 5 },
      { name: "coverImage", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ])
  )
  async create(
    @UploadedFiles() files: { images?: Multer.File[]; videos?: Multer.File[] },
    @Request() req: any,
    @Res() res: any
  ) {
    const record = await this.transactionService.createTransaction(
      req.body,
      files
    );

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Records added",
      data: record,
    });
  }

  @Get("/")
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    type: PageDto,
  })
  async getTransactions(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
    @Res() res: any
  ): Promise<any> {
    const records = await this.transactionService.getTransactions(
      pageOptionsDto
    );
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Transactions record",
      data: records,
    });
  }

  @Get("/count")
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    type: PageDto,
  })
  async getTransactionsCount(
    @Res() res: any
  ): Promise<any> {
    const records = await this.transactionService.getTransactionsCount();
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Total records",
      data: records,
    });
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
    // Handle other file types if needed
    return "unknown";
  }
}
