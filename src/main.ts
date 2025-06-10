import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { AllExceptionsFilter } from './http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());  // detects DTO's and validates them globally
  app.use(helmet());
  // app.setGlobalPrefix('api'); // Set a global prefix for all routes

  // app.useGlobalFilters(new AllExceptionsFilter());  // Global exception filter to handle all exceptions
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('API documentation for the Inventory Management System')
    .setVersion('1.0')
    .addTag('Inventory', 'Inventory management endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Products', 'Product management endpoints')
    .addTag('Categories', 'Category management endpoints')
    .addTag('Suppliers', 'Supplier management endpoints')
    .addTag('Orders', 'Order management endpoints')
    .addTag('Transactions', 'Transaction management endpoints')
    .addTag('Warehouses', 'Warehouse management endpoints')
    .addTag('Shipping', 'Shipping management endpoints')
    .addTag('Returns', 'Return management endpoints')
    .addTag('Pricings', 'Pricing management endpoints')
    .addTag('Seeding', 'Database seeding endpoints')
    .addServer('http://localhost:8000', 'Local development server')
    .addServer('https://nest-inventory-dmatg7afhndnbdgu.southafricanorth-01.azurewebsites.net/', 'Production server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document, {
    jsonDocumentUrl: '/api/docs-json',
    swaggerOptions: {
      persistAuthorization: true, // Persist authorization in Swagger UI
      tagsSorter: 'alpha', // Sort tags alphabetically
      docExpansion: 'none', // Collapse all sections by default
      customSiteTitle: 'Inventory API', // Customize the site title
    },
  });

  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
    credentials: true, // Allow credentials
  });

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');
  await app.listen(PORT, () => {
    console.log(`Application is running on port: ${PORT}`);
  });
}
bootstrap();
