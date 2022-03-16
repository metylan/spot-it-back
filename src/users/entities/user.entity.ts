/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/security/role.enum';
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
	hash!: string;

	@ApiProperty()
	@Column({ length: 100 })
	name!: string;

	@ApiProperty({ enum: Roles })
	@Index()
	@Column({ type: 'enum', enum: Roles, default: Roles.User })
	role!: Roles;
}
