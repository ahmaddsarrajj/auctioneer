import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { i18nValidationErrorFactory } from 'nestjs-i18n';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: i18nValidationErrorFactory,
    }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  // app.useGlobalFilters(new PrismaExceptionFilter());
  // app.useGlobalInterceptors(new SuccessCodeInterceptor());
  
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(+process.env.PORT);
}
bootstrap();
