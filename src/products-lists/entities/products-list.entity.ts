/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsListEnum } from './products-list.enum';

@Entity()
export class ProductsList {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: string;

	@ApiProperty()
	@Index()
	@Column({ type: 'enum', enum: ProductsListEnum })
	type!: ProductsListEnum;

	@ApiProperty()
	@ManyToMany(() => Product)
	@JoinTable()
	products!: Product[];

	@ApiProperty()
	@ManyToOne(() => User, (user: User) => user)
	user!: User;

}
