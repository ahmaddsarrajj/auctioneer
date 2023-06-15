import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto, UpdateAuctionBid } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateWishListDto } from '../item/dto/create-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

//  @UseGuards(JwtGuard)

  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionService.create(createAuctionDto);
  }

  @Get()
  findAll() {
    return this.auctionService.findAll();
  }
  
  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.auctionService.findOne(+id);
  }

  @Get('item/:id')
  findOneByItem(@Param('id') id: string) {
    return this.auctionService.findOneByItem(+id);
  }

  @Get('category/:id')
  findOneByCategory(@Param('id') id: string) {
    return this.auctionService.findOneByCategory(+id);
  }

  
  @Get('user/:id')
  findOneByUser(@Param('id') id: string) {
    return this.auctionService.findOneByUser(+id);
  }

  // @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    return this.auctionService.update(+id, updateAuctionDto);
  }

  @Patch('bid/:id')
  updatePrice(@Param('id') id: string,@Body() updateAuctionBid: UpdateAuctionBid) {
    let aucitonId = id;
    return this.auctionService.updatePrice(+aucitonId, updateAuctionBid)
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.auctionService.remove(+id);
  }

  // wishlist

  @Post('wishlist')
  AddToWishList(@Body() createWishListDto: CreateWishListDto) {
    return this.auctionService.addToWish(createWishListDto);
  }
  
  @Get('wishlist/:id')
  getTheWishListByUserId(@Param('id') id: string) {
    return this.auctionService.viewWishList(+id);
  }

  @Delete('wishlist/:userId/:auctionId')
  removeFromWishList(@Param('userId') userId: string, @Param('auctionId') auctionId: string ) {    
    return this.auctionService.removeFromWishList(+userId, +auctionId);
  }

}
