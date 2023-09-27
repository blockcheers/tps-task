import "./boilerplate.polyfill";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import { Category } from "./modules/category/category.entity";
import { Image } from "./modules/image/image.entity";
import { Video } from "./modules/video/video.entity";
import { TransactionEntity } from "./modules/transaction/transaction.entity";
import { TransactionModule } from "./modules/transaction/transaction.module";

import { ApiConfigService } from "./shared/services/api-config.service";
import { SharedModule } from "./shared/shared.module";

@Module({
  imports: [
    TransactionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => {
        const postgresConfig = configService.postgresConfig;

        return {
          ...postgresConfig,
          entities: [Category, Image, TransactionEntity, Video],
          //   logging: ["error"],
        };
      },
      inject: [ApiConfigService],
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error("Invalid options passed");
        }

        return await addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  providers: [],
})
export class AppModule {}
