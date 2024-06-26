import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { Project } from "src/project/entities/project.entity";

export class CreateTaskDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsDateString()
    dueDate: string;

    @IsOptional()
    @IsDateString()
    finishedDate?: string;

    @IsOptional()
    @IsBoolean()
    done?: boolean;

    @IsNumber()
    projectId: number;

}