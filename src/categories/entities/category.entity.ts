/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Index({ unique: true })
	@Column()
	name!: string;
}
