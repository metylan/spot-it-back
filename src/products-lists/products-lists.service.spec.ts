import { Test, TestingModule } from '@nestjs/testing';
import { ProductsListsService } from './products-lists.service';

describe('ProductsListsService', () => {
	let service: ProductsListsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductsListsService],
		}).compile();

		service = module.get<ProductsListsService>(ProductsListsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
