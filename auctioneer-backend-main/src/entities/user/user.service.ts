import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    //create user----------------------------------------
    async createUser(createUserDto: CreateUserDto) {
        const hash = await bcrypt.hash(createUserDto.password, 10);
        let data = {
            username: createUserDto.username,
            phone: createUserDto.phone,
            password: hash,
            roleId: createUserDto.roleId,
        }
        const user = this.prisma.user.create({
            data: data

        })
        
        return user;
    }


    

    //get all users-----------------------------------------
    getUsers = () => {
        return this.prisma.user.findMany();
    }


    //update user-----------------------------------------
    updateUser(id: number, updateUserDto: UpdateUserDto) {
        const user = this.prisma.user.update({
            where: {
                id: id
            },
            data: updateUserDto,
        })
        return user;
    }

    //change password-----------------------------------------------
    changePassword = (id: number, updateUserDto: UpdateUserDto) => {
        const user = this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                password: updateUserDto.password,
            }
        })
        console.log(updateUserDto.password)
        return user;
    }

    //Get user details--------------------------------------------
    findOne(id: number) {
        return this.prisma.user.findUnique({ 
            where: { id },
            include: {
                role: true,
                item: true,
                rating: true,
                wishList: {
                    include:{
                        auction:true
                    }
                }
            }
        });
    }


    //remove password----------------------------------------------------
    deleteUser(id: number) {
        return this.prisma.user.delete({where:{id: id}})
    }


    
}