import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductsListEnum } from '../entities/products-list.enum';

/* eslint-disable indent */
export class CreateProductsListDto {
	@ApiProperty()
	@IsNotEmpty()
	type!: ProductsListEnum;

	@ApiProperty()
	@IsDefined()
	products!: Product[];

	@ApiProperty()
	@IsDefined()
	user!: User;
}
