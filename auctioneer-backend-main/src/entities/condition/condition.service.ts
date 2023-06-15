import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConditionService {
  constructor(private prisma: PrismaService){}

  create(createConditionDto: CreateConditionDto) {
    let user = this.prisma.condition.create({
      data: {name: createConditionDto.name}
    })
    return user; 
  }

  findAll() {
    return this.prisma.condition.findMany();
  }

  findOne(id: number) {
    return this.prisma.condition.findUnique({
      where: {id: id}
    })
  }

}
