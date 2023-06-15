import { Injectable } from '@nestjs/common';
import { CreateAuctionDto, CreateImagesList, CreateWishListDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {

  constructor(private prisma: PrismaService) {}

  create(createAuctionDto: CreateAuctionDto, image: string) {

    const item = this.prisma.item.create({
      data: {
        name: createAuctionDto.name,
        description: createAuctionDto.description,
        conditionId: createAuctionDto.conditionId,
        categoryId: createAuctionDto.categoryId,
        userId: createAuctionDto.userId,
        price: createAuctionDto.price,
        currentPrice: createAuctionDto.price,
        image: image
      }
    }).then(i=> {
      return this.prisma.auction.create({
        data: {
          itemId: i.id,
          startingDate: createAuctionDto.startingDate,
          endingDate: createAuctionDto.endingDate,
          minBid: createAuctionDto.minBid,
          userId: createAuctionDto.userId
        }
      });
    })


  } 

  findAll() {
    return this.prisma.item.findMany()
  }

  findOne(id: number) {
    return this.prisma.item.findUnique({
      where: {id: id}
    });
  }

  findOneByCategory(id: number) {
    return this.prisma.item.findFirst({
      where: {categoryId: id}
    });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      where: {id: id},
      data: updateItemDto
    })
  }

  remove(id: number) {
    return this.prisma.item.delete({
      where: {id: id}
    })
  }


//  images
  addImages (createImagesList: CreateImagesList) {
    return this.prisma.images.create({
      data: {
        name: createImagesList.name,
        url: createImagesList.url,
        itemId: createImagesList.itemId
      }
    })
  }

}
