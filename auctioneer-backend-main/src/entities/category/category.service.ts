import { Injectable } from "@nestjs/common";
import { create } from "domain";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    let data = {
      name: createCategoryDto.name,
      icon: createCategoryDto.icon
    };
    const category = this.prisma.category.create({
      data: data,
    });
    return category;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return categories
  }

  findOne (id: number) {
    return this.prisma.category.findUnique({
      where: {
        id: id
      },
      include: {
        item: true
      }
    })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.prisma.category.update({
      where: {
        id: id,
      },
      data: updateCategoryDto,
    });
    return category;
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
