import { PartialType } from '@nestjs/swagger';
import { CreateProductsListDto } from './create-products-list.dto';

export class UpdateProductsListDto extends PartialType(CreateProductsListDto) {}
