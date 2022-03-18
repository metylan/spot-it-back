/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Style {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: string;

	@ApiProperty()
	@Index({ unique: true })
	@Column()
	name!: string;

	@ApiProperty()
	@ManyToMany(() => Category, { eager: true })
	categories: Category[];

	@ApiProperty()
	@Column()
	image!: string;
}
