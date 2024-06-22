import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('GeotaggerAPI')
    .setDescription('API for geotagger web application')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://geotagger-frontend-deploy.s3-website.eu-north-1.amazonaws.com'
  })

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();

export default bootstrap;
