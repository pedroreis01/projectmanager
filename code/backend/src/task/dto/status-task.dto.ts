import { IsBoolean } from "class-validator";

export class StatusTaskDto {

    @IsBoolean()
    done: boolean;

}