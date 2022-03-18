/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Style } from 'src/styles/entities/style.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Look {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Index({ unique: true })
	@Column()
	name!: string;

	@ApiProperty()
	@ManyToOne(() => Style, (style: Style) => style.looks)
	style!: Style;
}
