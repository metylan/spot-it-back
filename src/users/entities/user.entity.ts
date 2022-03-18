/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/security/roles.enum';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
}
