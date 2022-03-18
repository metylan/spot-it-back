/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Style } from 'src/styles/entities/style.entity';
import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Index({ unique: true })
	@Column()
	name!: string;

	@ApiProperty()
	@ManyToMany(() => Style)
	styles: Style[];

	@ApiProperty()
	@Column()
	image!: string;
}
