import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { AbilityFactory } from 'src/authz/ability.factory';
import { AuthzModule } from 'src/authz/authz.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [AuthzModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'), // Adjust the path based on the location of the images directory
      serveRoot: '/images',
    }),
    MulterModule.register({
      dest: './images', // Destination directory for storing the uploaded files
    }),]
})
export class ItemModule {}
