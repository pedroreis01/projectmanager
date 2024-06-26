import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserTaskDto {
  @IsInt()
  id: number;

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
  done: boolean;

  @IsString()
  projectName: string;

  @IsInt()
  projectId: number;
}
