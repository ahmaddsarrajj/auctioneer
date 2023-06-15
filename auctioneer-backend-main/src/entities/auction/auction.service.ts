import { Injectable } from "@nestjs/common";
import { CreateAuctionDto, UpdateAuctionBid } from "./dto/create-auction.dto";
import { UpdateAuctionDto } from "./dto/update-auction.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateWishListDto } from "../item/dto/create-item.dto";

@Injectable()
export class AuctionService {
  constructor(private prisma: PrismaService) {}

  create(createAuctionDto: CreateAuctionDto, ) {
    const data = {
      itemId: createAuctionDto.itemId,
      startingDate: createAuctionDto.startingDate,
      endingDate: createAuctionDto.endingDate,
      minBid: createAuctionDto.minBid,
      userId: createAuctionDto.userId
    };

    const auction = this.prisma.auction.create({ data: data });

    return auction;
  }

  findAll() {
    return this.prisma.auction.findMany({
      include: {
        item: {
          include: {
            user: true,
            category: true,
            condition: true,
            images:true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.auction.findUnique({
      where: { id: id },
      include: {
        item: {
          include: { user: true, category: true, condition: true, images:true },
        },
      },
    });
  }

  findOneByItem(id: number) {
    return this.prisma.auction.findFirst({
      where: { itemId: id },
      include: {
        item: {
          include: { user: true, category: true, condition: true, images:true },
        },
      },
    });
  }

  async findOneByCategory(id: number) {
    let itemsList = [];
    let auction = [];
    try {
      await this.prisma.item
        .findMany({
          where: { categoryId: id },
        })
        .then((item) => {
          item?.map((i) => {
            let itemId = i.id;
            itemsList.push(itemId);
          });
        });
      console.log("itemsList", itemsList);

      for (const item of itemsList) {
        // console.log(item);
        
        await this.findOneByItem(item).then((response) => {
          auction.push(response);
          // console.log(response);
          
        });
      }

      console.log(auction);

      return auction;
    } catch (err) {
      return err;
    }

    //  return auction ;
  }

  //-****-*-------------------------------------------------------------------------
  async findOneByUser(id: number) {
    let itemsList = [];
    let auction = [];
    try {
      await this.prisma.item
        .findMany({
          where: { userId: id },
        })
        .then((item) => {
          item?.map((i) => {
            let itemId = i.id;
            itemsList.push(itemId);
          });
        });

      for(const item of itemsList)
        {  
          await this.findOneByItem(item).then((response) => {
            auction.push(response);
          });
        }

      
      console.log(auction);

      return auction;
    } catch (err) {
      return err;
    }

    //  return auction ;
  }

  update(id: number, updateAuctionDto: UpdateAuctionDto) {
    return this.prisma.auction.update({
      where: {
        id: id,
      },
      data: updateAuctionDto,
    });
  }

  async updatePrice(auctionId: number, updateAuctionBid: UpdateAuctionBid): Promise<void> {
    try {
      const result = await this.prisma.auction.update({
        where: {
          id: auctionId,
        },
        data: {
          userId: updateAuctionBid.userId,
        },
      });
  
      await this.prisma.item.update({
        where: { id: result.itemId },
        data: {
          price: updateAuctionBid.price,
        },
      });
    } catch (error) {
      // Handle any errors that occur during the database operations
      console.error('Error updating auction price:', error);
      throw new Error('Failed to update auction price');
    }
  }
  

  async remove(id: number) {
    console.log("work");
    
    const auction = await this.prisma.auction.delete({
      where: { id: id },
    });

    const item = await this.prisma.item.delete({
      where:{id: auction.itemId}
    })
    console.log(item);
    
    return item
  }

  addToWish(createWishListDto: CreateWishListDto) {
    return this.prisma.wishList.create({
      data: {
        auctionId: createWishListDto.auctionId,
        userId: createWishListDto.userId,
      },
    });
  }

  viewWishList(id: number) {
    return this.prisma.wishList.findMany({
      where: {
        userId: id,
      },
      include: {
        auction: {
          include: {
            item: {
              include: {
                user: true,
                condition: true,
                category: true,
                images:true,
              }
            },
          }
        }
      }
    });
  }

  removeFromWishList(userId: number, auctionId:number) {
    try{
      this.viewWishList(userId).then(res=> {
        let condition= res.length ;
        
        if(condition > 0){
          return this.prisma.wishList.delete({
            where: {
              auctionId_userId: {
                auctionId: auctionId,
                userId: userId,
              },
            },
          });
        }else {
          console.info("there is no data");
           
        }
      })
    }catch(err){
      console.log(err)
    }
  }
}
