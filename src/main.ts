import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { ExpressAdapter } from "@nestjs/platform-express";
import compression from "compression";
import { middleware as expressCtx } from "express-ctx";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { initializeTransactionalContext } from "typeorm-transactional";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filters/bad-request.filter";
import { QueryFailedFilter } from "./filters/query-failed.filter";
import { setupSwagger } from "./setup-swagger";
import { ApiConfigService } from "./shared/services/api-config.service";
import { SharedModule } from "./shared/shared.module";
import cluster from "node:cluster";
import os from "node:os";

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true }
  );
  app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.use(helmet());
  // app.setGlobalPrefix('/api'); use api as global prefix if you don't have subdomain
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 130000, // limit each IP to 100000 requests per windowMs
    })
  );
  app.use(compression());
  app.use(morgan("combined"));
  app.enableVersioning();

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector)
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    })
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  // only start nats if it is enabled
  if (configService.natsEnabled) {
    const natsConfig = configService.natsConfig;
    app.connectMicroservice({
      transport: Transport.NATS,
      options: {
        url: `nats://${natsConfig.host}:${natsConfig.port}`,
        queue: "main_service",
      },
    });

    await app.startAllMicroservices();
  }

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }

  app.use(expressCtx);

  // Starts listening for shutdown hooks
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  const port = process.env.PORT || configService.appConfig.port;
  await app.listen(port);

  console.info(`server running on ${await app.getUrl()}`);

  return app;
}

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  void bootstrap();
}

// void bootstrap();
