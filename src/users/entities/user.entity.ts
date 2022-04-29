/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/security/roles.enum';
import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Marker} from "../../markers/entities/marker.entity";
import {Album} from "../../album/entities/album.entity";

@Entity()
export class User {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Index({ unique: true })
	@Column()
	mail!: string;

	@ApiProperty()
	@Column({ length: 100 })
	@Exclude()
	hash!: string;

	@ApiProperty()
	@Column({ length: 100 })
	name!: string;

	@ApiProperty({ enum: Role })
	@Index()
	@Column({ type: 'enum', enum: Role, default: Role.User })
	role!: Role;

	@ApiProperty()
	@Column({ nullable: true })
	@Exclude()
	hashRefreshToken?: string;

	@ApiProperty()
	@Column({type : 'number', default: 5})
	limit?: number;

	@ApiProperty()
	@OneToMany(() => Marker, (marker: Marker) => marker.user)
	markers?: Marker[];

	@ApiProperty()
	@OneToMany(() => Album, (album: Album) => album.user)
	album?: Album[];
}
