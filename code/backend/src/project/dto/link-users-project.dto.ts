import { IsNumber } from "class-validator";

export class LinkUsersProjectDto {

    @IsNumber({},{each: true})
    userIds: number[];
}
