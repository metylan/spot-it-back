import {Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Marker {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Index()
    @Column({length: 100})
    name!: string;

    @ApiProperty()
    @Column({type:"numeric"})
    lat!: number;

    @ApiProperty()
    @Column({type:"numeric"})
    lng!: number;

    @ApiProperty()
    @Column()
    com?: string;

    @ApiProperty()
    @ManyToOne(() => User, (user: User) => user.markers)
    @JoinTable()
    user!: User;
}
