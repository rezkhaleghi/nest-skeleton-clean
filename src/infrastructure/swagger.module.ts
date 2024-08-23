import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swagger = function (app) {
  const config = new DocumentBuilder()
    .setTitle('TODO Service API')
    .setDescription('TODO Service API description')
    .setVersion('1.0')
    .addTag('TODO')
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module
  SwaggerModule.setup('api', app, document);
};
