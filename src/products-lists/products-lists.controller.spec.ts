import { Test, TestingModule } from '@nestjs/testing';
import { ProductsListsController } from './products-lists.controller';
import { ProductsListsService } from './products-lists.service';

describe('ProductsListsController', () => {
	let controller: ProductsListsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsListsController],
			providers: [ProductsListsService],
		}).compile();

		controller = module.get<ProductsListsController>(ProductsListsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
