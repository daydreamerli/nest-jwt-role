import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const PREFIX = process.env.PREFIX || '/api';

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(PREFIX);
  await app.listen(PORT || 4000);
  console.log(`Server Application is running on port:  ${PORT}/${PREFIX}`);
}
bootstrap();
