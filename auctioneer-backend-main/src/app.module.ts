import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import { appController } from './app.controller';
import { UserModule } from './entities/user/user.module';
import { CategoryModule } from './entities/category/category.module';
import { RoleModule } from './entities/role/role.module';
import { AuthzModule } from './authz/authz.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { RatingModule } from './entities/rating/rating.module';
import { ItemModule } from './entities/item/item.module';
import { ConditionModule } from './entities/condition/condition.module';
import { AuctionModule } from './entities/auction/auction.module';
import { GatewayModule } from './gateway/gateway.module';
import { MulterModule } from '@nestjs/platform-express';
import * as cors from 'cors';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MyGateWay } from './gateway/gateway';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'images'), // Adjust the path based on the location of the images directory
      serveRoot: '/images',
    }),
    MulterModule.register({
      dest: './images', // Destination directory for storing the uploaded files
    }),
    AuthzModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
         resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    CategoryModule,
    RoleModule,
    CloudinaryModule,
    AuthModule,
    RatingModule,
    ItemModule,
    ConditionModule,
    AuctionModule,
    GatewayModule
    ],
  controllers: [appController],
  providers : [
    MyGateWay
      // {
      //   provide: APP_GUARD,
      //   useClass: jwtGuard, 
      // },
      // {
      //   provide: APP_GUARD,
      //   useClass: PolicyGuard, 
      // },
    ]

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
