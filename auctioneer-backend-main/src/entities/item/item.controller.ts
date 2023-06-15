import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateAuctionDto, CreateImagesList } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import  { extname, join } from 'path';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  create(@Body() createItemDto: CreateAuctionDto, @UploadedFile() file: Express.Multer.File) {
    console.log(file, createItemDto);
    
    return this.itemService.create(createItemDto, file.filename);
  }



  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get('view/:id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Get('image/:imagename')
  findImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(join(process.cwd(), './images',imagename))
  }

  @Get('category/:id')
  findOneByCategory(@Param('id') id: string) {
    return this.itemService.findOneByCategory(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }

  @Post()
  addImage(@Body() createImageListDto: CreateImagesList) {
    return this.itemService.addImages(createImageListDto);
  }

  @Post('upload')
@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      return cb(null, `${randomName}${extname(file.originalname)}`)
    }
  })
}))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
  return { imagePath: file.filename };
}
  
}
