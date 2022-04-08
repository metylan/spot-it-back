/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Look } from 'src/looks/entities/look.entity';
import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

	@ApiProperty()
	@ManyToMany(() => Look)
	looks: Look[];
}
