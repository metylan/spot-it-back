import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    'origin': ['http://localhost:8080', 'http://spotit.mety.fr'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    'allowedHeaders': 'Authorization, Content-Type, Accept',
    'credentials': true,
  });
  app.useGlobalPipes(new ValidationPipe);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
      .setTitle('Spotit api')
      .setDescription('Spotit API documentation')
      .setVersion('1.0.0')
      .addTag('Spotit')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.setGlobalPrefix('spotit')
  await app.listen(8996);
}
bootstrap();
