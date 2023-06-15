import { IsInt, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    icon: string
}
