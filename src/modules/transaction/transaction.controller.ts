import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  ValidationPipe,
  Request,
  Header,
  Version,
} from "@nestjs/common";
import {
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { PageDto } from "../../common/dto/page.dto";
import { ApiPageOkResponse} from "../../decorators";
import { TransactionService } from "./transaction.service";
import { extname } from "path";
import { PageOptionsDto } from "../../common/dto/page-options.dto";
import { TransactionDto } from "./transaction.dto";

@Controller("transaction")
@ApiTags("transaction")
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Version("1")
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Registration of Type',
    type: TransactionDto,
  })
  @Header('Content-Type', 'application/json')
  async create(
    @Request() req: any,
    @Res() res: any,
  ) {
    const record = await this.transactionService.createTransaction(req.body);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Records added',
      data: record,
    });
  }

  @Version("1")
  @Get()
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

  @Version("1")
  @Get("/count")
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    type: PageDto,
  })
  async getTransactionsCount(@Res() res: any): Promise<any> {
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
