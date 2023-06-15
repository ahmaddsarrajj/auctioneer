import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    role: string


}
