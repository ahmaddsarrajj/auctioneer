import { IsNotEmpty, IsString } from "class-validator";

export class CreateConditionDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
