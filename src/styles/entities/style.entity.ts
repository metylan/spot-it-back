/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { Look } from 'src/looks/entities/look.entity';
import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

	@OneToMany(() => Look, (look: Look) => look.style)
	looks: Look[];
}
