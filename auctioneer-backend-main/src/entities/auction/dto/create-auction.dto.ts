import { Type } from "class-transformer"
import { IsString, IsNotEmpty, IsNumber } from "class-validator"
export class CreateAuctionDto {
    
    @IsNotEmpty()
    @IsNumber()
    itemId: number

    @IsNotEmpty()
    @IsString()
    startingDate: string

    @IsNotEmpty()
    @IsString()
    endingDate: string

    @IsNumber()
    minBid: number

    @IsNotEmpty()
    @IsNumber()
    userId: number
}

export class UpdateAuctionBid {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    userId: number

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    price: number
}