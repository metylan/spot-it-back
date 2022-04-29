import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {User} from "../../users/entities/user.entity";

export class CreateMarkerDto {
    @ApiProperty()
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
    @IsNotEmpty()
    lat!: number;

    @ApiProperty()
    @IsNotEmpty()
    lng!: number;

    @ApiProperty()
    com?: string;

    @ApiProperty()
    @IsNotEmpty()
    user!: User;
}
