/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {

	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Index({ unique: true })
	@Column()
	name!: string;

	@ApiProperty()
	@Column({ length: 255, nullable: true })
	description: string;

	@ApiProperty()
	@Column()
	image!: string;

	@ApiProperty()
	@Column()
	price!: number;

	@ApiProperty()
	@Column()
	stock!: number;
}
