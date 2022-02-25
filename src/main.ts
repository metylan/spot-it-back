import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe);

	const config = new DocumentBuilder()
		.setTitle('Green Your Look api')
		.setDescription('The Green Your Look API documentation')
		.setVersion('1.0.0')
		.addTag('greenYourLook')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('doc', app, document);

	await app.listen(3000);
}
bootstrap();
