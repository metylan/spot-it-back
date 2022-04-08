/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { Look } from 'src/looks/entities/look.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
	@Column()
	image!: string;

	@ApiProperty()
	@ManyToMany(() => Category, (category: Category) => category.styles)
	@JoinTable()
	categories: Category[];

	@ApiProperty()
	@ManyToMany(() => Look, (look: Look) => look.styles)
	@JoinTable()
	looks: Look[];
}
