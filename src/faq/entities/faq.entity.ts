import {Column, Entity, Index, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Faq {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Index()
    @Column({length: 100})
    name!: string;

    @ApiProperty()
    @Column()
    links: string[];

    @ApiProperty()
    @ManyToOne(() => User, (user: User) => user.album)
    @JoinTable()
    user!: User;
}
