import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

export class Seed1648821587169 implements MigrationInterface {

	public async up(run: QueryRunner): Promise<void> {
		await run.manager.save(run.manager.create<Category>(Category, {
			name: 'Waiting',
			image: 'Waiting'
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE * FROM category'); 
	}

}
