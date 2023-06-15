import { IsInt, IsNotEmpty } from "class-validator";

export class CreateRatingDto {

    @IsNotEmpty()
    @IsInt()
    rate: number

    @IsNotEmpty()
    @IsInt()
    userId: number
}
