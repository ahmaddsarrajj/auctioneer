import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  create(createRatingDto: CreateRatingDto) {

   const data = {
    rate: createRatingDto.rate,
    userId: createRatingDto.userId
   }

   const rating = this.prisma.rating.create({
    data: data
   }) 
   
   return rating;
  }

  findAll() {
    return this.prisma.rating.findMany()
  }

  findOne(id: number) {
    return this.prisma.rating.findUnique({
      where:{id: id}
    })
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return this.prisma.rating.update({
      where: {id: id},
      data: updateRatingDto
    })
  }

  remove(id: number) {
    return this.prisma.rating.delete({
      where: {id: id}
    })
  }
}
