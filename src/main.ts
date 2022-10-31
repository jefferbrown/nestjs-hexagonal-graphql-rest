import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigurationService } from './configuration/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: ConfigurationService = app.get(ConfigurationService);
  const config = new DocumentBuilder()
    .setTitle('API Backend Photovogue')
    .setDescription('The  API photovogue backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true, origin: true });
  await app.listen(appConfig.port);
  console.log(`Server started on host: localhost ; port: ${appConfig.port};`);
}
bootstrap();
