/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Style } from 'src/styles/entities/style.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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
	@ManyToMany(() => Style, (style: Style) => style.looks)
	styles: Style[];

	@ApiProperty()
	@ManyToMany(() => Product, (product: Product) => product.looks)
	@JoinTable()
	products!: Product[];
}
