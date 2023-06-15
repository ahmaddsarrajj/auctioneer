import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateItemDto {
 
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsInt()
    conditionId: number

    @IsNotEmpty()
    @IsInt()
    categoryId: number

    @IsNotEmpty()
    @IsInt()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    price: number


    @IsString()
    image: string


}

export class CreateAuctionDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    conditionId: number

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    categoryId: number

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    userId: number

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    price: number

    
    image: File

    
    itemId: number

    @IsNotEmpty()
    @IsString()
    startingDate: string

    @IsNotEmpty()
    @IsString()
    endingDate: string

    @IsNumber()
    @Type(() => Number)
    minBid: number
    
  
}


export class CreateWishListDto {
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    auctionId: number

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    userId: number
}

export class CreateImagesList {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    url: string

    @IsNotEmpty()
    @IsInt()
    itemId: number
}