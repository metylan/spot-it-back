import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/entities/user.entity";
import {IsNotEmpty} from "class-validator";

export class CreateAlbumDto {
    @ApiProperty()
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
    @IsNotEmpty()
    links!: string[];

    @ApiProperty()
    @IsNotEmpty()
    user!: User;
}
