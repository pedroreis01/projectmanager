import { Exclude } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    login: string;

    @IsString()
    password: string;
}
