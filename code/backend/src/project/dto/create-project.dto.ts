import { IsDateString, IsEmail, IsString } from "class-validator";

export class CreateProjectDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsDateString()
    startDate: string;
}
